import { useState, useMemo } from 'react'
import { Search, Check } from 'lucide-react'
import BottomSheet from './BottomSheet'
import { INDIAN_STATES } from '../../data/states'

export default function StatePicker({ isOpen, onClose, value, onChange, multiSelect = false }) {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(multiSelect ? (value || []) : (value ? [value] : []))

  const filtered = useMemo(() => {
    if (!search.trim()) return INDIAN_STATES
    const q = search.toLowerCase()
    return INDIAN_STATES.filter(s => s.toLowerCase().includes(q))
  }, [search])

  const handleSelect = (state) => {
    if (multiSelect) {
      setSelected(prev =>
        prev.includes(state) ? prev.filter(s => s !== state) : [...prev, state]
      )
    } else {
      onChange(state)
      onClose()
    }
  }

  const handleDone = () => {
    if (multiSelect) {
      onChange(selected)
    }
    onClose()
  }

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} height="80vh">
      <div className="px-6 pb-3">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Search States"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all"
          />
        </div>
      </div>

      <div className="px-6 flex-1 overflow-y-auto">
        {filtered.map(state => {
          const isSelected = selected.includes(state)
          return (
            <button
              key={state}
              onClick={() => handleSelect(state)}
              className="w-full flex items-center gap-3 py-3.5 border-b border-slate-50 text-left transition-colors hover:bg-slate-50"
            >
              <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 border-2 transition-all ${
                isSelected ? 'bg-navy border-navy' : 'border-slate-300'
              }`}>
                {isSelected && <Check size={14} className="text-white" />}
              </div>
              <span className={`text-sm ${isSelected ? 'font-medium text-navy' : 'text-text-primary'}`}>
                {state}
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
          onClick={handleDone}
          className="flex-1 py-3 rounded-xl text-sm font-semibold text-white gradient-navy shadow-glow-accent transition-all active:scale-[0.98]"
        >
          Done
        </button>
      </div>
    </BottomSheet>
  )
}
