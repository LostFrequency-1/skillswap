'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { UserAvatar } from '@/components/shared/user-avatar'
import { SkillIcon } from '@/components/shared/skill-icon'
import { EXCHANGES, type SkillExchange, type ExchangeStatus } from '@/lib/data/exchanges'
import { CheckCircle, XCircle, Clock, Check, Trash2, MessageCircle } from 'lucide-react'

export function ExchangesPage() {
  const [exchanges, setExchanges] = useState<SkillExchange[]>(EXCHANGES)
  const [selectedExchange, setSelectedExchange] = useState<SkillExchange | null>(null)
  const [showDialog, setShowDialog] = useState(false)

  const handleAccept = (id: string) => {
    setExchanges(exchanges.map(e => 
      e.id === id ? { ...e, status: 'accepted' as ExchangeStatus, respondedAt: new Date().toISOString().split('T')[0] } : e
    ))
  }

  const handleReject = (id: string) => {
    setExchanges(exchanges.map(e => 
      e.id === id ? { ...e, status: 'rejected' as ExchangeStatus, respondedAt: new Date().toISOString().split('T')[0] } : e
    ))
  }

  const handleCancel = (id: string) => {
    setExchanges(exchanges.map(e => 
      e.id === id ? { ...e, status: 'cancelled' as ExchangeStatus } : e
    ))
  }

  const received = exchanges.filter(e => e.respondentId === 'current-user' && e.status === 'pending')
  const sent = exchanges.filter(e => e.initiatorId === 'current-user' && e.status === 'pending')
  const accepted = exchanges.filter(e => (e.initiatorId === 'current-user' || e.respondentId === 'current-user') && e.status === 'accepted')
  const completed = exchanges.filter(e => (e.initiatorId === 'current-user' || e.respondentId === 'current-user') && e.status === 'completed')
  const rejected = exchanges.filter(e => (e.initiatorId === 'current-user' || e.respondentId === 'current-user') && (e.status === 'rejected' || e.status === 'cancelled'))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Exchange Requests</h1>
        <p className="mt-2 text-base text-muted-foreground">
          Manage your skill exchange partnerships and collaborations.
        </p>
      </div>

      <Tabs defaultValue="received" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="received">
            Received
            {received.length > 0 && <Badge className="ml-2 h-5 w-5 rounded-full bg-red-500 p-0 flex items-center justify-center text-xs">{received.length}</Badge>}
          </TabsTrigger>
          <TabsTrigger value="sent">
            Sent
            {sent.length > 0 && <Badge className="ml-2 h-5 w-5 rounded-full bg-blue-500 p-0 flex items-center justify-center text-xs">{sent.length}</Badge>}
          </TabsTrigger>
          <TabsTrigger value="accepted">Accepted ({accepted.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completed.length})</TabsTrigger>
          <TabsTrigger value="history">History ({rejected.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="received" className="space-y-4 mt-6">
          {received.length > 0 ? (
            <div className="grid gap-4">
              {received.map(exchange => (
                <ExchangeRequestCard
                  key={exchange.id}
                  exchange={exchange}
                  onViewDetails={() => { setSelectedExchange(exchange); setShowDialog(true); }}
                  actionButton={
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="default"
                        onClick={() => handleAccept(exchange.id)}
                      >
                        Accept
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleReject(exchange.id)}
                      >
                        Decline
                      </Button>
                    </div>
                  }
                />
              ))}
            </div>
          ) : (
            <Card className="border-dashed">
              <CardContent className="pt-6 text-center text-muted-foreground">
                <p>No pending requests received.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="sent" className="space-y-4 mt-6">
          {sent.length > 0 ? (
            <div className="grid gap-4">
              {sent.map(exchange => (
                <ExchangeRequestCard
                  key={exchange.id}
                  exchange={exchange}
                  onViewDetails={() => { setSelectedExchange(exchange); setShowDialog(true); }}
                  actionButton={
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleCancel(exchange.id)}
                    >
                      <Trash2 className="size-3 mr-1" />
                      Withdraw
                    </Button>
                  }
                />
              ))}
            </div>
          ) : (
            <Card className="border-dashed">
              <CardContent className="pt-6 text-center text-muted-foreground">
                <p>You have not sent any requests yet.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="accepted" className="space-y-4 mt-6">
          {accepted.length > 0 ? (
            <div className="grid gap-4">
              {accepted.map(exchange => (
                <ExchangeAcceptedCard
                  key={exchange.id}
                  exchange={exchange}
                  onViewDetails={() => { setSelectedExchange(exchange); setShowDialog(true); }}
                />
              ))}
            </div>
          ) : (
            <Card className="border-dashed">
              <CardContent className="pt-6 text-center text-muted-foreground">
                <p>No accepted exchanges yet.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4 mt-6">
          {completed.length > 0 ? (
            <div className="grid gap-4">
              {completed.map(exchange => (
                <ExchangeCompletedCard
                  key={exchange.id}
                  exchange={exchange}
                  onViewDetails={() => { setSelectedExchange(exchange); setShowDialog(true); }}
                />
              ))}
            </div>
          ) : (
            <Card className="border-dashed">
              <CardContent className="pt-6 text-center text-muted-foreground">
                <p>No completed exchanges yet.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-4 mt-6">
          {rejected.length > 0 ? (
            <div className="grid gap-4">
              {rejected.map(exchange => (
                <ExchangeHistoryCard
                  key={exchange.id}
                  exchange={exchange}
                  onViewDetails={() => { setSelectedExchange(exchange); setShowDialog(true); }}
                />
              ))}
            </div>
          ) : (
            <Card className="border-dashed">
              <CardContent className="pt-6 text-center text-muted-foreground">
                <p>No rejected or cancelled exchanges.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      <ExchangeDetailsDialog exchange={selectedExchange} open={showDialog} onOpenChange={setShowDialog} />
    </div>
  )
}

function ExchangeRequestCard({
  exchange,
  onViewDetails,
  actionButton,
}: {
  exchange: SkillExchange
  onViewDetails: () => void
  actionButton: React.ReactNode
}) {
  const otherParty = exchange.initiatorId === 'current-user' ? exchange.respondentName : exchange.initiatorName
  const otherAvatar = exchange.initiatorId === 'current-user' ? exchange.respondentAvatar : exchange.initiatorAvatar

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-3">
              <img src={otherAvatar} alt={otherParty} className="size-10 rounded-full" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-base">{otherParty}</p>
                <p className="text-sm text-muted-foreground">
                  wants to exchange {exchange.initiatorOffers} for {exchange.respondentOffers}
                </p>
              </div>
            </div>
            {exchange.message && (
              <p className="text-sm text-muted-foreground italic bg-muted p-2 rounded">
                "{exchange.message}"
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            {actionButton}
            <Button variant="ghost" size="sm" onClick={onViewDetails}>
              Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function ExchangeAcceptedCard({
  exchange,
  onViewDetails,
}: {
  exchange: SkillExchange
  onViewDetails: () => void
}) {
  const otherParty = exchange.initiatorId === 'current-user' ? exchange.respondentName : exchange.initiatorName
  const otherAvatar = exchange.initiatorId === 'current-user' ? exchange.respondentAvatar : exchange.initiatorAvatar

  return (
    <Card className="border-emerald-200 bg-emerald-50/50">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="size-5 text-emerald-600" />
              <img src={otherAvatar} alt={otherParty} className="size-10 rounded-full" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-base">{otherParty}</p>
                <p className="text-sm text-muted-foreground">
                  {exchange.respondentOffers} ↔ {exchange.initiatorOffers}
                </p>
              </div>
            </div>
            {exchange.message && (
              <p className="text-sm text-muted-foreground italic bg-white/60 p-2 rounded">
                "{exchange.message}"
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Badge className="bg-emerald-600">Active</Badge>
            <Button variant="ghost" size="sm" onClick={onViewDetails}>
              Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function ExchangeCompletedCard({
  exchange,
  onViewDetails,
}: {
  exchange: SkillExchange
  onViewDetails: () => void
}) {
  const otherParty = exchange.initiatorId === 'current-user' ? exchange.respondentName : exchange.initiatorName
  const otherAvatar = exchange.initiatorId === 'current-user' ? exchange.respondentAvatar : exchange.initiatorAvatar

  return (
    <Card className="border-blue-200 bg-blue-50/50">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <Check className="size-5 text-blue-600" />
              <img src={otherAvatar} alt={otherParty} className="size-10 rounded-full" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-base">{otherParty}</p>
                <p className="text-sm text-muted-foreground">
                  Completed: {exchange.respondentOffers} ↔ {exchange.initiatorOffers}
                </p>
              </div>
            </div>
            {exchange.message && (
              <p className="text-sm text-muted-foreground italic bg-white/60 p-2 rounded">
                "{exchange.message}"
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Badge className="bg-blue-600">Completed</Badge>
            <Button variant="ghost" size="sm" onClick={onViewDetails}>
              Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function ExchangeHistoryCard({
  exchange,
  onViewDetails,
}: {
  exchange: SkillExchange
  onViewDetails: () => void
}) {
  const otherParty = exchange.initiatorId === 'current-user' ? exchange.respondentName : exchange.initiatorName
  const otherAvatar = exchange.initiatorId === 'current-user' ? exchange.respondentAvatar : exchange.initiatorAvatar
  const isRejected = exchange.status === 'rejected'

  return (
    <Card className="opacity-75">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              {isRejected ? (
                <XCircle className="size-5 text-red-600" />
              ) : (
                <Clock className="size-5 text-muted-foreground" />
              )}
              <img src={otherAvatar} alt={otherParty} className="size-10 rounded-full" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-base text-muted-foreground">{otherParty}</p>
                <p className="text-sm text-muted-foreground">
                  {isRejected ? 'Declined' : 'Cancelled'}: {exchange.respondentOffers} ↔ {exchange.initiatorOffers}
                </p>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onViewDetails}>
            Details
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function ExchangeDetailsDialog({
  exchange,
  open,
  onOpenChange,
}: {
  exchange: SkillExchange | null
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  if (!exchange) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Exchange Details</DialogTitle>
          <DialogDescription>
            {exchange.initiatorName} ↔ {exchange.respondentName}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">Initiated</p>
            <p className="text-sm">{exchange.createdAt}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">Status</p>
            <Badge variant="outline">{exchange.status}</Badge>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">{exchange.initiatorName} Offers</p>
              <Badge>{exchange.initiatorOffers} - {exchange.initiatorOfferLevel}</Badge>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">{exchange.respondentName} Offers</p>
              <Badge>{exchange.respondentOffers} - {exchange.respondentOfferLevel}</Badge>
            </div>
          </div>
          {exchange.message && (
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Message</p>
              <p className="text-sm bg-muted p-2 rounded">{exchange.message}</p>
            </div>
          )}
          {exchange.respondedAt && (
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Responded</p>
              <p className="text-sm">{exchange.respondedAt}</p>
            </div>
          )}
          {exchange.completedAt && (
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Completed</p>
              <p className="text-sm">{exchange.completedAt}</p>
            </div>
          )}
        </div>
        <div className="flex gap-2 pt-4">
          <Button variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          {exchange.status === 'accepted' && (
            <Button className="flex-1">
              <MessageCircle className="size-4 mr-2" />
              Message
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
