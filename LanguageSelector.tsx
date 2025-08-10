"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface LanguageSelectorProps {
  label: string
  value: string
  onChange: (value: string) => void
}

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Spanish", flag: "🇪🇸" },
  { code: "fr", name: "French", flag: "🇫🇷" },
  { code: "de", name: "German", flag: "🇩🇪" },
  { code: "it", name: "Italian", flag: "🇮🇹" },
  { code: "pt", name: "Portuguese", flag: "🇵🇹" },
  { code: "ru", name: "Russian", flag: "🇷🇺" },
  { code: "ja", name: "Japanese", flag: "🇯🇵" },
  { code: "ko", name: "Korean", flag: "🇰🇷" },
  { code: "zh", name: "Chinese", flag: "🇨🇳" },
  { code: "ar", name: "Arabic", flag: "🇸🇦" },
  { code: "hi", name: "Hindi", flag: "🇮🇳" },
]

export default function LanguageSelector({ label, value, onChange }: LanguageSelectorProps) {
  const selectedLanguage = languages.find((lang) => lang.code === value)

  return (
    <div className="flex flex-col items-center space-y-3">
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-40 sm:w-44 bg-white/80 backdrop-blur-sm border-slate-300 hover:bg-white/90 transition-all duration-200">
          <SelectValue>
            <div className="flex items-center space-x-2">
              <span className="text-lg">{selectedLanguage?.flag}</span>
              <span className="text-sm font-medium">{selectedLanguage?.name}</span>
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-white/95 backdrop-blur-md border-slate-200">
          {languages.map((language) => (
            <SelectItem key={language.code} value={language.code} className="hover:bg-slate-50">
              <div className="flex items-center space-x-2">
                <span className="text-lg">{language.flag}</span>
                <span className="text-sm font-medium">{language.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
