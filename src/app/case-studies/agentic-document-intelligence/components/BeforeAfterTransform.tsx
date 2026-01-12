'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface BeforeAfterTransformProps {
  className?: string
}

// Sample data representing real extracted items
const extractedData = [
  {
    manufacturer: 'AAP Implants',
    kit: 'Large Fragment 4.5',
    itemGroup: 'SCREWS',
    itemName: '4.5mm Cortical Screw, Self-Tapping',
    refNumber: 'AAP-CS45-20',
    description: '20mm length, titanium',
    qty: 4,
  },
  {
    manufacturer: 'AAP Implants',
    kit: 'Large Fragment 4.5',
    itemGroup: 'SCREWS',
    itemName: '4.5mm Cortical Screw, Self-Tapping',
    refNumber: 'AAP-CS45-24',
    description: '24mm length, titanium',
    qty: 4,
  },
  {
    manufacturer: 'AAP Implants',
    kit: 'Large Fragment 4.5',
    itemGroup: 'PLATES',
    itemName: '4.5mm Locking Plate',
    refNumber: 'AAP-LP45-6H',
    description: '6-hole, narrow',
    qty: 2,
  },
  {
    manufacturer: 'AAP Implants',
    kit: 'Large Fragment 4.5',
    itemGroup: 'PLATES',
    itemName: '4.5mm Locking Plate',
    refNumber: 'AAP-LP45-8H',
    description: '8-hole, narrow',
    qty: 2,
  },
]

