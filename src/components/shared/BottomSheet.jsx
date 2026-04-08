import { useEffect, useState, useRef } from 'react'
import { X } from 'lucide-react'
import { useFrame } from '../layout/MobileFrame'

export default function BottomSheet({ isOpen, onClose, title, children, height = '85vh' }) {
  const frameRef = useFrame()
  const [frameRect, setFrameRect] = useState(null)
  const [visible, setVisible] = useState(false)
  const [animating, setAnimating] = useState(false)

  // Measure frame position
  useEffect(() => {
    const measure = () => {
      if (frameRef?.current) {
        const rect = frameRef.current.getBoundingClientRect()
        setFrameRect({ left: rect.left, width: rect.width })
      }
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [frameRef])

  // Handle open/close animation
  useEffect(() => {
    let timer
    if (isOpen) {
      setVisible(true)
      document.body.style.overflow = 'hidden'
      timer = setTimeout(() => setAnimating(true), 20)
    } else {
      setAnimating(false)
      document.body.style.overflow = ''
      timer = setTimeout(() => setVisible(false), 300)
    }
    return () => {
      clearTimeout(timer)
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!visible || !frameRect) return null

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-50 transition-opacity duration-300"
        style={{
          left: frameRect.left,
          width: frameRect.width,
          backgroundColor: 'rgba(0,0,0,0.4)',
          opacity: animating ? 1 : 0,
        }}
      />
      {/* Sheet */}
      <div
        className="fixed bottom-0 bg-white rounded-t-3xl z-50 flex flex-col transition-transform duration-300 ease-out"
        style={{
          left: frameRect.left,
          width: frameRect.width,
          maxHeight: height,
          transform: animating ? 'translateY(0)' : 'translateY(100%)',
        }}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-slate-300" />
        </div>

        {/* Header */}
        {title && (
          <div className="flex items-center justify-between px-6 py-3">
            <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors"
            >
              <X size={20} className="text-text-secondary" />
            </button>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          {children}
        </div>
      </div>
    </>
  )
}
