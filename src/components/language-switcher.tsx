import { Button } from "@/components/ui/button"
import {
  CheckIcon,
  ChevronDownIcon,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type LanguageOption = {
  locale: string
  label: string
  href: string
  current: boolean
}

type LanguageSwitcherProps = {
  label: string
  options: LanguageOption[]
}

export function LanguageSwitcher({ label, options }: LanguageSwitcherProps) {
  const current = options.find((option) => option.current)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="hidden rounded-full md:inline-flex" aria-label={label}>
          {current?.label ?? label}
          <ChevronDownIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {options.map((option) => (
          <DropdownMenuItem asChild key={option.locale}>
            <a
              href={option.href}
              aria-current={option.current ? "page" : undefined}
              className="flex w-full items-center justify-between"
            >
              <span>{option.label}</span>
              {option.current && <CheckIcon className="size-4" />}
            </a>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
