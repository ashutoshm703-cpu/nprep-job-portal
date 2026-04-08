import { useState, useMemo } from 'react'
import { Search, Check, Info } from 'lucide-react'
import BottomSheet from './BottomSheet'
import { INDIAN_LANGUAGES } from '../../data/languages'

export default function LanguagePicker({ isOpen, onClose, value = [], onChange }) {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(value)

  const filtered = useMemo(() => {
    if (!search.trim()) return INDIAN_LANGUAGES
    const q = search.toLowerCase()
    return INDIAN_LANGUAGES.filter(l => l.toLowerCase().includes(q))
  }, [search])

  const handleToggle = (lang) => {
    setSelected(prev =>
      prev.includes(lang) ? prev.filter(l => l !== lang) : [...prev, lang]
    )
  }

  const handleApply = () => {
    onChange(selected)
    onClose()
  }

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="Select Languages" height="85vh">
      <div className="px-6 pb-3">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all"
          />
        </div>
      </div>

      {/* Info banner */}
      <div className="mx-6 mb-3 p-3 bg-warning-light rounded-xl flex gap-2">
        <Info size={16} className="text-warning flex-shrink-0 mt-0.5" />
        <p className="text-xs text-warning leading-relaxed">
          Some exams only allow for region specific languages. Hence, select all languages you are proficient to speak, read and write.
        </p>
      </div>

      <div className="px-6 flex-1 overflow-y-auto">
        {filtered.map(lang => {
          const isSelected = selected.includes(lang)
          return (
            <button
              key={lang}
              onClick={() => handleToggle(lang)}
              className="w-full flex items-center gap-3 py-3.5 border-b border-slate-50 text-left transition-colors hover:bg-slate-50"
            >
              <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 border-2 transition-all ${
                isSelected ? 'bg-navy border-navy' : 'border-slate-300'
              }`}>
                {isSelected && <Check size={14} className="text-white" />}
              </div>
              <span className={`text-sm ${isSelected ? 'font-medium text-navy' : 'text-text-primary'}`}>
                {lang}
              </span>
            </button>
          )
        })}
      </div>

      <div className="px-6 py-4 border-t border-border flex gap-3">
        <button
          onClick={onClose}
          className="flex-1 py-3 rounded-xl text-sm font-medium text-text-secondary hover:bg-slate-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleApply}
          className="flex-1 py-3 rounded-xl text-sm font-semibold text-white gradient-navy shadow-glow-accent transition-all active:scale-[0.98]"
        >
          Apply {selected.length > 0 && `(${selected.length})`}
        </button>
      </div>
    </BottomSheet>
  )
}
