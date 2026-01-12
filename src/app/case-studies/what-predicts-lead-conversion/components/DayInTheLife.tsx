'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TimelineEvent {
  time: string
  title: string
  description: string
  outcome: string
  outcomeType: 'success' | 'info' | 'neutral'
  icon: string
}

const timelineEvents: TimelineEvent[] = [
  {
    time: '9:00 AM',
    title: 'Sarah opens her CRM',
    description: 'Instead of a random list, she sees leads sorted by AI-predicted conversion probability. The top lead shows a score of 94.',
    outcome: 'No more guessing which lead to call first',
    outcomeType: 'success',
    icon: '(1)',
  },
  {
    time: '9:15 AM',
    title: 'First call of the day',
    description: 'She calls TechFlow Inc. - flagged because they recently raised funding, have expanding team signals, and their competitors already use similar solutions.',
    outcome: 'Call connected - decision maker was expecting vendor calls',
    outcomeType: 'success',
    icon: '(2)',
  },
  {
    time: '10:30 AM',
    title: 'Demo scheduled',
    description: 'The lead had all the right signals. Quick qualification, no wasted time on budget or timeline questions - the AI already validated those signals.',
    outcome: 'Demo booked for Thursday',
    outcomeType: 'success',
    icon: '(3)',
  },
  {
    time: '11:00 AM',
    title: 'New lead alert',
    description: 'A form submission just came in. Within 30 seconds, the AI scored it at 87 - high financial fit, urgent timeline indicators detected.',
    outcome: 'Lead jumped to position #2 in the queue',
    outcomeType: 'info',
    icon: '(4)',
  },
  {
    time: '2:00 PM',
    title: 'Skipping the noise',
    description: 'Sarah notices several leads with scores under 40. Instead of calling them, they automatically enter a nurture sequence. She focuses on qualified opportunities.',
    outcome: '3 hours saved on unqualified leads',
    outcomeType: 'neutral',
    icon: '(5)',
  },
  {
    time: '5:00 PM',
    title: 'End of day review',
    description: 'Sarah made 12 calls today - all to pre-qualified, high-scoring leads. 4 demos scheduled. No time wasted on leads that were never going to convert.',
    outcome: '33% demo rate vs. 8% before AI scoring',
    outcomeType: 'success',
    icon: '(6)',
  },
]

interface DayInTheLifeProps {
  className?: string
}

export default function DayInTheLife({ className = '' }: DayInTheLifeProps) {
  const [activeEvent, setActiveEvent] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setActiveEvent((prev) => (prev + 1) % timelineEvents.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const currentEvent = timelineEvents[activeEvent]

  return (
    <div className={`bg-white rounded-2xl border border-border shadow-card overflow-hidden ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-border bg-bg-secondary/50">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-text-primary">A Day in the Life</h3>
            <p className="text-sm text-text-muted">How AI scoring transforms the sales workflow</p>
          </div>
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              isAutoPlaying
                ? 'bg-teal-500/10 text-teal-600'
                : 'bg-bg-secondary text-text-muted hover:bg-bg-secondary/80'
            }`}
          >
            {isAutoPlaying ? 'Auto-playing' : 'Paused'}
          </button>
        </div>
      </div>

      {/* Timeline navigation */}
      <div className="px-6 py-4 border-b border-border overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          {timelineEvents.map((event, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveEvent(index)
                setIsAutoPlaying(false)
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                activeEvent === index
                  ? 'bg-teal-500 text-white shadow-md'
                  : 'bg-bg-secondary text-text-muted hover:bg-bg-secondary/80'
              }`}
            >
              {event.time}
            </button>
          ))}
        </div>
      </div>

      {/* Current event detail */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeEvent}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-start gap-4">
              {/* Time badge */}
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-xl bg-teal-500/10 flex flex-col items-center justify-center">
                  <span className="text-xs text-teal-600 font-medium">
                    {currentEvent.time.split(' ')[1]}
                  </span>
                  <span className="text-xl font-bold text-teal-500">
                    {currentEvent.time.split(' ')[0].replace(':00', '')}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{currentEvent.icon}</span>
                  <h4 className="text-lg font-semibold text-text-primary">{currentEvent.title}</h4>
                </div>

                <p className="text-text-secondary mb-4 leading-relaxed">
                  {currentEvent.description}
                </p>

                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${
                  currentEvent.outcomeType === 'success'
                    ? 'bg-green-50 border border-green-100'
                    : currentEvent.outcomeType === 'info'
                    ? 'bg-teal-50 border border-teal-100'
                    : 'bg-bg-secondary border border-border'
                }`}>
                  <svg
                    className={`w-4 h-4 ${
                      currentEvent.outcomeType === 'success'
                        ? 'text-green-500'
                        : currentEvent.outcomeType === 'info'
                        ? 'text-teal-500'
                        : 'text-text-muted'
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {currentEvent.outcomeType === 'success' ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    )}
                  </svg>
                  <span className={`text-sm font-medium ${
                    currentEvent.outcomeType === 'success'
                      ? 'text-green-700'
                      : currentEvent.outcomeType === 'info'
                      ? 'text-teal-700'
                      : 'text-text-secondary'
                  }`}>
                    {currentEvent.outcome}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress bar */}
      <div className="px-6 pb-6">
        <div className="flex gap-1">
          {timelineEvents.map((_, index) => (
            <div key={index} className="flex-1 h-1 rounded-full bg-bg-secondary overflow-hidden">
              <motion.div
                className="h-full bg-teal-500"
                initial={{ width: '0%' }}
                animate={{
                  width: index < activeEvent ? '100%' : index === activeEvent ? '100%' : '0%',
                }}
                transition={{
                  duration: index === activeEvent && isAutoPlaying ? 4 : 0.3,
                  ease: 'linear',
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="p-6 border-t border-border bg-teal-50/50">
        <div className="flex items-center justify-around text-center">
          <div>
            <div className="text-2xl font-bold text-teal-500">12</div>
            <div className="text-xs text-text-muted">Calls made</div>
          </div>
          <div className="w-px h-10 bg-teal-200" />
          <div>
            <div className="text-2xl font-bold text-teal-500">4</div>
            <div className="text-xs text-text-muted">Demos booked</div>
          </div>
          <div className="w-px h-10 bg-teal-200" />
          <div>
            <div className="text-2xl font-bold text-teal-500">33%</div>
            <div className="text-xs text-text-muted">Demo rate</div>
          </div>
          <div className="w-px h-10 bg-teal-200" />
          <div>
            <div className="text-2xl font-bold text-teal-500">0</div>
            <div className="text-xs text-text-muted">Hours wasted</div>
          </div>
        </div>
      </div>
    </div>
  )
}
