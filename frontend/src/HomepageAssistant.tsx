import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react';
import AssistantAnswer from './AssistantAnswer';
import { askAssistant, type AssistantLanguage } from './aiChat';

type RecognitionAlternative = { transcript: string };
type RecognitionResult = ArrayLike<RecognitionAlternative> & { isFinal: boolean };
type RecognitionResultEvent = Event & { results: ArrayLike<RecognitionResult> };
type RecognitionErrorEvent = Event & { error: string };
type BrowserRecognition = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  maxAlternatives: number;
  onstart: (() => void) | null;
  onresult: ((event: Event) => void) | null;
  onerror: ((event: Event) => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
};
type RecognitionConstructor = new () => BrowserRecognition;
type RecognitionWindow = Window & { SpeechRecognition?: RecognitionConstructor; webkitSpeechRecognition?: RecognitionConstructor };
type ChatMessage = {
  id: number;
  role: 'user' | 'assistant';
  text: string;
  pending?: boolean;
  sourceUrl?: string;
  action?: 'signin' | 'dashboard';
  language?: AssistantLanguage;
};

function ChatIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5H5l-2 2v-6a7.5 7.5 0 1 1 17-3.5Z"/><path d="M8 11h.01M12 11h.01M16 11h.01"/></svg>;
}

function MicIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3m-4 0h8"/></svg>;
}

