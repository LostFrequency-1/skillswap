'use client'

import { useMemo, useState } from 'react'
import { CalendarDays, Check, ChevronLeft, ChevronRight, Clock3, MapPin, Plus, RotateCcw, Video, X } from 'lucide-react'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { PageHeader } from '@/components/shared/page-header'
import { SESSIONS, type Session } from '@/lib/data/schedule'

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function formatDate(date: Date) { return date.toISOString().slice(0, 10) }
function sameDay(a: string, b: string) { return a === b }

export function SchedulePage() {
  const [sessions, setSessions] = useState(SESSIONS)
  const [cursor, setCursor] = useState(new Date('2026-11-01T12:00:00'))
  const [selectedDate, setSelectedDate] = useState('2026-11-12')
  const [showBooking, setShowBooking] = useState(false)
  const [bookingTitle, setBookingTitle] = useState('')
  const [bookingPartner, setBookingPartner] = useState('')
  const [bookingTime, setBookingTime] = useState('7:00 PM')

  const days = useMemo(() => {
    const year = cursor.getFullYear(); const month = cursor.getMonth()
    const first = new Date(year, month, 1); const start = new Date(year, month, 1 - first.getDay())
    return Array.from({ length: 42 }, (_, index) => { const date = new Date(start); date.setDate(start.getDate() + index); return date })
  }, [cursor])
  const selectedSessions = sessions.filter((session) => sameDay(session.date, selectedDate))
  const upcoming = sessions.filter((session) => session.status === 'upcoming')
  const past = sessions.filter((session) => session.status === 'completed')

  function changeMonth(offset: number) { setCursor((current) => new Date(current.getFullYear(), current.getMonth() + offset, 1)) }
  function cancelSession(id: string) { setSessions((current) => current.map((session) => session.id === id ? { ...session, status: 'cancelled' } : session)); toast.success('Session cancelled') }
  function rescheduleSession(session: Session) { setSelectedDate(session.date); setShowBooking(true); setBookingTitle(session.title); setBookingPartner(session.partner); toast.info('Choose a new date and time for this session') }
  function bookSession() {
    if (!bookingTitle.trim() || !bookingPartner.trim()) { toast.error('Add a topic and learning partner first'); return }
    const session: Session = { id: `local-${Date.now()}`, title: bookingTitle.trim(), partner: bookingPartner.trim(), skill: 'Custom session', date: selectedDate, time: bookingTime, duration: '60 min', status: 'upcoming', mode: 'Video call' }
    setSessions((current) => [...current, session]); setShowBooking(false); setBookingTitle(''); setBookingPartner(''); toast.success('Session booked', { description: `${session.title} · ${session.date} at ${session.time}` })
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Schedule" description="Plan exchange sessions around the time you actually have available." actions={<Button onClick={() => setShowBooking((current) => !current)}><Plus data-icon="inline-start" />Book session</Button>} />
      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <Card>
          <CardHeader className="flex-row items-center justify-between gap-4"><div><CardTitle>{MONTHS[cursor.getMonth()]} {cursor.getFullYear()}</CardTitle><p className="mt-1 text-sm text-muted-foreground">Select a day to view or book sessions.</p></div><div className="flex gap-1"><Button variant="outline" size="icon" onClick={() => changeMonth(-1)} aria-label="Previous month"><ChevronLeft /></Button><Button variant="outline" size="icon" onClick={() => setCursor(new Date('2026-11-01T12:00:00'))} aria-label="Go to current month"><CalendarDays /></Button><Button variant="outline" size="icon" onClick={() => changeMonth(1)} aria-label="Next month"><ChevronRight /></Button></div></CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 border-b text-center text-xs font-medium text-muted-foreground">{WEEKDAYS.map((day) => <span key={day} className="p-2">{day}</span>)}</div>
            <div className="grid grid-cols-7">
              {days.map((day) => { const date = formatDate(day); const inMonth = day.getMonth() === cursor.getMonth(); const daySessions = sessions.filter((session) => session.date === date && session.status !== 'cancelled'); return <button key={date} type="button" onClick={() => setSelectedDate(date)} className={`relative flex min-h-20 flex-col items-start gap-1 border-r border-b p-2 text-left transition-colors hover:bg-muted/60 ${!inMonth ? 'bg-muted/20 text-muted-foreground/50' : ''} ${selectedDate === date ? 'bg-secondary ring-2 ring-inset ring-primary' : ''}`}><span className={`flex size-6 items-center justify-center rounded-full text-xs ${date === '2026-11-04' ? 'bg-primary font-semibold text-primary-foreground' : ''}`}>{day.getDate()}</span>{daySessions.slice(0, 2).map((session) => <span key={session.id} className="w-full truncate rounded bg-primary/10 px-1 py-0.5 text-[10px] font-medium text-primary">{session.time}</span>)}</button> })}
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-6">
          {showBooking && <Card><CardHeader><CardTitle className="text-base">Book a session</CardTitle></CardHeader><CardContent className="flex flex-col gap-4"><div className="flex flex-col gap-2"><Label htmlFor="booking-title">Session topic</Label><Input id="booking-title" value={bookingTitle} onChange={(event) => setBookingTitle(event.target.value)} placeholder="e.g. Java Collections" /></div><div className="flex flex-col gap-2"><Label htmlFor="booking-partner">Learning partner</Label><Input id="booking-partner" value={bookingPartner} onChange={(event) => setBookingPartner(event.target.value)} placeholder="e.g. Priya Iyer" /></div><div className="flex flex-col gap-2"><Label htmlFor="booking-time">Time</Label><Select value={bookingTime} onValueChange={(value) => setBookingTime(value ?? '7:00 PM')}><SelectTrigger id="booking-time"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="5:30 PM">5:30 PM</SelectItem><SelectItem value="6:00 PM">6:00 PM</SelectItem><SelectItem value="7:00 PM">7:00 PM</SelectItem><SelectItem value="7:30 PM">7:30 PM</SelectItem></SelectContent></Select></div><div className="flex gap-2"><Button className="flex-1" onClick={bookSession}><Check data-icon="inline-start" />Confirm booking</Button><Button variant="outline" onClick={() => setShowBooking(false)}>Cancel</Button></div></CardContent></Card>}
          <Card><CardHeader className="flex-row items-center justify-between"><CardTitle className="text-base">{selectedDate === '2026-11-12' ? 'Thursday, 12 November' : selectedDate}</CardTitle><Badge variant="secondary">{selectedSessions.length} sessions</Badge></CardHeader><CardContent className="flex flex-col gap-3">{selectedSessions.length === 0 ? <div className="rounded-lg border border-dashed p-6 text-center"><p className="text-sm font-medium text-foreground">Nothing booked yet</p><p className="mt-1 text-xs text-muted-foreground">Book a learning session for this day.</p></div> : selectedSessions.map((session) => <SessionCard key={session.id} session={session} onCancel={() => cancelSession(session.id)} onReschedule={() => rescheduleSession(session)} />)}</CardContent></Card>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-2"><SessionList title="Upcoming sessions" sessions={upcoming} onCancel={cancelSession} onReschedule={rescheduleSession} /><SessionList title="Past sessions" sessions={past} /></div>
    </div>
  )
}

