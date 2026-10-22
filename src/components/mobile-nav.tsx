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
import { site } from "../config"
import type { NavigationItem, NavigationLink } from "../i18n/navigation"

type MobileNavProps = {
  items: NavigationItem[]
  title: string
  description: string
  registerLabel: string
  openLabel: string
}

function MobileLink({ item }: { item: NavigationLink }) {
  return (
    <SheetClose asChild>
      <a
        href={item.href}
        target={item.external ? "_blank" : undefined}
        rel={item.external ? "noreferrer" : undefined}
        className="rounded-xl px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-accent"
      >
        {item.label}
      </a>
    </SheetClose>
  )
}

export function MobileNav({
  items,
  title,
  description,
  registerLabel,
  openLabel,
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
            item.type === "link" ? (
              <MobileLink item={item} key={item.key} />
            ) : (
              <div className="mt-4 flex flex-col gap-2" key={item.key}>
                <p className="px-3 text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                  {item.label}
                </p>
                {item.items.map((child) => (
                  <MobileLink item={child} key={child.key} />
                ))}
              </div>
            )
          ))}
        </nav>


        <SheetFooter>
          <SheetClose asChild>
            <Button asChild size="lg">
              <a href={site.ticketUrl}>{registerLabel}</a>
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
