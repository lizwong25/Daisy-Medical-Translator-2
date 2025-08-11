"use client"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"

interface LanguageSelectorProps {
  label: string
  value: string
  onChange: (value: string) => void
}

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Spanish", flag: "🇪🇸" },
  { code: "zh", name: "Mandarin", flag: "🇨🇳" },
]

export default function LanguageSelector({ label, value, onChange }: LanguageSelectorProps) {
  const selectedLanguage = languages.find((lang) => lang.code === value) || languages[0]

  return (
    <div className="flex flex-col items-center space-y-2">
      <span className="text-sm font-medium text-slate-600">{label}</span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="w-32 sm:w-36 justify-between bg-white/80 backdrop-blur-sm border-slate-200 hover:bg-white/90"
          >
            <div className="flex items-center space-x-2">
              <span className="text-lg">{selectedLanguage.flag}</span>
              <span className="text-sm font-medium">{selectedLanguage.name}</span>
            </div>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-36 bg-white/95 backdrop-blur-sm">
          {languages.map((language) => (
            <DropdownMenuItem
              key={language.code}
              onClick={() => onChange(language.code)}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <span className="text-lg">{language.flag}</span>
              <span className="text-sm">{language.name}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
