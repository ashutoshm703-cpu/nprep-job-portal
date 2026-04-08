import { useState } from 'react'
import { ChevronDown, MapPin, Globe } from 'lucide-react'
import Toggle from '../shared/Toggle'
import StatePicker from '../shared/StatePicker'
import LanguagePicker from '../shared/LanguagePicker'

export function DateField({ value, onChange, label }) {
  return (
    <div>
      <label className="text-xs font-medium text-text-secondary mb-1.5 block">{label}</label>
      <input
        type="date"
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full px-4 py-3 border border-border rounded-xl text-sm text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all bg-white"
        placeholder="DD/MM/YY"
      />
    </div>
  )
}

export function SelectField({ value, onChange, label, options, placeholder = 'Select' }) {
  return (
    <div>
      <label className="text-xs font-medium text-text-secondary mb-1.5 block">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full px-4 py-3 border border-border rounded-xl text-sm text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all bg-white appearance-none pr-10"
        >
          <option value="">{placeholder}</option>
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
      </div>
    </div>
  )
}

export function RadioGroup({ value, onChange, label, options }) {
  return (
    <div>
      <label className="text-xs font-medium text-text-secondary mb-2 block">{label}</label>
      <div className="flex gap-3">
        {options.map(opt => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`flex-1 py-3 px-3 rounded-xl text-xs font-medium border-2 transition-all ${
              value === opt.value
                ? 'border-navy bg-navy/5 text-navy'
                : 'border-border text-text-secondary hover:border-slate-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                value === opt.value ? 'border-navy' : 'border-slate-300'
              }`}>
                {value === opt.value && <div className="w-2 h-2 rounded-full bg-navy" />}
              </div>
              <span>{opt.label}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export function StatePickerField({ value, onChange, label }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div>
        <label className="text-xs font-medium text-text-secondary mb-1.5 block">{label}</label>
        <button
          onClick={() => setIsOpen(true)}
          className="w-full px-4 py-3 border border-border rounded-xl text-sm text-left flex items-center justify-between hover:border-slate-300 transition-all"
        >
          <span className={value ? 'text-text-primary' : 'text-text-muted'}>
            {value || 'Select State'}
          </span>
          <MapPin size={16} className="text-text-muted" />
        </button>
      </div>
      <StatePicker
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        value={value}
        onChange={onChange}
      />
    </>
  )
}

export function LanguagePickerField({ value = [], onChange, label }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div>
        <label className="text-xs font-medium text-text-secondary mb-1.5 block">{label}</label>
        <button
          onClick={() => setIsOpen(true)}
          className="w-full px-4 py-3 border border-border rounded-xl text-sm text-left flex items-center justify-between hover:border-slate-300 transition-all"
        >
          <span className={value.length > 0 ? 'text-text-primary' : 'text-text-muted'}>
            {value.length > 0 ? value.join(', ') : 'Select Languages'}
          </span>
          <Globe size={16} className="text-text-muted" />
        </button>
      </div>
      <LanguagePicker
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        value={value}
        onChange={onChange}
      />
    </>
  )
}

export function NumberField({ value, onChange, label, placeholder, suffix }) {
  return (
    <div>
      <label className="text-xs font-medium text-text-secondary mb-1.5 block">{label}</label>
      <div className="relative">
        <input
          type="number"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-3 border border-border rounded-xl text-sm text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all bg-white"
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-text-muted">{suffix}</span>
        )}
      </div>
    </div>
  )
}

export { Toggle }
