import { useEffect, useState } from "react"
import { CheckIcon, MonitorIcon, MoonIcon, SunIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Theme = "light" | "dark" | "system"

type ThemeToggleLabels = {
  theme: string
  lightTheme: string
  darkTheme: string
  systemTheme: string
}

type ThemeToggleProps = {
  labels: ThemeToggleLabels
}

function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

function applyTheme(theme: Theme) {
  const effectiveTheme = theme === "system" ? getSystemTheme() : theme
  document.documentElement.classList.toggle("dark", effectiveTheme === "dark")
}

export function ThemeToggle({ labels }: ThemeToggleProps) {
  const [theme, setTheme] = useState<Theme>("system")
  const [effectiveTheme, setEffectiveTheme] = useState<"light" | "dark">("light")

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme")
    const initialTheme = storedTheme === "light" || storedTheme === "dark" ? storedTheme : "system"

    setTheme(initialTheme)
    setEffectiveTheme(initialTheme === "system" ? getSystemTheme() : initialTheme)
    applyTheme(initialTheme)
  }, [])

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)")

    function handleSystemThemeChange() {
      if (theme !== "system") return

      const nextTheme = getSystemTheme()
      setEffectiveTheme(nextTheme)
      document.documentElement.classList.toggle("dark", nextTheme === "dark")
    }

    media.addEventListener("change", handleSystemThemeChange)

    return () => media.removeEventListener("change", handleSystemThemeChange)
  }, [theme])

  function updateTheme(nextTheme: Theme) {
    setTheme(nextTheme)

    if (nextTheme === "system") {
      localStorage.removeItem("theme")
    } else {
      localStorage.setItem("theme", nextTheme)
    }

    const nextEffectiveTheme = nextTheme === "system" ? getSystemTheme() : nextTheme
    setEffectiveTheme(nextEffectiveTheme)
    applyTheme(nextTheme)
  }

  const options = [
    { value: "light", label: labels.lightTheme, icon: SunIcon },
    { value: "dark", label: labels.darkTheme, icon: MoonIcon },
    { value: "system", label: labels.systemTheme, icon: MonitorIcon },
  ] as const

  const TriggerIcon = effectiveTheme === "dark" ? MoonIcon : SunIcon

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" aria-label={labels.theme}>
          <TriggerIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {options.map((option) => {
          const Icon = option.icon

          return (
            <DropdownMenuItem key={option.value} onClick={() => updateTheme(option.value)}>
              <Icon />
              <span className="flex-1">{option.label}</span>
              {theme === option.value && <CheckIcon className="size-4" />}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
