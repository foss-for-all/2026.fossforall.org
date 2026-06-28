import { MenuIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

type NavItem = {
  label: string
  href: string
}

type LanguageOption = {
  locale: string
  label: string
  href: string
  current: boolean
}

type MobileNavProps = {
  items: NavItem[]
  languageOptions: LanguageOption[]
  title: string
  description: string
  registerLabel: string
  openLabel: string
  languageLabel: string
}

export function MobileNav({
  items,
  languageOptions,
  title,
  description,
  registerLabel,
  openLabel,
  languageLabel,
}: MobileNavProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" aria-label={openLabel}>
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col" side="right">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>

        <nav className="mt-8 flex flex-col gap-2">
          {items.map((item) => (
            <SheetClose asChild key={item.href}>
              <a
                href={item.href}
                className="rounded-xl px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-accent"
              >
                {item.label}
              </a>
            </SheetClose>
          ))}
        </nav>

        <div className="mt-6 border-t border-border pt-6">
          <p className="px-3 text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
            {languageLabel}
          </p>
          <nav className="mt-3 flex flex-col gap-2">
            {languageOptions.map((option) => (
              <SheetClose asChild key={option.locale}>
                <a
                  href={option.href}
                  aria-current={option.current ? "page" : undefined}
                  className={`rounded-xl px-3 py-3 text-base font-medium transition-colors ${
                    option.current
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-accent"
                  }`}
                >
                  {option.label}
                </a>
              </SheetClose>
            ))}
          </nav>
        </div>

        <SheetFooter>
          <SheetClose asChild>
            <Button asChild size="lg">
              <a href="#register">{registerLabel}</a>
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
