'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface SalesRepOutcomeProps {
  className?: string
}

interface Item {
  refNumber: string
  description: string
  type: 'Implant' | 'Instrument' | 'Disposable'
}

interface Kit {
  name: string
  pdfSource: string
  items: Item[]
}

interface Manufacturer {
  name: string
  kits: Kit[]
  color: string
  bgColor: string
}

// Real data structure based on actual PDFs from manufacturers
const manufacturers: Manufacturer[] = [
  {
    name: 'AAP Implants',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    kits: [
      {
        name: 'Large Fragment 4.5',
        pdfSource: 'Large Fragment 4.5 - Patient Charge Sheet.pdf',
        items: [
          { refNumber: '145-020', description: '4.5mm Cortical Screw 20mm', type: 'Implant' },
          { refNumber: '145-024', description: '4.5mm Cortical Screw 24mm', type: 'Implant' },
          { refNumber: '145-028', description: '4.5mm Cortical Screw 28mm', type: 'Implant' },
          { refNumber: '245-106', description: '4.5mm Locking Plate 6-hole', type: 'Implant' },
          { refNumber: '245-108', description: '4.5mm Locking Plate 8-hole', type: 'Implant' },
          { refNumber: 'DRL-450', description: '4.5mm Drill Bit', type: 'Instrument' },
          { refNumber: 'TAP-450', description: '4.5mm Tap', type: 'Instrument' },
        ],
      },
      {
        name: 'Small Fragment 3.5',
        pdfSource: 'Small Fragment 3.5 - Patient Charge Sheet.pdf',
        items: [
          { refNumber: '135-016', description: '3.5mm Cortical Screw 16mm', type: 'Implant' },
          { refNumber: '135-020', description: '3.5mm Cortical Screw 20mm', type: 'Implant' },
          { refNumber: '235-104', description: '3.5mm Locking Plate 4-hole', type: 'Implant' },
          { refNumber: '235-106', description: '3.5mm Locking Plate 6-hole', type: 'Implant' },
          { refNumber: 'DRL-350', description: '3.5mm Drill Bit', type: 'Instrument' },
        ],
      },
      {
        name: 'Clavicle System',
        pdfSource: 'Clavicle System - Patient Charge Sheet.pdf',
        items: [
          { refNumber: 'CLV-S06', description: 'Clavicle Plate Superior 6-hole', type: 'Implant' },
          { refNumber: 'CLV-S08', description: 'Clavicle Plate Superior 8-hole', type: 'Implant' },
          { refNumber: 'CLV-A06', description: 'Clavicle Plate Anterior 6-hole', type: 'Implant' },
          { refNumber: '135-018', description: '3.5mm Locking Screw 18mm', type: 'Implant' },
        ],
      },
      {
        name: 'Distal Radius 2.5 Volar',
        pdfSource: 'Distal Radius 2.5 Volar Plate - Patient Charge Sheet.pdf',
        items: [
          { refNumber: 'DR25-R2', description: 'Volar Plate Right 2-column', type: 'Implant' },
          { refNumber: 'DR25-L2', description: 'Volar Plate Left 2-column', type: 'Implant' },
          { refNumber: '125-010', description: '2.5mm Locking Screw 10mm', type: 'Implant' },
          { refNumber: '125-012', description: '2.5mm Locking Screw 12mm', type: 'Implant' },
        ],
      },
    ],
  },
  {
    name: 'Maxx Health',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    kits: [
      {
        name: '2.3 Cannulated Screw',
        pdfSource: '2.3 Cannulated Screw Usage Ticket.pdf',
        items: [
          { refNumber: 'CS23-10', description: '2.3mm Cannulated Screw 10mm', type: 'Implant' },
          { refNumber: 'CS23-12', description: '2.3mm Cannulated Screw 12mm', type: 'Implant' },
          { refNumber: 'CS23-14', description: '2.3mm Cannulated Screw 14mm', type: 'Implant' },
          { refNumber: 'GW-09', description: 'Guidewire 0.9mm', type: 'Disposable' },
          { refNumber: 'DRL-18', description: '1.8mm Cannulated Drill', type: 'Instrument' },
        ],
      },
      {
        name: 'Distal Radius 2',
        pdfSource: 'Distal Radius 2 Usage Ticket.pdf',
        items: [
          { refNumber: 'MX-DR2-R', description: 'Distal Radius Plate Right', type: 'Implant' },
          { refNumber: 'MX-DR2-L', description: 'Distal Radius Plate Left', type: 'Implant' },
          { refNumber: 'MX-LS24-08', description: '2.4mm Locking Screw 8mm', type: 'Implant' },
          { refNumber: 'MX-LS24-10', description: '2.4mm Locking Screw 10mm', type: 'Implant' },
        ],
      },
      {
        name: 'Carpal Fusion Plate',
        pdfSource: 'Carpal Fusion Plate Usage Ticket.pdf',
        items: [
          { refNumber: 'CFP-4H', description: 'Carpal Fusion Plate 4-hole', type: 'Implant' },
          { refNumber: 'CFP-6H', description: 'Carpal Fusion Plate 6-hole', type: 'Implant' },
          { refNumber: 'MX-LS20-08', description: '2.0mm Locking Screw 8mm', type: 'Implant' },
        ],
      },
    ],
  },
  {
    name: 'Vilex',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    kits: [
      {
        name: 'HammerFuze',
        pdfSource: 'vilex hammerfuze.pdf',
        items: [
          { refNumber: 'TH22-18T-0900', description: 'Implant 2.2x18 Straight Ti L.Blue', type: 'Implant' },
          { refNumber: 'TH25-20T-1100', description: 'Implant 2.5x20 Straight Ti Gold', type: 'Implant' },
          { refNumber: 'TH30-25T-1100', description: 'Implant 3.0x25 Straight Ti Magenta', type: 'Implant' },
          { refNumber: 'TH22-18T-0910', description: 'Implant 2.2x18 Angled Ti L.Blue', type: 'Implant' },
          { refNumber: 'K100-09D', description: 'Guidewire 0.9x100mm Dbl Trocar', type: 'Disposable' },
          { refNumber: 'ZTH-DDRL', description: 'Stop Drill HammerFUZE 2.0mm', type: 'Disposable' },
        ],
      },
      {
        name: 'FuseNail System',
        pdfSource: 'vilex fusenail.pdf',
        items: [
          { refNumber: 'FN4-035', description: 'FuseNail 4.0x35mm', type: 'Implant' },
          { refNumber: 'FN4-040', description: 'FuseNail 4.0x40mm', type: 'Implant' },
          { refNumber: 'FN5-045', description: 'FuseNail 5.0x45mm', type: 'Implant' },
          { refNumber: 'LS-FN20', description: 'Locking Screw 2.0mm', type: 'Implant' },
          { refNumber: 'GW-FN12', description: 'Guidewire 1.2mm', type: 'Disposable' },
        ],
      },
      {
        name: 'DyneX',
        pdfSource: 'vilex dynex.pdf',
        items: [
          { refNumber: 'DX-25-12', description: 'DyneX Screw 2.5x12mm', type: 'Implant' },
          { refNumber: 'DX-25-14', description: 'DyneX Screw 2.5x14mm', type: 'Implant' },
          { refNumber: 'DX-30-16', description: 'DyneX Screw 3.0x16mm', type: 'Implant' },
          { refNumber: 'DRL-DX20', description: 'DyneX Drill 2.0mm', type: 'Instrument' },
        ],
      },
    ],
  },
]

