'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface BeforeAfterTransformProps {
  className?: string
}

// Before: Fragmented records with problems
const fragmentedRecords = [
  {
    id: '817132',
    name: 'John Miller',
    address: '123 Oak St, Denver CO',
    problem: 'same_id',
    problemText: 'ID shared with 669 other people!',
  },
  {
    id: '817132',
    name: 'Paula Richardson',
    address: '456 Pine Ave, Boulder CO',
    problem: 'same_id',
    problemText: 'Different person, same ID',
  },
  {
    id: '234567',
    name: 'Miller, J',
    address: '123 Oak Street',
    problem: 'duplicate',
    problemText: 'Same as record #1?',
  },
  {
    id: '891234',
    name: 'JOHN MILLER',
    address: 'Oak St 123, Denver',
    problem: 'duplicate',
    problemText: 'Also same person?',
  },
]

// After: Clean unified owner profiles
const unifiedOwners = [
  {
    unifiedId: 'UNIFIED-1234567',
    name: 'John Miller',
    properties: 12,
    address: '123 Oak St, Denver CO 80202',
    confidence: 94,
    matchTypes: ['ADDRESS_MATCH', 'NICKNAME_MATCH', 'LOCATION_BASED'],
  },
  {
    unifiedId: 'UNIFIED-7654321',
    name: 'Paula Richardson',
    properties: 3,
    address: '456 Pine Ave, Boulder CO 80301',
    confidence: 98,
    matchTypes: ['TRUST_OLD_ID', 'ADDRESS_MATCH'],
  },
]

