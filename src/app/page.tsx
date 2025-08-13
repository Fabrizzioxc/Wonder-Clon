import { HeroSection } from "@/components/hero-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { BottomSection } from "@/components/bottom-section"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main>
        <HeroSection />
        <HowItWorksSection />
        <BottomSection />
      </main>
    </div>
  )
}
