import { createContext, useContext, useRef } from 'react'

const FrameContext = createContext(null)
export const useFrame = () => useContext(FrameContext)

export default function MobileFrame({ children }) {
  const frameRef = useRef(null)

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-200 flex items-start justify-center">
      <div
        ref={frameRef}
        className="w-full max-w-[430px] min-h-screen bg-white relative"
        style={{ boxShadow: '0 0 60px -12px rgba(27, 43, 94, 0.15)' }}
      >
        <FrameContext.Provider value={frameRef}>
          {children}
        </FrameContext.Provider>
      </div>
    </div>
  )
}
