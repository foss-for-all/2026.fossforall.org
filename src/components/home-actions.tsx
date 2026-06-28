import { Button } from "@/components/ui/button"

export function HeroActions() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Button asChild size="lg" className="rounded-full">
        <a href="#register">Register</a>
      </Button>
      <Button asChild variant="outline" size="lg" className="rounded-full">
        <a href="#schedule">View Schedule</a>
      </Button>
    </div>
  )
}

export function RegisterActions() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Button asChild size="lg" className="rounded-full">
        <a href="mailto:hello@fossforall.org?subject=FOSS%20for%20All%20Conference%20Registration">
          Request Registration Info
        </a>
      </Button>
      <Button asChild variant="outline" size="lg" className="rounded-full">
        <a href="#schedule">Preview the Program</a>
      </Button>
    </div>
  )
}