// Helper to get item type color
const getTypeColor = (type: Item['type']) => {
  switch (type) {
    case 'Implant': return 'bg-teal-50 text-teal-600'
    case 'Instrument': return 'bg-blue-50 text-blue-600'
    case 'Disposable': return 'bg-amber-50 text-amber-600'
  }
}

export default function SalesRepOutcome({ className = '' }: SalesRepOutcomeProps) {
  const [selectedManufacturer, setSelectedManufacturer] = useState<string | null>(null)
  const [selectedKit, setSelectedKit] = useState<string | null>(null)

  const currentManufacturer = manufacturers.find(m => m.name === selectedManufacturer)
  const currentKit = currentManufacturer?.kits.find(k => k.name === selectedKit)

  return (
    <div className={`${className}`}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm font-medium mb-4 border border-green-100">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          See It In Action
        </div>
        <h3 className="text-2xl font-bold text-text-primary mb-2">
          One Organization Built a Mobile App
        </h3>
        <p className="text-text-secondary max-w-2xl mx-auto">
          A medical device distributor used this approach to power a sales rep mobile app.
          This is just <strong>one example</strong> of what becomes possible when your documents become a knowledge base.
        </p>
      </motion.div>

      {/* Mobile App Mockup */}
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Phone frame */}
          <div className="bg-gray-900 rounded-[2.5rem] p-3 shadow-2xl">
            {/* Phone notch */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-gray-900 rounded-b-2xl z-10" />

            {/* Screen */}
            <div className="bg-bg-primary rounded-[2rem] overflow-hidden">
              {/* Status bar */}
              <div className="bg-teal-500 px-6 py-3 flex items-center justify-between text-white text-xs">
                <span>9:41</span>
                <span className="font-semibold">SurgiScribe</span>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
                  </svg>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                  </svg>
                </div>
              </div>

              {/* App content */}
              <div className="min-h-[400px] bg-bg-secondary">
                <AnimatePresence mode="wait">
                  {!selectedManufacturer ? (
                    // Manufacturer list
                    <motion.div
                      key="manufacturers"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="p-4"
                    >
                      <h4 className="text-sm font-semibold text-text-muted uppercase tracking-wide mb-3">
                        Select Manufacturer
                      </h4>
                      <div className="space-y-2">
                        {manufacturers.map((manufacturer) => (
                          <button
                            key={manufacturer.name}
                            onClick={() => setSelectedManufacturer(manufacturer.name)}
                            className="w-full bg-bg-primary p-4 rounded-xl border border-border flex items-center justify-between hover:border-teal-500 transition-colors text-left"
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-lg ${manufacturer.bgColor} flex items-center justify-center`}>
                                <span className={`${manufacturer.color} font-bold text-sm`}>
                                  {manufacturer.name.charAt(0)}
                                </span>
                              </div>
                              <div>
                                <p className="font-medium text-text-primary">{manufacturer.name}</p>
                                <p className="text-xs text-text-muted">{manufacturer.kits.length} kits available</p>
                              </div>
                            </div>
                            <svg className="w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        ))}
                      </div>
                      <p className="text-center text-xs text-text-muted mt-4">
                        70+ manufacturers available
                      </p>
                    </motion.div>
                  ) : !selectedKit ? (
                    // Kit list
                    <motion.div
                      key="kits"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="p-4"
                    >
                      <button
                        onClick={() => setSelectedManufacturer(null)}
                        className="flex items-center gap-2 text-teal-500 text-sm mb-4"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back
                      </button>
                      <div className="flex items-center gap-2 mb-3">
                        <div className={`w-6 h-6 rounded ${currentManufacturer?.bgColor} flex items-center justify-center`}>
                          <span className={`${currentManufacturer?.color} font-bold text-xs`}>
                            {currentManufacturer?.name.charAt(0)}
                          </span>
                        </div>
                        <h4 className="text-sm font-semibold text-text-primary">
                          {selectedManufacturer}
                        </h4>
                      </div>
                      <p className="text-xs text-text-muted mb-3">Select a kit to view items</p>
                      <div className="space-y-2">
                        {currentManufacturer?.kits.map((kit) => (
                          <button
                            key={kit.name}
                            onClick={() => setSelectedKit(kit.name)}
                            className="w-full bg-bg-primary p-4 rounded-xl border border-border text-left hover:border-teal-500 transition-colors"
                          >
                            <p className="font-medium text-text-primary">{kit.name}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-text-muted">{kit.items.length} items</span>
                              <span className="text-text-muted">•</span>
                              <span className="text-xs text-text-muted truncate">{kit.pdfSource}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    // Item list
                    <motion.div
                      key="items"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="p-4"
                    >
                      <button
                        onClick={() => setSelectedKit(null)}
                        className="flex items-center gap-2 text-teal-500 text-sm mb-4"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back
                      </button>
                      <div className="mb-3">
                        <div className="flex items-center gap-2 mb-1">
                          <div className={`w-5 h-5 rounded ${currentManufacturer?.bgColor} flex items-center justify-center`}>
                            <span className={`${currentManufacturer?.color} font-bold text-xs`}>
                              {currentManufacturer?.name.charAt(0)}
                            </span>
                          </div>
                          <span className="text-xs text-text-muted">{selectedManufacturer}</span>
                        </div>
                        <h4 className="text-sm font-semibold text-text-primary">{selectedKit}</h4>
                      </div>
                      <div className="space-y-2 max-h-[280px] overflow-y-auto">
                        {currentKit?.items.map((item, index) => (
                          <motion.div
                            key={item.refNumber}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-bg-primary p-3 rounded-lg border border-border"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0">
                                <p className="font-mono text-sm text-teal-600 font-medium">{item.refNumber}</p>
                                <p className="text-sm text-text-primary mt-0.5 truncate">{item.description}</p>
                              </div>
                              <span className={`text-xs px-2 py-0.5 rounded flex-shrink-0 ${getTypeColor(item.type)}`}>
                                {item.type}
                              </span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Bottom nav */}
              <div className="bg-bg-primary border-t border-border px-6 py-3 flex items-center justify-around">
                <button className="flex flex-col items-center gap-1 text-teal-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span className="text-xs">Home</span>
                </button>
                <button className="flex flex-col items-center gap-1 text-text-muted">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span className="text-xs">Search</span>
                </button>
                <button className="flex flex-col items-center gap-1 text-text-muted">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <span className="text-xs">Account</span>
                </button>
              </div>
            </div>
          </div>

          {/* Floating indicators */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="absolute -right-4 top-1/4 bg-bg-primary shadow-lg rounded-lg p-3 border border-border hidden lg:block"
          >
            <p className="text-xs text-text-muted mb-1">Tap to explore</p>
            <p className="text-sm font-medium text-teal-500">Interactive demo</p>
          </motion.div>
        </motion.div>
      </div>

      {/* What else is possible */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="mt-12 text-center"
      >
        <p className="text-text-muted text-sm mb-4">This same knowledge base could also power:</p>
        <div className="flex flex-wrap justify-center gap-3">
          {['AI Chatbot', 'Inventory App', 'Training Tool', 'API for Partners', 'Automated Ordering'].map((item) => (
            <span
              key={item}
              className="px-4 py-2 bg-bg-primary rounded-lg border border-border text-sm text-text-secondary"
            >
              {item}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