function SessionList({ title, sessions, onCancel, onReschedule }: { title: string; sessions: Session[]; onCancel?: (id: string) => void; onReschedule?: (session: Session) => void }) { return <Card><CardHeader><CardTitle className="text-base">{title}</CardTitle></CardHeader><CardContent className="flex flex-col gap-3">{sessions.length === 0 ? <p className="py-4 text-sm text-muted-foreground">No sessions here.</p> : sessions.map((session) => <SessionCard key={session.id} session={session} onCancel={onCancel ? () => onCancel(session.id) : undefined} onReschedule={onReschedule ? () => onReschedule(session) : undefined} />)}</CardContent></Card> }

function SessionCard({ session, onCancel, onReschedule }: { session: Session; onCancel?: () => void; onReschedule?: () => void }) { return <div className="flex flex-col gap-3 rounded-lg border p-3"><div className="flex items-start justify-between gap-3"><div className="min-w-0"><p className="font-medium text-foreground">{session.title}</p><p className="text-xs text-muted-foreground">with {session.partner} · {session.skill}</p></div><Badge variant={session.status === 'completed' ? 'secondary' : 'outline'}>{session.status}</Badge></div><div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground"><span className="flex items-center gap-1"><Clock3 className="size-3.5" />{session.date} · {session.time}</span><span className="flex items-center gap-1">{session.mode === 'Video call' ? <Video className="size-3.5" /> : <MapPin className="size-3.5" />}{session.mode}</span></div>{session.status === 'upcoming' && <div className="flex gap-2"><Button variant="outline" size="sm" onClick={onReschedule}><RotateCcw data-icon="inline-start" />Reschedule</Button><Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={onCancel}><X data-icon="inline-start" />Cancel</Button></div>}</div> }
