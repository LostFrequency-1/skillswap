'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { UserAvatar } from '@/components/shared/user-avatar'
import { Rating } from '@/components/shared/rating'
import { SkillIcon } from '@/components/shared/skill-icon'
import { generateMatches, type Match } from '@/lib/data/matches'
import { TEACHERS } from '@/lib/data/teachers'
import type { User } from '@/lib/types'
import { Sparkles, CheckCircle, Calendar } from 'lucide-react'

interface MatchingPageProps {
  currentUser: User
}

export function MatchingPage({ currentUser }: MatchingPageProps) {
  const [exchangeRequests, setExchangeRequests] = useState<string[]>([])
  const matches = useMemo(() => generateMatches(currentUser), [currentUser])

  const handleSendRequest = (teacherId: string) => {
    if (!exchangeRequests.includes(teacherId)) {
      setExchangeRequests([...exchangeRequests, teacherId])
    }
  }

  const handleCancelRequest = (teacherId: string) => {
    setExchangeRequests(exchangeRequests.filter(id => id !== teacherId))
  }

  return (
    <div className="space-y-8">
      <div>
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold">Recommended Learning Partners</h1>
            <p className="mt-2 text-base text-muted-foreground">
              Discover verified teachers matched to your learning goals and availability.
            </p>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">
              All Matches ({matches.length})
            </TabsTrigger>
            <TabsTrigger value="high">
              High Match ({matches.filter(m => m.matchPercentage >= 80).length})
            </TabsTrigger>
            <TabsTrigger value="requested">
              Requested ({exchangeRequests.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4 mt-6">
            <div className="grid gap-4">
              {matches.map(match => (
                <MatchCard
                  key={`${match.teacher.id}-${match.skill}`}
                  match={match}
                  isRequested={exchangeRequests.includes(match.teacher.id)}
                  onSendRequest={() => handleSendRequest(match.teacher.id)}
                  onCancelRequest={() => handleCancelRequest(match.teacher.id)}
                />
              ))}
            </div>
            {matches.length === 0 && (
              <Card className="border-dashed">
                <CardContent className="pt-6 text-center text-muted-foreground">
                  <Sparkles className="mx-auto mb-2 size-8 opacity-50" />
                  <p>No matches yet. Add more learning goals to discover partners.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="high" className="space-y-4 mt-6">
            <div className="grid gap-4">
              {matches
                .filter(m => m.matchPercentage >= 80)
                .map(match => (
                  <MatchCard
                    key={`${match.teacher.id}-${match.skill}`}
                    match={match}
                    isRequested={exchangeRequests.includes(match.teacher.id)}
                    onSendRequest={() => handleSendRequest(match.teacher.id)}
                    onCancelRequest={() => handleCancelRequest(match.teacher.id)}
                  />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="requested" className="space-y-4 mt-6">
            <div className="grid gap-4">
              {matches
                .filter(m => exchangeRequests.includes(m.teacher.id))
                .map(match => (
                  <MatchCard
                    key={`${match.teacher.id}-${match.skill}`}
                    match={match}
                    isRequested={exchangeRequests.includes(match.teacher.id)}
                    onSendRequest={() => handleSendRequest(match.teacher.id)}
                    onCancelRequest={() => handleCancelRequest(match.teacher.id)}
                  />
                ))}
            </div>
            {exchangeRequests.length === 0 && (
              <Card className="border-dashed">
                <CardContent className="pt-6 text-center text-muted-foreground">
                  <p>You have not sent any exchange requests yet.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function MatchCard({
  match,
  isRequested,
  onSendRequest,
  onCancelRequest,
}: {
  match: Match
  isRequested: boolean
  onSendRequest: () => void
  onCancelRequest: () => void
}) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-3">
              <UserAvatar name={match.teacher.name} src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${match.teacher.name}`} className="size-12" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-base">{match.teacher.name}</h3>
                  <Badge variant="secondary" className="text-xs">{match.skill}</Badge>
                  {match.levelCompatibility.match && (
                    <Badge variant="outline" className="text-xs text-emerald-600 border-emerald-200 bg-emerald-50">
                      <CheckCircle className="size-3 mr-1" />
                      Level match
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{match.teacher.headline}</p>
                <div className="flex items-center gap-4 mt-1 flex-wrap">
                  <Rating value={match.teacher.rating} reviewCount={match.teacher.reviewCount} />
                  <span className="text-xs text-muted-foreground">
                    {match.teacher.completedSessions} sessions
                  </span>
                  {match.availabilityOverlap > 0 && (
                    <span className="text-xs text-emerald-600 flex items-center gap-1">
                      <Calendar className="size-3" />
                      Available
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">{match.explanation}</p>

              <div className="grid grid-cols-2 gap-3 mt-3">
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Teaching Level</p>
                  <Badge variant="outline">{match.levelCompatibility.offered}</Badge>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Your Desired Level</p>
                  <Badge variant="outline">{match.levelCompatibility.desired}</Badge>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-medium text-muted-foreground">Match Score</p>
                  <p className="text-sm font-semibold">{match.matchPercentage}%</p>
                </div>
                <Progress value={match.matchPercentage} className="h-2" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            {isRequested ? (
              <>
                <Badge className="bg-blue-100 text-blue-700 border-0">Request Sent</Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onCancelRequest}
                  className="whitespace-nowrap"
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                size="sm"
                onClick={onSendRequest}
                className="whitespace-nowrap"
              >
                Send Request
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
