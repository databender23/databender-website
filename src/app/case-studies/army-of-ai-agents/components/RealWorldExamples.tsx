'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface RealWorldExamplesProps {
  className?: string
}

const collisionRecords = [
  { name: 'Sims Frances A', location: 'Tyler, TX' },
  { name: 'Pendergast Finis H', location: 'Tuscaloosa, AL' },
  { name: 'Police Billy', location: 'Huntington Beach, CA' },
  { name: 'Palmer Ruth C', location: 'Oberlin, OH' },
  { name: 'Partridge Charlyn', location: 'Grand Haven, MI' },
]

const unstableRecords = [
  { id: '700576', location: 'Flower Mound, TX' },
  { id: '880625', location: 'Fluvanna, TX' },
  { id: '1281581', location: 'San Augustine, TX' },
  { id: '1234990', location: 'Fort Worth, TX' },
]

export default function RealWorldExamples({ className = '' }: RealWorldExamplesProps) {
  const [activeTab, setActiveTab] = useState<'collision' | 'unstable'>('collision')

  return (
    <div className={`${className}`}>
      {/* Tab buttons */}
      <div className="flex gap-1.5 md:gap-2 mb-4 md:mb-6 justify-center">
        <button
          onClick={() => setActiveTab('collision')}
          className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-colors ${
            activeTab === 'collision'
              ? 'bg-orange-500 text-white'
              : 'bg-bg-secondary text-text-secondary hover:bg-bg-secondary/80'
          }`}
        >
          Same ID, Wrong People
        </button>
        <button
          onClick={() => setActiveTab('unstable')}
          className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-colors ${
            activeTab === 'unstable'
              ? 'bg-purple-500 text-white'
              : 'bg-bg-secondary text-text-secondary hover:bg-bg-secondary/80'
          }`}
        >
          Same Person, Many IDs
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'collision' ? (
          <motion.div
            key="collision"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4 md:space-y-6"
          >
            {/* Problem statement */}
            <div className="text-center max-w-2xl mx-auto px-2">
              <h3 className="text-lg md:text-xl font-bold text-text-primary mb-2">
                670 Different People. One ID.
              </h3>
              <p className="text-sm md:text-base text-text-secondary">
                Owner ID 817132 was assigned to 670 completely unrelated people.
                Different names, different states, nothing in common.
              </p>
            </div>

            {/* Visual example */}
            <div className="grid md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
              {/* Before */}
              <div className="p-4 md:p-6 rounded-xl bg-orange-500/5 border border-orange-500/20">
                <div className="flex items-center gap-2 mb-3 md:mb-4">
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-orange-500" />
                  <span className="text-xs md:text-sm font-medium text-orange-500">BEFORE: Owner ID 817132</span>
                </div>
                <div className="space-y-1.5 md:space-y-2 font-mono text-xs md:text-sm">
                  {collisionRecords.map((record, i) => (
                    <div key={i} className="flex items-center gap-1.5 md:gap-2 text-text-secondary">
                      <span className="text-text-muted">├──</span>
                      <span className="truncate">{record.name}</span>
                      <span className="text-text-muted text-[10px] md:text-xs hidden sm:inline">({record.location})</span>
                    </div>
                  ))}
                  <div className="flex items-center gap-1.5 md:gap-2 text-text-muted">
                    <span>└──</span>
                    <span>... 665 more unrelated people</span>
                  </div>
                </div>
                <p className="mt-3 md:mt-4 text-[10px] md:text-xs text-orange-500">
                  Exclude one person? You&apos;d exclude all 670.
                </p>
              </div>

              {/* After */}
              <div className="p-4 md:p-6 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                <div className="flex items-center gap-2 mb-3 md:mb-4">
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-emerald-500" />
                  <span className="text-xs md:text-sm font-medium text-emerald-500">AFTER: Separated IDs</span>
                </div>
                <div className="space-y-1.5 md:space-y-2 font-mono text-xs md:text-sm">
                  <div className="flex items-center gap-1.5 md:gap-2 text-text-secondary">
                    <span className="text-emerald-500">COL-10001</span>
                    <span className="text-text-muted">→</span>
                    <span className="truncate">Sims Frances A</span>
                  </div>
                  <div className="flex items-center gap-1.5 md:gap-2 text-text-secondary">
                    <span className="text-emerald-500">COL-10002</span>
                    <span className="text-text-muted">→</span>
                    <span className="truncate">Pendergast Finis H</span>
                  </div>
                  <div className="flex items-center gap-1.5 md:gap-2 text-text-secondary">
                    <span className="text-emerald-500">COL-10003</span>
                    <span className="text-text-muted">→</span>
                    <span className="truncate">Police Billy</span>
                  </div>
                  <div className="flex items-center gap-1.5 md:gap-2 text-text-muted">
                    <span>...</span>
                    <span>670 unique IDs total</span>
                  </div>
                </div>
                <p className="mt-3 md:mt-4 text-[10px] md:text-xs text-emerald-500">
                  Each person can be managed individually.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex justify-center gap-4 md:gap-8 pt-2 md:pt-4">
              <div className="text-center">
                <p className="text-xl md:text-2xl font-bold text-orange-500">44,421</p>
                <p className="text-[10px] md:text-xs text-text-muted">Collision Groups</p>
              </div>
              <div className="text-center">
                <p className="text-xl md:text-2xl font-bold text-text-primary">670</p>
                <p className="text-[10px] md:text-xs text-text-muted">Worst Case</p>
              </div>
              <div className="text-center">
                <p className="text-xl md:text-2xl font-bold text-emerald-500">51,609</p>
                <p className="text-[10px] md:text-xs text-text-muted">New IDs Created</p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="unstable"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4 md:space-y-6"
          >
            {/* Problem statement */}
            <div className="text-center max-w-2xl mx-auto px-2">
              <h3 className="text-lg md:text-xl font-bold text-text-primary mb-2">
                One Person. Four Different IDs.
              </h3>
              <p className="text-sm md:text-base text-text-secondary">
                Miller Paula appears in the database four times with four different Owner IDs.
                Same person, scattered across Texas, impossible to deduplicate.
              </p>
            </div>

            {/* Visual example */}
            <div className="grid md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
              {/* Before */}
              <div className="p-4 md:p-6 rounded-xl bg-purple-500/5 border border-purple-500/20">
                <div className="flex items-center gap-2 mb-3 md:mb-4">
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-purple-500" />
                  <span className="text-xs md:text-sm font-medium text-purple-500">BEFORE: Miller Paula</span>
                </div>
                <div className="space-y-2 md:space-y-3 font-mono text-xs md:text-sm">
                  {unstableRecords.map((record, i) => (
                    <div key={i} className="p-1.5 md:p-2 rounded bg-bg-secondary">
                      <div className="text-text-secondary">Owner ID: {record.id}</div>
                      <div className="text-text-muted text-[10px] md:text-xs">{record.location}</div>
                    </div>
                  ))}
                </div>
                <p className="mt-3 md:mt-4 text-[10px] md:text-xs text-purple-500">
                  Four mailings for the same offer. Wasted postage.
                </p>
              </div>

              {/* After */}
              <div className="p-4 md:p-6 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                <div className="flex items-center gap-2 mb-3 md:mb-4">
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-emerald-500" />
                  <span className="text-xs md:text-sm font-medium text-emerald-500">AFTER: Consolidated</span>
                </div>
                <div className="p-3 md:p-4 rounded bg-bg-secondary font-mono text-xs md:text-sm">
                  <div className="text-emerald-500 font-semibold mb-1.5 md:mb-2 text-xs md:text-sm">UNS-2612016076</div>
                  <div className="text-text-secondary mb-2 md:mb-3">Miller Paula</div>
                  <div className="space-y-1 text-[10px] md:text-xs text-text-muted">
                    <div className="flex items-center gap-1.5 md:gap-2">
                      <span className="w-1 h-1 rounded-full bg-text-muted" />
                      <span>Flower Mound, TX</span>
                    </div>
                    <div className="flex items-center gap-1.5 md:gap-2">
                      <span className="w-1 h-1 rounded-full bg-text-muted" />
                      <span>Fluvanna, TX</span>
                    </div>
                    <div className="flex items-center gap-1.5 md:gap-2">
                      <span className="w-1 h-1 rounded-full bg-text-muted" />
                      <span>San Augustine, TX</span>
                    </div>
                    <div className="flex items-center gap-1.5 md:gap-2">
                      <span className="w-1 h-1 rounded-full bg-text-muted" />
                      <span>Fort Worth, TX</span>
                    </div>
                  </div>
                </div>
                <p className="mt-3 md:mt-4 text-[10px] md:text-xs text-emerald-500">
                  One person, one ID, one mailing.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex justify-center gap-4 md:gap-8 pt-2 md:pt-4">
              <div className="text-center">
                <p className="text-xl md:text-2xl font-bold text-purple-500">99,581</p>
                <p className="text-[10px] md:text-xs text-text-muted">Unstable Groups</p>
              </div>
              <div className="text-center">
                <p className="text-xl md:text-2xl font-bold text-text-primary">257</p>
                <p className="text-[10px] md:text-xs text-text-muted">Worst Case</p>
              </div>
              <div className="text-center">
                <p className="text-xl md:text-2xl font-bold text-emerald-500">90,963</p>
                <p className="text-[10px] md:text-xs text-text-muted">IDs Merged</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
