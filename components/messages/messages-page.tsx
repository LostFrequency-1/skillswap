'use client'

import { useMemo, useState } from 'react'
import { FileText, Link2, MoreHorizontal, Paperclip, Search, Send, Smile, Video } from 'lucide-react'
import { toast } from 'sonner'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { UserAvatar } from '@/components/shared/user-avatar'
import { PageHeader } from '@/components/shared/page-header'
import { CONVERSATIONS, type ChatMessage, type Conversation } from '@/lib/data/messages'

export function MessagesPage() {
  const [conversations, setConversations] = useState(CONVERSATIONS)
  const [selectedId, setSelectedId] = useState(CONVERSATIONS[0].id)
  const [query, setQuery] = useState('')
  const [draft, setDraft] = useState('')
  const selected = conversations.find((conversation) => conversation.id === selectedId) ?? conversations[0]
  const filteredConversations = useMemo(
    () => conversations.filter((conversation) => `${conversation.name} ${conversation.skill}`.toLowerCase().includes(query.toLowerCase())),
    [conversations, query],
  )

  function selectConversation(conversation: Conversation) {
    setSelectedId(conversation.id)
    setConversations((current) => current.map((item) => item.id === conversation.id ? { ...item, unread: 0 } : item))
  }

  function sendMessage() {
    const text = draft.trim()
    if (!text) return
    const message: ChatMessage = { id: `local-${Date.now()}`, sender: 'me', text, timestamp: 'Just now' }
    setConversations((current) => current.map((conversation) => conversation.id === selected.id
      ? { ...conversation, lastMessage: text, time: 'Just now', messages: [...conversation.messages, message] }
      : conversation))
    setDraft('')
  }

  function shareResource() {
    const message: ChatMessage = {
      id: `resource-${Date.now()}`,
      sender: 'me',
      text: 'Shared a resource with you.',
      timestamp: 'Just now',
      resource: { label: 'SkillSwap session notes', type: 'LINK · Shared resource' },
    }
    setConversations((current) => current.map((conversation) => conversation.id === selected.id
      ? { ...conversation, lastMessage: message.text, time: 'Just now', messages: [...conversation.messages, message] }
      : conversation))
    toast.success('Resource shared', { description: `Sent to ${selected.name}` })
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Messages" description="Keep your learning conversations, resources and session plans in one place." />
      <Card className="overflow-hidden">
        <div className="grid min-h-[650px] md:grid-cols-[300px_1fr]">
          <aside className="flex flex-col border-b md:border-r md:border-b-0">
            <div className="flex items-center justify-between p-4">
              <div className="flex flex-col gap-1">
                <h2 className="font-semibold text-foreground">Conversations</h2>
                <p className="text-xs text-muted-foreground">{conversations.length} learning partners</p>
              </div>
              <Button variant="ghost" size="icon" aria-label="Conversation options"><MoreHorizontal /></Button>
            </div>
            <div className="px-4 pb-3">
              <div className="relative">
                <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search conversations" className="pl-8" aria-label="Search conversations" />
              </div>
            </div>
            <Separator />
            <div className="flex flex-col overflow-y-auto">
              {filteredConversations.map((conversation) => (
                <button
                  key={conversation.id}
                  type="button"
                  onClick={() => selectConversation(conversation)}
                  className={`flex items-start gap-3 border-b p-4 text-left transition-colors hover:bg-muted/60 ${selected.id === conversation.id ? 'bg-secondary/60' : ''}`}
                >
                  <span className="relative shrink-0">
                    <Avatar><AvatarFallback className="bg-secondary text-secondary-foreground">{conversation.initials}</AvatarFallback></Avatar>
                    {conversation.online && <span className="absolute right-0 bottom-0 size-2.5 rounded-full border-2 border-card bg-success" />}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-2"><span className="truncate text-sm font-medium text-foreground">{conversation.name}</span><span className="shrink-0 text-[11px] text-muted-foreground">{conversation.time}</span></span>
                    <span className="mt-1 flex items-center justify-between gap-2"><span className="truncate text-xs text-muted-foreground">{conversation.lastMessage}</span>{conversation.unread > 0 && <Badge className="size-5 justify-center rounded-full px-0 text-[10px]">{conversation.unread}</Badge>}</span>
                    <span className="mt-1 block truncate text-[11px] text-primary">{conversation.skill}</span>
                  </span>
                </button>
              ))}
            </div>
          </aside>

          <section className="flex min-w-0 flex-col">
            <header className="flex items-center justify-between border-b p-4">
              <div className="flex items-center gap-3"><UserAvatar name={selected.name} className="size-10" /><div><h2 className="font-semibold text-foreground">{selected.name}</h2><p className="text-xs text-muted-foreground">{selected.online ? 'Online now' : 'Last seen recently'} · {selected.skill}</p></div></div>
              <div className="flex items-center gap-1"><Button variant="ghost" size="icon" aria-label="Start video call"><Video /></Button><Button variant="ghost" size="icon" aria-label="More conversation options"><MoreHorizontal /></Button></div>
            </header>
            <div className="flex flex-1 flex-col gap-5 overflow-y-auto bg-muted/20 p-4 md:p-6">
              <div className="mx-auto flex items-center gap-3 text-xs text-muted-foreground"><Separator className="w-16" /><span>Today</span><Separator className="w-16" /></div>
              {selected.messages.map((message) => (
                <div key={message.id} className={`flex max-w-[85%] flex-col gap-1 ${message.sender === 'me' ? 'self-end items-end' : 'items-start'}`}>
                  <div className={`rounded-2xl px-4 py-3 text-sm ${message.sender === 'me' ? 'rounded-br-sm bg-primary text-primary-foreground' : 'rounded-bl-sm border bg-card text-foreground'}`}><p>{message.text}</p>{message.resource && <div className={`mt-3 flex items-center gap-2 rounded-lg p-2 ${message.sender === 'me' ? 'bg-primary-foreground/10' : 'bg-muted'}`}><FileText className="size-4" /><span className="flex flex-col"><span className="text-xs font-medium">{message.resource.label}</span><span className="text-[11px] opacity-70">{message.resource.type}</span></span></div>}</div>
                  <span className="px-1 text-[11px] text-muted-foreground">{message.timestamp}</span>
                </div>
              ))}
            </div>
            <div className="border-t bg-card p-3 md:p-4">
              <Textarea value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing && event.keyCode !== 229) { event.preventDefault(); sendMessage() } }} placeholder={`Message ${selected.name}...`} className="min-h-14 resize-none border-0 bg-muted/60 shadow-none focus-visible:ring-1" aria-label={`Message ${selected.name}`} />
              <div className="mt-2 flex items-center justify-between"><div className="flex items-center gap-1"><Button variant="ghost" size="icon" aria-label="Attach a file"><Paperclip /></Button><Button variant="ghost" size="icon" aria-label="Share a link" onClick={shareResource}><Link2 /></Button><Button variant="ghost" size="icon" aria-label="Add emoji"><Smile /></Button></div><Button onClick={sendMessage} disabled={!draft.trim()}>Send<Send data-icon="inline-end" /></Button></div>
            </div>
          </section>
        </div>
      </Card>
    </div>
  )
}