export default function HomepageAssistant({
  language,
  onLanguageChange,
  authenticated,
  onSignIn,
  onDashboard,
}: {
  language: AssistantLanguage;
  onLanguageChange: (language: AssistantLanguage) => void;
  authenticated: boolean;
  onSignIn: () => void;
  onDashboard: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [busy, setBusy] = useState(false);
  const [listening, setListening] = useState(false);
  const [voiceMessage, setVoiceMessage] = useState('');
  const [voiceResponse, setVoiceResponse] = useState(false);
  const [speechState, setSpeechState] = useState<'idle' | 'speaking' | 'paused'>('idle');
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const recognitionRef = useRef<BrowserRecognition | null>(null);
  const messageSequence = useRef(0);
  const questionBeforeListening = useRef('');
  const lastSpokenId = useRef<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionCtor = typeof window === 'undefined' ? undefined : (window as RecognitionWindow).SpeechRecognition || (window as RecognitionWindow).webkitSpeechRecognition;
  const speechSynthesis = typeof window === 'undefined' ? undefined : window.speechSynthesis;
  const speechSupported = typeof window !== 'undefined' && 'speechSynthesis' in window && typeof SpeechSynthesisUtterance !== 'undefined';
  const copy = language === 'kn'
    ? { welcome: 'ನಮಸ್ಕಾರ! ಕಿಸಾನ್ ಸಹಾಯಕಕ್ಕೆ ಸ್ವಾಗತ. ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಲಿ?', placeholder: 'ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಬರೆಯಿರಿ…', send: 'ಕಳುಹಿಸಿ', listen: 'ಮಾತನಾಡಲು ಒತ್ತಿರಿ', stop: 'ನಿಲ್ಲಿಸಿ', cancel: 'ರದ್ದುಮಾಡಿ', micUnsupported: 'ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಧ್ವನಿ ಗುರುತಿಸುವಿಕೆ ಲಭ್ಯವಿಲ್ಲ. ದಯವಿಟ್ಟು ಟೈಪ್ ಮಾಡಿ.', privacy: 'ಧ್ವನಿ ಗುರುತಿಸುವಿಕೆಗೆ ಬ್ರೌಸರ್ ಆನ್‌ಲೈನ್ ಸೇವೆಯನ್ನು ಬಳಸಬಹುದು. ಕಿಸಾನ್ ಸಹಾಯಕ ಧ್ವನಿಯನ್ನು ಉಳಿಸುವುದಿಲ್ಲ.', permission: 'ಮೈಕ್ರೊಫೋನ್ ಅನುಮತಿ ನಿರಾಕರಿಸಲಾಗಿದೆ. ಬ್ರೌಸರ್ ಸೆಟ್ಟಿಂಗ್‌ಗಳಲ್ಲಿ ಅನುಮತಿಸಿ.', noMic: 'ಮೈಕ್ರೊಫೋನ್ ಕಂಡುಬಂದಿಲ್ಲ. ಟೈಪ್ ಮಾಡಿ ಮುಂದುವರಿಯಿರಿ.', noSpeech: 'ಧ್ವನಿ ಕೇಳಿಸಲಿಲ್ಲ. ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ ಅಥವಾ ಟೈಪ್ ಮಾಡಿ.', network: 'ಧ್ವನಿ ಸೇವೆಯನ್ನು ಸಂಪರ್ಕಿಸಲಾಗಲಿಲ್ಲ. ಟೈಪ್ ಮಾಡಿ ಮುಂದುವರಿಯಿರಿ.', unsupportedLanguage: 'ಈ ಭಾಷೆಗೆ ಧ್ವನಿ ಗುರುತಿಸುವಿಕೆ ಲಭ್ಯವಿಲ್ಲ. ಭಾಷೆ ಬದಲಿಸಿ ಅಥವಾ ಟೈಪ್ ಮಾಡಿ.', listening: 'ಕೇಳುತ್ತಿದ್ದೇನೆ…', ready: 'ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಇಲ್ಲಿ ಕೇಳಿ ಅಥವಾ ಟೈಪ್ ಮಾಡಿ.', voiceResponse: 'ಉತ್ತರವನ್ನು ಧ್ವನಿಯಾಗಿ ಓದಿ', play: 'ಪ್ಲೇ', pause: 'ವಿರಾಮ', resume: 'ಮುಂದುವರಿಸಿ', stopAudio: 'ಆಡಿಯೊ ನಿಲ್ಲಿಸಿ', noVoice: 'ಈ ಭಾಷೆಯ ಧ್ವನಿ ನಿಮ್ಮ ಸಾಧನದಲ್ಲಿ ಲಭ್ಯವಿಲ್ಲ. ಉತ್ತರವನ್ನು ಓದಬಹುದು.', private: authenticated ? 'ವೈಯಕ್ತಿಕ ಶಿಫಾರಸುಗಳಿಗಾಗಿ ನಿಮ್ಮ ರೈತ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ತೆರೆಯಿರಿ.' : 'ನಿಮ್ಮ ರೈತ ಪ್ರೊಫೈಲ್ ಆಧಾರಿತ ಶಿಫಾರಸುಗಳಿಗಾಗಿ ಸೈನ್ ಇನ್ ಮಾಡಿ. ಸಾರ್ವಜನಿಕ ಯೋಜನೆಗಳ ಪ್ರಶ್ನೆಗಳಿಗೆ ಸೈನ್ ಇನ್ ಅಗತ್ಯವಿಲ್ಲ.', signIn: 'ಸೈನ್ ಇನ್', dashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್', assistant: 'ಕಿಸಾನ್ ಸಹಾಯಕ', close: 'ಮುಚ್ಚಿ', minimize: 'ಕಡಿಮೆ ಮಾಡಿ', restore: 'ಚಾಟ್ ತೆರೆಯಿರಿ', greeting: 'ಸ್ವಾಗತ', error: 'ಕ್ಷಮಿಸಿ, ಈಗ ಉತ್ತರಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.' }
    : { welcome: 'Hello! Welcome to Kisan Sahayak. How can I help you?', placeholder: 'Type your question…', send: 'Send', listen: 'Tap to speak', stop: 'Stop', cancel: 'Cancel', micUnsupported: 'Voice input is not available in this browser. You can type your question instead.', privacy: 'Your browser may use an online speech service. Kisan Sahayak does not record or save audio.', permission: 'Microphone permission was denied. Allow microphone access in your browser settings.', noMic: 'No microphone was found. You can continue by typing.', noSpeech: 'No speech was heard. Try again or type your question.', network: 'The speech service could not be reached. You can continue by typing.', unsupportedLanguage: 'Speech recognition for this language is unavailable here. Change language or type your question.', listening: 'Listening…', ready: 'Ask a question by voice or text.', voiceResponse: 'Read replies aloud', play: 'Play', pause: 'Pause', resume: 'Resume', stopAudio: 'Stop audio', noVoice: 'A voice for this language is not available on this device. The answer is still available to read.', private: authenticated ? 'Open your farmer dashboard for personalized recommendations.' : 'Sign in for recommendations based on your farmer profile. Public scheme questions do not require sign-in.', signIn: 'Sign in', dashboard: 'Dashboard', assistant: 'Kisan Sahayak', close: 'Close', minimize: 'Minimize', restore: 'Open chat', greeting: 'Welcome', error: 'Sorry, I could not get an answer right now. Please try again.' };
  const latestAnswer = [...messages].reverse().find((message) => message.role === 'assistant' && !message.pending && !message.action && message.text);

  useEffect(() => {
    if (!speechSynthesis) return;
    const updateVoices = () => setVoices(speechSynthesis.getVoices());
    updateVoices();
    speechSynthesis.addEventListener('voiceschanged', updateVoices);
    return () => speechSynthesis.removeEventListener('voiceschanged', updateVoices);
  }, [speechSynthesis]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, open, minimized]);

  const speak = useCallback((text: string, messageId: number, replyLanguage: AssistantLanguage = language) => {
    if (!speechSupported || !speechSynthesis || !text) return;
    const locale = replyLanguage === 'kn' ? 'kn-IN' : 'en-IN';
    const langPrefix = replyLanguage === 'kn' ? 'kn' : 'en';
    const voice = voices.find((candidate) => candidate.lang.toLowerCase() === locale.toLowerCase())
      || voices.find((candidate) => candidate.lang.toLowerCase().startsWith(`${langPrefix}-`));
    if (!voice) {
      setVoiceMessage(copy.noVoice);
      return;
    }
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = locale;
    utterance.voice = voice;
    utterance.onstart = () => setSpeechState('speaking');
    utterance.onend = () => setSpeechState('idle');
    utterance.onerror = () => { setSpeechState('idle'); setVoiceMessage(copy.noVoice); };
    lastSpokenId.current = messageId;
    speechSynthesis.speak(utterance);
    setVoiceMessage('');
  }, [copy.noVoice, language, speechSupported, speechSynthesis, voices]);

  useEffect(() => {
    if (!voiceResponse || !latestAnswer || lastSpokenId.current === latestAnswer.id) return;
    speak(latestAnswer.text, latestAnswer.id, latestAnswer.language || language);
  }, [latestAnswer?.id, latestAnswer?.text, speak, voiceResponse]);

  const stopListening = useCallback((cancel: boolean) => {
    const recognition = recognitionRef.current;
    if (!recognition) return;
    if (cancel) {
      recognition.abort();
      setQuestion(questionBeforeListening.current);
      setVoiceMessage(copy.cancel);
    } else {
      recognition.stop();
      setVoiceMessage(copy.stop);
    }
    recognitionRef.current = null;
    setListening(false);
  }, [copy.cancel, copy.stop]);

  const startListening = () => {
    if (!recognitionCtor) {
      setVoiceMessage(copy.micUnsupported);
      return;
    }
    try {
      const recognition = new recognitionCtor();
      recognition.lang = language === 'kn' ? 'kn-IN' : 'en-IN';
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;
      questionBeforeListening.current = question;
      recognition.onstart = () => { setListening(true); setVoiceMessage(copy.listening); };
      recognition.onresult = (rawEvent) => {
        const event = rawEvent as RecognitionResultEvent;
        let finalText = '';
        let interimText = '';
        for (let index = 0; index < event.results.length; index += 1) {
          const result = event.results[index];
          const transcript = result[0]?.transcript || '';
          if (result.isFinal) finalText += transcript;
          else interimText += transcript;
        }
        const spoken = `${finalText}${interimText}`.trim();
        setQuestion([questionBeforeListening.current.trim(), spoken].filter(Boolean).join(' '));
      };
      recognition.onerror = (rawEvent) => {
        const error = (rawEvent as RecognitionErrorEvent).error;
        const message = error === 'not-allowed' || error === 'service-not-allowed' ? copy.permission
          : error === 'audio-capture' ? copy.noMic
            : error === 'no-speech' ? copy.noSpeech
              : error === 'network' ? copy.network
                : error === 'language-not-supported' || error === 'language-unavailable' ? copy.unsupportedLanguage
                  : copy.micUnsupported;
        setVoiceMessage(message);
        setListening(false);
        recognitionRef.current = null;
      };
      recognition.onend = () => {
        setListening(false);
        setVoiceMessage((current) => current === copy.listening ? copy.ready : current);
        recognitionRef.current = null;
      };
      recognitionRef.current = recognition;
      setVoiceMessage(copy.ready);
      recognition.start();
    } catch {
      setListening(false);
      recognitionRef.current = null;
      setVoiceMessage(copy.permission);
    }
  };

  const handleLanguageChange = (next: AssistantLanguage) => {
    if (listening) stopListening(true);
    onLanguageChange(next);
  };

  const handleClose = () => {
    if (recognitionRef.current) stopListening(true);
    speechSynthesis?.cancel();
    setSpeechState('idle');
    setMinimized(false);
    setOpen(false);
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    const text = question.trim();
    if (!text || busy) return;
    if (recognitionRef.current) stopListening(false);
    const isPersonal = /\b(my|mine|for me|my farm|my profile|personalized|personalised|based on my)\b/i.test(text) || /ನನ್ನ|ನನಗೆ|ನನ್ನದು/.test(text);
    const id = ++messageSequence.current * 2;
    setQuestion('');
    setVoiceMessage('');
    setMessages((current) => [...current, { id, role: 'user', text, language }]);
    if (isPersonal) {
      setMessages((current) => [...current, {
        id: id + 1,
        role: 'assistant',
        text: copy.private,
        action: authenticated ? 'dashboard' : 'signin',
      }]);
      return;
    }
    const responseId = id + 1;
    setMessages((current) => [...current, { id: responseId, role: 'assistant', text: '', pending: true, language }]);
    setBusy(true);
    try {
      const reply = await askAssistant(text, language);
      setMessages((current) => current.map((message) => message.id === responseId
        ? { ...message, text: reply.answer, sourceUrl: reply.sourceUrl, pending: false, language }
        : message));
    } catch {
      setMessages((current) => current.map((message) => message.id === responseId
        ? { ...message, text: copy.error, pending: false }
        : message));
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => () => {
    recognitionRef.current?.abort();
    speechSynthesis?.cancel();
  }, [speechSynthesis]);

  return <div className="homepage-assistant">
    {!open && <button className="assistant-launcher" onClick={() => { setOpen(true); setMinimized(false); }} aria-label={copy.assistant}>
      <ChatIcon /><span>{language === 'en' ? 'Ask Kisan Sahayak' : 'ಕಿಸಾನ್ ಸಹಾಯಕ್ ಕೇಳಿ'}</span>
    </button>}
    {open && minimized && <div className="assistant-minimized"><button onClick={() => setMinimized(false)} aria-label={copy.restore}><ChatIcon /><span>{copy.assistant}</span></button><button onClick={handleClose} aria-label={copy.close}>×</button></div>}
    {open && !minimized && <section className="assistant-window" aria-label={copy.assistant}>
      <header className="assistant-window-header"><span className="assistant-avatar"><ChatIcon /></span><div><b>{copy.assistant}</b><small>{language === 'en' ? 'Scheme information, in simple language' : 'ಯೋಜನೆ ಮಾಹಿತಿ, ಸರಳ ಭಾಷೆಯಲ್ಲಿ'}</small></div><label className="assistant-language"><span className="visually-hidden">Language</span><select value={language} onChange={(event) => handleLanguageChange(event.target.value as AssistantLanguage)} aria-label="Chat language"><option value="en">English</option><option value="kn">ಕನ್ನಡ</option></select></label><button onClick={() => { if (recognitionRef.current) stopListening(true); speechSynthesis?.cancel(); setSpeechState('idle'); setMinimized(true); }} aria-label={copy.minimize}>−</button><button onClick={handleClose} aria-label={copy.close}>×</button></header>
      <div className="assistant-messages" ref={scrollRef} aria-live="polite">
        {!messages.length && <article className="assistant-message assistant-response"><AssistantAnswer text={copy.welcome} /></article>}
        {messages.map((message) => <article className={`assistant-message ${message.role === 'user' ? 'assistant-user' : 'assistant-response'}`} key={message.id}>
          {message.pending ? <span className="assistant-typing" role="status"><i /><i /><i /><span>{language === 'en' ? 'Thinking…' : 'ಯೋಚಿಸುತ್ತಿದೆ…'}</span></span> : <AssistantAnswer text={message.text} />}
          {message.sourceUrl && <a className="assistant-source" href={message.sourceUrl} target="_blank" rel="noreferrer">{language === 'en' ? 'Official source' : 'ಅಧಿಕೃತ ಮೂಲ'} ↗</a>}
          {message.action && <button className="assistant-action" onClick={message.action === 'signin' ? onSignIn : onDashboard}>{message.action === 'signin' ? copy.signIn : copy.dashboard}</button>}
        </article>)}
      </div>
      <div className="assistant-voice-panel">
        <div className="assistant-voice-row">
          <button type="button" className={`assistant-mic ${listening ? 'listening' : ''}`} onClick={() => listening ? stopListening(false) : startListening()} disabled={!recognitionCtor} aria-label={listening ? copy.stop : copy.listen} title={listening ? copy.stop : copy.listen}><MicIcon /></button>
          <div className="assistant-voice-status" role="status">{listening ? <><span className="listening-pulse" />{copy.listening}</> : voiceMessage || (!recognitionCtor ? copy.micUnsupported : copy.ready)}</div>
          {listening && <button type="button" className="assistant-voice-cancel" onClick={() => stopListening(true)}>{copy.cancel}</button>}
        </div>
        <small>{copy.privacy}</small>
        <label className="assistant-voice-toggle"><input type="checkbox" checked={voiceResponse} onChange={(event) => setVoiceResponse(event.target.checked)} />{copy.voiceResponse}</label>
        {!speechSupported && <small className="assistant-voice-note">{language === 'en' ? 'Voice playback is unavailable in this browser; text replies still work.' : 'ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಧ್ವನಿ ಪ್ಲೇಬ್ಯಾಕ್ ಲಭ್ಯವಿಲ್ಲ; ಪಠ್ಯ ಉತ್ತರಗಳು ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತವೆ.'}</small>}
        {speechSupported && latestAnswer && <div className="assistant-playback">
          <button type="button" onClick={() => speak(latestAnswer.text, latestAnswer.id, latestAnswer.language || language)} disabled={!voices.length}>{copy.play}</button>
          <button type="button" onClick={() => { speechSynthesis?.pause(); setSpeechState('paused'); }} disabled={speechState !== 'speaking'}>{copy.pause}</button>
          <button type="button" onClick={() => { speechSynthesis?.resume(); setSpeechState('speaking'); }} disabled={speechState !== 'paused'}>{copy.resume}</button>
          <button type="button" onClick={() => { speechSynthesis?.cancel(); setSpeechState('idle'); }} disabled={speechState === 'idle'}>{copy.stopAudio}</button>
        </div>}
        {voiceMessage && !listening && <small className="assistant-voice-note">{voiceMessage}</small>}
      </div>
      <form className="assistant-compose" onSubmit={submit}>
        <input value={question} onChange={(event) => setQuestion(event.target.value)} placeholder={copy.placeholder} maxLength={1500} aria-label={copy.placeholder} />
        <button className="primary" type="submit" disabled={!question.trim() || busy}>{busy ? '…' : copy.send}</button>
      </form>
      <p className="assistant-disclaimer">{language === 'en' ? 'Information guidance only. Confirm scheme rules with official sources.' : 'ಮಾಹಿತಿ ಮಾರ್ಗದರ್ಶನ ಮಾತ್ರ. ಯೋಜನೆಯ ನಿಯಮಗಳನ್ನು ಅಧಿಕೃತ ಮೂಲಗಳಲ್ಲಿ ದೃಢಪಡಿಸಿ.'}</p>
    </section>}
  </div>;
}
