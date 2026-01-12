'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
} from 'react'
import { diagramConfig } from './DiagramConfig'

export type DiagramMode = 'deep-dive' | 'guided-tour'

interface DiagramContextType {
  mode: DiagramMode
  setMode: (mode: DiagramMode) => void
  currentStep: number
  setCurrentStep: (step: number) => void
  isPlaying: boolean
  setIsPlaying: (playing: boolean) => void
  nextStep: () => void
  prevStep: () => void
  goToStep: (step: number) => void
  togglePlay: () => void
  totalSteps: number
}

const DiagramContext = createContext<DiagramContextType | undefined>(undefined)

interface DiagramProviderProps {
  children: ReactNode
  initialMode?: DiagramMode
  autoPlayInterval?: number
}

export function DiagramProvider({
  children,
  initialMode = 'guided-tour',
  autoPlayInterval = 4000,
}: DiagramProviderProps) {
  const [mode, setMode] = useState<DiagramMode>(initialMode)
  const [currentStep, setCurrentStep] = useState(1)
  const [isPlaying, setIsPlaying] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const totalSteps = diagramConfig.steps.length

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => (prev < totalSteps ? prev + 1 : 1))
  }, [totalSteps])

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => (prev > 1 ? prev - 1 : totalSteps))
  }, [totalSteps])

  const goToStep = useCallback((step: number) => {
    if (step >= 1 && step <= totalSteps) {
      setCurrentStep(step)
    }
  }, [totalSteps])

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev)
  }, [])

  // Auto-play functionality for guided tour mode
  useEffect(() => {
    if (mode === 'guided-tour' && isPlaying) {
      intervalRef.current = setInterval(() => {
        nextStep()
      }, autoPlayInterval)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [mode, isPlaying, autoPlayInterval, nextStep])

  // Stop auto-play when switching to deep-dive mode
  useEffect(() => {
    if (mode === 'deep-dive') {
      // Schedule state update to avoid synchronous setState in effect
      requestAnimationFrame(() => setIsPlaying(false))
    }
  }, [mode])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle keys when not in an input/textarea
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return
      }

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault()
          nextStep()
          break
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault()
          prevStep()
          break
        case ' ':
          e.preventDefault()
          togglePlay()
          break
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
          e.preventDefault()
          goToStep(parseInt(e.key))
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [nextStep, prevStep, togglePlay, goToStep])

  const value: DiagramContextType = {
    mode,
    setMode,
    currentStep,
    setCurrentStep,
    isPlaying,
    setIsPlaying,
    nextStep,
    prevStep,
    goToStep,
    togglePlay,
    totalSteps,
  }

  return (
    <DiagramContext.Provider value={value}>
      {children}
    </DiagramContext.Provider>
  )
}

export function useDiagramContext() {
  const context = useContext(DiagramContext)
  if (context === undefined) {
    throw new Error('useDiagramContext must be used within a DiagramProvider')
  }
  return context
}

export default DiagramProvider