export default function BeforeAfterTransform({ className = '' }: BeforeAfterTransformProps) {
  const [showAfter, setShowAfter] = useState(false)

  return (
    <div className={`${className}`}>
      {/* Toggle */}
      <div className="flex justify-center mb-4 md:mb-6">
        <div className="inline-flex items-center gap-1 p-1 bg-bg-secondary rounded-lg border border-border">
          <button
            onClick={() => setShowAfter(false)}
            className={`px-3 py-1.5 md:px-4 md:py-2 rounded-md text-xs md:text-sm font-medium transition-all ${
              !showAfter
                ? 'bg-red-500 text-white shadow-sm'
                : 'text-text-secondary hover:bg-bg-primary'
            }`}
          >
            Before: ID Chaos
          </button>
          <button
            onClick={() => setShowAfter(true)}
            className={`px-3 py-1.5 md:px-4 md:py-2 rounded-md text-xs md:text-sm font-medium transition-all ${
              showAfter
                ? 'bg-teal-500 text-white shadow-sm'
                : 'text-text-secondary hover:bg-bg-primary'
            }`}
          >
            After: Clean Profiles
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="relative min-h-[350px] md:min-h-[400px]">
        <AnimatePresence mode="wait">
          {!showAfter ? (
            <motion.div
              key="before"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-bg-primary rounded-xl border border-border p-4 md:p-6 shadow-sm"
            >
              {/* Header */}
              <div className="border-b border-border pb-3 md:pb-4 mb-3 md:mb-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-red-500 mb-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      Raw Data from Provider
                    </div>
                    <h4 className="font-semibold text-text-primary text-sm md:text-base">Owner Records Export</h4>
                    <p className="text-xs md:text-sm text-text-secondary">1.69M records with broken IDs</p>
                  </div>
                  <div className="sm:text-right">
                    <span className="px-2 py-1 md:px-3 bg-red-50 text-red-600 rounded-full text-[10px] md:text-xs font-medium border border-red-100">
                      44,421 collision groups
                    </span>
                  </div>
                </div>
              </div>

              {/* Fragmented records */}
              <div className="space-y-2 md:space-y-3">
                {fragmentedRecords.map((record, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative p-3 md:p-4 rounded-lg border ${
                      record.problem === 'same_id'
                        ? 'border-red-200 bg-red-50/50'
                        : 'border-amber-200 bg-amber-50/50'
                    }`}
                  >
                    {/* Problem indicator */}
                    <div className={`absolute -left-1 top-0 bottom-0 w-1 rounded-full ${
                      record.problem === 'same_id' ? 'bg-red-400' : 'bg-amber-400'
                    }`} />

                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-1.5 md:gap-3 mb-1">
                          <span className="font-mono text-xs md:text-sm text-text-muted">ID: {record.id}</span>
                          <span className={`px-1.5 py-0.5 rounded text-[9px] md:text-[10px] font-medium whitespace-nowrap ${
                            record.problem === 'same_id'
                              ? 'bg-red-100 text-red-600'
                              : 'bg-amber-100 text-amber-600'
                          }`}>
                            {record.problemText}
                          </span>
                        </div>
                        <p className="font-medium text-text-primary text-sm md:text-base truncate">{record.name}</p>
                        <p className="text-xs md:text-sm text-text-secondary truncate">{record.address}</p>
                      </div>
                      <svg className={`w-4 h-4 md:w-5 md:h-5 flex-shrink-0 ${
                        record.problem === 'same_id' ? 'text-red-400' : 'text-amber-400'
                      }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Problems summary */}
              <div className="grid grid-cols-3 gap-2 md:gap-3 mt-4 md:mt-6 pt-3 md:pt-4 border-t border-border">
                <div className="text-center p-2 md:p-3 bg-red-50 rounded-lg border border-red-100">
                  <div className="text-base md:text-lg font-bold text-red-500">670</div>
                  <div className="text-[10px] md:text-xs text-text-muted">Worst collision</div>
                </div>
                <div className="text-center p-2 md:p-3 bg-amber-50 rounded-lg border border-amber-100">
                  <div className="text-base md:text-lg font-bold text-amber-500">99,581</div>
                  <div className="text-[10px] md:text-xs text-text-muted">Duplicate groups</div>
                </div>
                <div className="text-center p-2 md:p-3 bg-red-50 rounded-lg border border-red-100">
                  <div className="text-base md:text-lg font-bold text-red-500">???</div>
                  <div className="text-[10px] md:text-xs text-text-muted">True owner count</div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="after"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-bg-primary rounded-xl border border-border p-4 md:p-6 shadow-sm"
            >
              {/* Success header */}
              <div className="border-b border-border pb-3 md:pb-4 mb-3 md:mb-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-teal-600 mb-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Resolved & Validated
                    </div>
                    <h4 className="font-semibold text-text-primary text-sm md:text-base">Unified Owner Profiles</h4>
                    <p className="text-xs md:text-sm text-text-secondary">AI-validated entity resolution</p>
                  </div>
                  <div className="sm:text-right">
                    <span className="px-2 py-1 md:px-3 bg-teal-50 text-teal-600 rounded-full text-[10px] md:text-xs font-medium border border-teal-100">
                      1.25M unique owners
                    </span>
                  </div>
                </div>
              </div>

              {/* Unified owner cards */}
              <div className="space-y-3 md:space-y-4">
                {unifiedOwners.map((owner, index) => (
                  <motion.div
                    key={owner.unifiedId}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.15 }}
                    className="relative p-3 md:p-4 rounded-lg border border-teal-200 bg-teal-50/30"
                  >
                    {/* Success indicator */}
                    <div className="absolute -left-1 top-0 bottom-0 w-1 rounded-full bg-teal-400" />

                    <div className="flex items-start justify-between gap-2 mb-2 md:mb-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-1.5 md:gap-2 mb-1">
                          <span className="font-mono text-xs md:text-sm font-medium text-teal-600 truncate">{owner.unifiedId}</span>
                          <span className="px-1.5 py-0.5 bg-green-100 text-green-600 rounded text-[9px] md:text-[10px] font-medium whitespace-nowrap">
                            {owner.confidence}% confidence
                          </span>
                        </div>
                        <p className="font-semibold text-text-primary text-sm md:text-lg truncate">{owner.name}</p>
                      </div>
                      <svg className="w-5 h-5 md:w-6 md:h-6 text-teal-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>

                    <div className="grid grid-cols-2 gap-2 md:gap-4 text-xs md:text-sm">
                      <div>
                        <p className="text-text-muted text-[10px] md:text-xs mb-0.5 md:mb-1">Address</p>
                        <p className="text-text-primary truncate">{owner.address}</p>
                      </div>
                      <div>
                        <p className="text-text-muted text-[10px] md:text-xs mb-0.5 md:mb-1">Properties Linked</p>
                        <p className="text-text-primary font-medium">{owner.properties} properties</p>
                      </div>
                    </div>

                    <div className="mt-2 md:mt-3 pt-2 md:pt-3 border-t border-teal-100">
                      <p className="text-text-muted text-[10px] md:text-xs mb-1">Match Types Used</p>
                      <div className="flex flex-wrap gap-1">
                        {owner.matchTypes.map((type) => (
                          <span
                            key={type}
                            className="px-1.5 md:px-2 py-0.5 bg-teal-100 text-teal-700 rounded text-[9px] md:text-[10px] font-mono"
                          >
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Success metrics */}
              <div className="grid grid-cols-3 gap-2 md:gap-3 mt-4 md:mt-6 pt-3 md:pt-4 border-t border-border">
                <div className="text-center p-2 md:p-3 bg-teal-50 rounded-lg border border-teal-100">
                  <div className="text-base md:text-lg font-bold text-teal-500">1.25M</div>
                  <div className="text-[10px] md:text-xs text-text-muted">Unique owners</div>
                </div>
                <div className="text-center p-2 md:p-3 bg-green-50 rounded-lg border border-green-100">
                  <div className="text-base md:text-lg font-bold text-green-500">94%</div>
                  <div className="text-[10px] md:text-xs text-text-muted">Avg confidence</div>
                </div>
                <div className="text-center p-2 md:p-3 bg-teal-50 rounded-lg border border-teal-100">
                  <div className="text-base md:text-lg font-bold text-teal-500">$200</div>
                  <div className="text-[10px] md:text-xs text-text-muted">AI validation cost</div>
                </div>
              </div>

              {/* Data flow indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-4 md:mt-6 flex flex-wrap items-center justify-center gap-2 md:gap-4 text-[10px] md:text-xs text-text-muted"
              >
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3 md:w-4 md:h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Accurate Targeting
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3 md:w-4 md:h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Ownership Tracking
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3 md:w-4 md:h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Audit Trail
                </span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Click prompt */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center text-sm text-text-muted mt-4"
      >
        Click the toggle above to see the transformation
      </motion.p>
    </div>
  )
}
