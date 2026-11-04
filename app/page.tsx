import { Benefits } from '@/components/landing/benefits'
import { Hero } from '@/components/landing/hero'
import { HowItWorks } from '@/components/landing/how-it-works'
import { SiteHeader } from '@/components/landing/site-header'
import { CallToAction, SiteFooter } from '@/components/landing/site-footer'
import { SkillCategories } from '@/components/landing/skill-categories'
import { Testimonials } from '@/components/landing/testimonials'
import { VerificationSection } from '@/components/landing/verification-section'

export default function LandingPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <HowItWorks />
        <SkillCategories />
        <VerificationSection />
        <Benefits />
        <Testimonials />
        <CallToAction />
      </main>
      <SiteFooter />
    </>
  )
}
