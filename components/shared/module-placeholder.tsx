import Link from 'next/link'
import { ArrowRight, type LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'
import { PageHeader } from '@/components/shared/page-header'

interface ModulePlaceholderProps {
  title: string
  description: string
  icon: LucideIcon
  plannedFeatures: string[]
}

export function ModulePlaceholder({ title, description, icon: Icon, plannedFeatures }: ModulePlaceholderProps) {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title={title} description={description} />
      <Card>
        <CardContent>
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Icon />
              </EmptyMedia>
              <EmptyTitle>{title} is coming in the next stage</EmptyTitle>
              <EmptyDescription>
                The layout and navigation are ready. This module will include the features listed below.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <ul className="flex flex-wrap justify-center gap-2">
                {plannedFeatures.map((feature) => (
                  <li
                    key={feature}
                    className="rounded-full border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
                  >
                    {feature}
                  </li>
                ))}
              </ul>
              <Button variant="outline" render={<Link href="/dashboard" />} nativeButton={false}>
                Back to dashboard
                <ArrowRight data-icon="inline-end" />
              </Button>
            </EmptyContent>
          </Empty>
        </CardContent>
      </Card>
    </div>
  )
}