export default function BeforeAfterTransform({ className = '' }: BeforeAfterTransformProps) {
  const [showAfter, setShowAfter] = useState(false)

  return (
    <div className={`${className}`}>
      {/* Toggle */}
      <div className="flex justify-center mb-4 sm:mb-6">
        <div className="inline-flex items-center gap-1 p-1 bg-bg-secondary rounded-lg border border-border">
          <button
            onClick={() => setShowAfter(false)}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-all ${
              !showAfter
                ? 'bg-red-500 text-white shadow-sm'
                : 'text-text-secondary hover:bg-bg-primary'
            }`}
          >
            Before: PDF Chaos
          </button>
          <button
            onClick={() => setShowAfter(true)}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-all ${
              showAfter
                ? 'bg-teal-500 text-white shadow-sm'
                : 'text-text-secondary hover:bg-bg-primary'
            }`}
          >
            After: Clean Data
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="relative min-h-[350px] sm:min-h-[400px]">
        <AnimatePresence mode="wait">
          {!showAfter ? (
            <motion.div
              key="before"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-bg-primary rounded-xl border border-border p-3 sm:p-6 shadow-sm"
            >
              {/* PDF Header simulation */}
              <div className="border-b border-border pb-3 sm:pb-4 mb-3 sm:mb-4">
                <div className="flex items-start sm:items-center justify-between gap-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-text-muted mb-1">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
                      </svg>
                      <span className="truncate">Large Fragment 4.5 - Patient Charge Sheet.pdf</span>
                    </div>
                    <h4 className="text-sm sm:text-base font-semibold text-text-primary">AAP Implants Inc.</h4>
                    <p className="text-xs sm:text-sm text-text-secondary">Patient Charge Sheet - Large Fragment 4.5 System</p>
                  </div>
                  <div className="text-right text-[10px] sm:text-xs text-text-muted flex-shrink-0">
                    <p>Page 1 of 3</p>
                    <p className="mt-1 text-red-500 font-medium">Complex Layout</p>
                  </div>
                </div>
              </div>

              {/* Messy PDF content simulation */}
              <div className="space-y-3 sm:space-y-4">
                {/* Category header - misaligned */}
                <div className="relative">
                  <div className="absolute -left-1 sm:-left-2 top-0 w-0.5 sm:w-1 h-full bg-red-300" />
                  <p className="text-[10px] sm:text-xs text-red-500 mb-1 ml-1">Category detection issue</p>
                  <div className="bg-gray-100 p-2 sm:p-3 rounded font-mono text-xs sm:text-sm">
                    <span className="font-bold">S C R E W S</span>
                    <span className="text-text-muted ml-2 sm:ml-8 text-[10px] sm:text-xs">(continued from page 1)</span>
                  </div>
                </div>

                {/* Table with problems */}
                <div className="relative">
                  <div className="absolute -left-1 sm:-left-2 top-0 w-0.5 sm:w-1 h-full bg-amber-300" />
                  <p className="text-[10px] sm:text-xs text-amber-600 mb-1 ml-1">Multi-column parsing errors</p>
                  <div className="bg-gray-50 p-2 sm:p-3 rounded font-mono text-[10px] sm:text-xs overflow-x-auto -mx-1 px-1">
                    <table className="w-full min-w-[320px]">
                      <thead>
                        <tr className="border-b border-gray-300">
                          <th className="text-left py-1 pr-2 sm:pr-4">Description</th>
                          <th className="text-left py-1 pr-2 sm:pr-4">Size</th>
                          <th className="text-left py-1 pr-2 sm:pr-4">Ref #</th>
                          <th className="text-left py-1">Qty</th>
                        </tr>
                      </thead>
                      <tbody className="text-text-secondary">
                        <tr>
                          <td className="py-1 pr-2 sm:pr-4">4.5mm Cortical Screw</td>
                          <td className="py-1 pr-2 sm:pr-4">20mm</td>
                          <td className="py-1 pr-2 sm:pr-4 text-red-500 line-through">AAP CS45 20</td>
                          <td className="py-1">4</td>
                        </tr>
                        <tr>
                          <td className="py-1 pr-2 sm:pr-4">4.5mm Cortical Screw</td>
                          <td className="py-1 pr-2 sm:pr-4">24mm</td>
                          <td className="py-1 pr-2 sm:pr-4 text-red-500 line-through">AAP-CS 45-24</td>
                          <td className="py-1">4</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Footnotes problem - hidden on small mobile */}
                <div className="relative hidden sm:block">
                  <div className="absolute -left-2 top-0 w-1 h-full bg-red-300" />
                  <p className="text-xs text-red-500 mb-1">Footnotes lost context</p>
                  <div className="bg-gray-100 p-3 rounded font-mono text-xs text-text-muted">
                    <p>* Titanium alloy, sterile packaged</p>
                    <p>** See page 3 for ordering information</p>
                    <p className="text-red-500 mt-2">OCR Result: "Ti tanium al|oy, ster!le pack aged"</p>
                  </div>
                </div>

                {/* Problems summary */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-border">
                  <div className="text-center p-2 sm:p-3 bg-red-50 rounded-lg border border-red-100">
                    <div className="text-sm sm:text-lg font-bold text-red-500">62%</div>
                    <div className="text-[10px] sm:text-xs text-text-muted">Ref accuracy</div>
                  </div>
                  <div className="text-center p-2 sm:p-3 bg-amber-50 rounded-lg border border-amber-100">
                    <div className="text-sm sm:text-lg font-bold text-amber-500">Lost</div>
                    <div className="text-[10px] sm:text-xs text-text-muted">Category</div>
                  </div>
                  <div className="text-center p-2 sm:p-3 bg-red-50 rounded-lg border border-red-100">
                    <div className="text-sm sm:text-lg font-bold text-red-500">Manual</div>
                    <div className="text-[10px] sm:text-xs text-text-muted">Cleanup</div>
                  </div>
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
              className="bg-bg-primary rounded-xl border border-border p-3 sm:p-6 shadow-sm"
            >
              {/* Success header */}
              <div className="border-b border-border pb-3 sm:pb-4 mb-3 sm:mb-4">
                <div className="flex items-start sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-teal-600 mb-1">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Extracted & Validated
                    </div>
                    <h4 className="text-sm sm:text-base font-semibold text-text-primary">Structured Data Output</h4>
                    <p className="text-xs sm:text-sm text-text-secondary">Ready for database or mobile app</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-teal-50 text-teal-600 rounded-full text-[10px] sm:text-xs font-medium border border-teal-100">
                      4 records
                    </span>
                  </div>
                </div>
              </div>

              {/* Clean data table */}
              <div className="overflow-x-auto -mx-1 px-1">
                <table className="w-full text-xs sm:text-sm min-w-[400px]">
                  <thead>
                    <tr className="bg-teal-50 border-b border-teal-100">
                      <th className="text-left py-1.5 sm:py-2 px-2 sm:px-3 font-medium text-teal-700">Manufacturer</th>
                      <th className="text-left py-1.5 sm:py-2 px-2 sm:px-3 font-medium text-teal-700 hidden sm:table-cell">Kit</th>
                      <th className="text-left py-1.5 sm:py-2 px-2 sm:px-3 font-medium text-teal-700 hidden md:table-cell">Category</th>
                      <th className="text-left py-1.5 sm:py-2 px-2 sm:px-3 font-medium text-teal-700">Item</th>
                      <th className="text-left py-1.5 sm:py-2 px-2 sm:px-3 font-medium text-teal-700">Ref #</th>
                      <th className="text-left py-1.5 sm:py-2 px-2 sm:px-3 font-medium text-teal-700">Qty</th>
                    </tr>
                  </thead>
                  <tbody>
                    {extractedData.map((item, index) => (
                      <motion.tr
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border-b border-border hover:bg-bg-secondary transition-colors"
                      >
                        <td className="py-1.5 sm:py-2 px-2 sm:px-3 text-text-primary">{item.manufacturer}</td>
                        <td className="py-1.5 sm:py-2 px-2 sm:px-3 text-text-secondary hidden sm:table-cell">{item.kit}</td>
                        <td className="py-1.5 sm:py-2 px-2 sm:px-3 hidden md:table-cell">
                          <span className="px-1.5 sm:px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[10px] sm:text-xs">
                            {item.itemGroup}
                          </span>
                        </td>
                        <td className="py-1.5 sm:py-2 px-2 sm:px-3 text-text-primary">{item.itemName}</td>
                        <td className="py-1.5 sm:py-2 px-2 sm:px-3 font-mono text-teal-600 font-medium">{item.refNumber}</td>
                        <td className="py-1.5 sm:py-2 px-2 sm:px-3 text-text-primary text-center">{item.qty}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Success metrics */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-border">
                <div className="text-center p-2 sm:p-3 bg-teal-50 rounded-lg border border-teal-100">
                  <div className="text-sm sm:text-lg font-bold text-teal-500">100%</div>
                  <div className="text-[10px] sm:text-xs text-text-muted">Ref accuracy</div>
                </div>
                <div className="text-center p-2 sm:p-3 bg-green-50 rounded-lg border border-green-100">
                  <div className="text-sm sm:text-lg font-bold text-green-500">Preserved</div>
                  <div className="text-[10px] sm:text-xs text-text-muted">Category</div>
                </div>
                <div className="text-center p-2 sm:p-3 bg-teal-50 rounded-lg border border-teal-100">
                  <div className="text-sm sm:text-lg font-bold text-teal-500">Instant</div>
                  <div className="text-[10px] sm:text-xs text-text-muted">Ready to use</div>
                </div>
              </div>

              {/* Data flow indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-4 sm:mt-6 flex items-center justify-center gap-2 sm:gap-4 text-[10px] sm:text-xs text-text-muted flex-wrap"
              >
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Database
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Mobile App
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        className="text-center text-xs sm:text-sm text-text-muted mt-3 sm:mt-4"
      >
        Tap the toggle above to see the transformation
      </motion.p>
    </div>
  )
}
