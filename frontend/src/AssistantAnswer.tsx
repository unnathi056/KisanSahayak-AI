import type { ReactNode } from 'react';

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const tokens = /(\*\*.+?\*\*|\[[^\]]+\]\(https?:\/\/[^\s)]+\))/gi;
  return text.split(tokens).map((part, index) => {
    const bold = /^\*\*(.+)\*\*$/.exec(part);
    if (bold) return <strong key={`${keyPrefix}-${index}`}>{bold[1]}</strong>;

    const link = /^\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)$/i.exec(part);
    if (link) {
      try {
        const url = new URL(link[2]);
        if (url.protocol === 'http:' || url.protocol === 'https:') {
          return <a key={`${keyPrefix}-${index}`} href={url.href} target="_blank" rel="noopener noreferrer">{link[1]}</a>;
        }
      } catch { /* Render malformed URLs as text. */ }
    }

    return part.replace(/\*+/g, '');
  });
}

export default function AssistantAnswer({ text }: { text: string }) {
  const blocks: ReactNode[] = [];
  let listItems: ReactNode[] = [];
  let blockIndex = 0;

  const flushList = () => {
    if (!listItems.length) return;
    blocks.push(<ul key={`list-${blockIndex++}`}>{listItems}</ul>);
    listItems = [];
  };

  text.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) {
      flushList();
      return;
    }

    const bullet = /^(?:[*-]|\u2022)(?:\s+(.*))?$/.exec(trimmed) || /^(?:\d+[.)])\s+(.*)$/.exec(trimmed);
    if (bullet) {
      const item = (bullet[1] || '').trim();
      if (item) listItems.push(<li key={`item-${listItems.length}`}>{renderInline(item, `item-${listItems.length}`)}</li>);
      return;
    }

    flushList();
    blocks.push(<p key={`paragraph-${blockIndex++}`}>{renderInline(trimmed, `paragraph-${blockIndex}`)}</p>);
  });

  flushList();
  return <div className="assistant-answer">{blocks}</div>;
}
