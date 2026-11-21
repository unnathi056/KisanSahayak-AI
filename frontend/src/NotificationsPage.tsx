import { useEffect, useMemo, useState } from 'react';
import type { Session } from '@supabase/supabase-js';

type Lang = 'en' | 'kn';
type Notice = { id:string; scheme_id:string; title:string; message:string; is_read:boolean; created_at:string };
type Scheme = { id:string; name:string; nameKn:string };

export default function NotificationsPage({lang,session,schemes,onOpenScheme,onUnreadCountChange,onBackToHub}:{lang:Lang;session:Session;schemes:Scheme[];onOpenScheme:(id:string)=>void;onUnreadCountChange:(count:number)=>void;onBackToHub:()=>void}) {
  const [notices,setNotices]=useState<Notice[]>([]);
  const [filter,setFilter]=useState<'all'|'unread'|'read'>('all');
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState('');
  const en=lang==='en';
  const copy=en?{title:'Notifications',intro:'Scheme updates matched to your saved farmer profile.',all:'All',unread:'Unread',read:'Read',mark:'Mark as read',markAll:'Mark all as read',empty:'No notifications in this view.',loading:'Loading your notifications…',statusRead:'Read',statusUnread:'Unread',error:'Could not load notifications. Please try again.'}:{title:'ಅಧಿಸೂಚನೆಗಳು',intro:'ನಿಮ್ಮ ಉಳಿಸಿದ ರೈತ ಪ್ರೊಫೈಲ್‌ಗೆ ಹೊಂದುವ ಯೋಜನೆ ಮಾಹಿತಿ.',all:'ಎಲ್ಲಾ',unread:'ಓದದವು',read:'ಓದಿದವು',mark:'ಓದಲಾಗಿದೆ ಎಂದು ಗುರುತಿಸಿ',markAll:'ಎಲ್ಲವನ್ನೂ ಓದಲಾಗಿದೆ ಎಂದು ಗುರುತಿಸಿ',empty:'ಈ ವಿಭಾಗದಲ್ಲಿ ಅಧಿಸೂಚನೆಗಳಿಲ್ಲ.',loading:'ಅಧಿಸೂಚನೆಗಳನ್ನು ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ…',statusRead:'ಓದಲಾಗಿದೆ',statusUnread:'ಓದಿಲ್ಲ',error:'ಅಧಿಸೂಚನೆಗಳನ್ನು ಲೋಡ್ ಮಾಡಲು ಆಗಲಿಲ್ಲ. ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.'};

  async function request<T>(path:string,init?:RequestInit):Promise<T>{
    const response=await fetch(path,{...init,headers:{'Content-Type':'application/json',Authorization:`Bearer ${session.access_token}`,...init?.headers}});
    const payload=await response.json();
    if(!response.ok||!payload.success)throw new Error(payload.error||copy.error);
    return payload.data as T;
  }

  useEffect(()=>{
    let active=true;
    setLoading(true);setError('');
    request<Notice[]>('/api/me/notifications').then(rows=>{if(active){setNotices(rows);onUnreadCountChange(rows.filter(n=>!n.is_read).length)}}).catch(e=>{if(active)setError(e instanceof Error?e.message:copy.error)}).finally(()=>{if(active)setLoading(false)});
    return()=>{active=false};
  },[session.access_token]);

  const visible=useMemo(()=>notices.filter(n=>filter==='all'||(filter==='read'?n.is_read:!n.is_read)),[notices,filter]);
  const unreadCount=notices.filter(n=>!n.is_read).length;
  async function markRead(notice:Notice){
    if(notice.is_read)return;
    setError('');
    try{await request(`/api/me/notifications/${notice.id}`,{method:'PATCH',body:JSON.stringify({is_read:true})});setNotices(old=>old.map(n=>n.id===notice.id?{...n,is_read:true}:n));onUnreadCountChange(Math.max(0,unreadCount-1))}
    catch(e){setError(e instanceof Error?e.message:copy.error)}
  }
  async function markAllRead(){
    if(!unreadCount)return;
    setError('');
    try{await request('/api/me/notifications/read-all',{method:'POST',body:'{}'});setNotices(old=>old.map(n=>({...n,is_read:true})));onUnreadCountChange(0)}
    catch(e){setError(e instanceof Error?e.message:copy.error)}
  }
  async function openNotice(notice:Notice){if(!notice.is_read)await markRead(notice);onOpenScheme(notice.scheme_id)}

  return <main className="flow account-flow notifications-page">
    <button className="back" onClick={onBackToHub}>← {en?'Back to Scheme Hub':'ಯೋಜನೆ ಕೇಂದ್ರಕ್ಕೆ ಹಿಂತಿರುಗಿ'}</button>
    <div className="flow-head"><span className="eyebrow">{en?'FARMER UPDATES':'ರೈತ ಮಾಹಿತಿ'}</span><h1>{copy.title} {unreadCount>0&&<span className="count-pill">{unreadCount}</span>}</h1><p>{copy.intro}</p></div>
    {error&&<div className="account-error" role="alert">{error}</div>}
    <section className="account-card" aria-label={copy.title}>
      <div className="notifications-toolbar"><div className="notice-filters" role="tablist" aria-label={copy.title}>{(['all','unread','read'] as const).map(value=><button type="button" role="tab" aria-selected={filter===value} key={value} className={filter===value?'active':''} onClick={()=>setFilter(value)}>{copy[value]}</button>)}</div><button className="secondary-button" onClick={()=>void markAllRead()} disabled={!unreadCount}>{copy.markAll}</button></div>
      {loading?<p className="empty" role="status">{copy.loading}</p>:error?null:visible.length===0?<p className="empty">{copy.empty}</p>:visible.map(notice=>{
        const scheme=schemes.find(s=>s.id===notice.scheme_id);
        return <article className={'notification-row '+(!notice.is_read?'unread':'')} key={notice.id}>
          <button className="notification-content" onClick={()=>void openNotice(notice)} aria-label={`${notice.title}. ${en?'Open scheme':'ಯೋಜನೆ ತೆರೆಯಿರಿ'}`}>
            <span className="notification-title-row"><b>{notice.title}</b><span className={'notification-status '+(!notice.is_read?'is-unread':'')}>{notice.is_read?copy.statusRead:copy.statusUnread}</span></span>
            <span className="notification-message">{notice.message}</span><small>{scheme?(lang==='kn'?scheme.nameKn:scheme.name):notice.scheme_id} · {new Date(notice.created_at).toLocaleDateString(en?'en-IN':'kn-IN')}</small>
          </button>
          <div className="notification-actions"><button className="text-link" onClick={()=>void openNotice(notice)}>{en?'View scheme':'ಯೋಜನೆ ನೋಡಿ'} ↗</button>{!notice.is_read&&<button className="secondary-button" onClick={()=>void markRead(notice)}>{copy.mark}</button>}</div>
        </article>;
      })}
    </section>
  </main>;
}
