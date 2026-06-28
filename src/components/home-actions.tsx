import { Button } from "@/components/ui/button"

type HeroAction = {
  label: string
  href: string
  variant?: "default" | "outline"
  external?: boolean
}

type HeroActionsProps = {
  actions: HeroAction[]
}

export function HeroActions({ actions }: HeroActionsProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      {actions.map((action) => (
        <Button
          asChild
          key={action.href}
          size="lg"
          variant={action.variant ?? "default"}
          className="h-12 rounded-full px-7 text-base font-semibold sm:h-13 sm:px-8"
        >
          <a
            href={action.href}
            target={action.external ? "_blank" : undefined}
            rel={action.external ? "noreferrer" : undefined}
          >
            {action.label}
          </a>
        </Button>
      ))}
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
