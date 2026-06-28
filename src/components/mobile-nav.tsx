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

const navItems = [
  { label: "About", href: "#about" },
  { label: "Speakers", href: "#speakers" },
  { label: "Schedule", href: "#schedule" },
  { label: "Venue", href: "#venue" },
]

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Open navigation menu">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col" side="right">
        <SheetHeader>
          <SheetTitle>FOSS for All Conference</SheetTitle>
          <SheetDescription>November 28th at AWS Korea 18F</SheetDescription>
        </SheetHeader>

        <nav className="mt-8 flex flex-col gap-2">
          {navItems.map((item) => (
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

        <SheetFooter>
          <SheetClose asChild>
            <Button asChild size="lg">
              <a href="#register">Register</a>
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
