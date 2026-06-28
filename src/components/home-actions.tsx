import { Button } from "@/components/ui/button"

type HeroActionsProps = {
  registerLabel: string
  scheduleLabel: string
}

export function HeroActions({ registerLabel, scheduleLabel }: HeroActionsProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Button asChild size="lg" className="rounded-full">
        <a href="#register">{registerLabel}</a>
      </Button>
      <Button asChild variant="outline" size="lg" className="rounded-full">
        <a href="#schedule">{scheduleLabel}</a>
      </Button>
    </div>
  )
}

type RegisterActionsProps = {
  requestLabel: string
  previewLabel: string
}

export function RegisterActions({ requestLabel, previewLabel }: RegisterActionsProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Button asChild size="lg" className="rounded-full">
        <a href="mailto:hello@fossforall.org?subject=FOSS%20for%20All%20Conference%20Registration">
          {requestLabel}
        </a>
      </Button>
      <Button asChild variant="outline" size="lg" className="rounded-full">
        <a href="#schedule">{previewLabel}</a>
      </Button>
    </div>
  )
}
