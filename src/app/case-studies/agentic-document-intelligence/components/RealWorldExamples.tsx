'use client'

import { motion } from 'framer-motion'

interface RealWorldExamplesProps {
  className?: string
}

interface ManufacturerFormat {
  name: string
  documentType: string
  description: string
  color: string
  bgColor: string
  layoutType: 'table' | 'checklist' | 'catalog' | 'form'
  sampleItems: string[]
}

const manufacturers: ManufacturerFormat[] = [
  {
    name: 'AAP Implants',
    documentType: 'Patient Charge Sheet',
    description: 'Dense tables with surgical hardware codes, quantities, and nested categories',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    layoutType: 'table',
    sampleItems: ['4.5mm Cortical Screw', 'Locking Plate 6-hole', 'Bone Graft'],
  },
  {
    name: 'Maxx Health',
    documentType: 'Usage Ticket',
    description: 'Checklist-style forms tracking items used during procedures',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    layoutType: 'checklist',
    sampleItems: ['2.3mm Cannulated', '4.0mm Headless', 'Distal Radius'],
  },
  {
    name: 'Vilex',
    documentType: 'Product Catalog',
    description: 'Multi-column layouts with product families and order codes',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    layoutType: 'catalog',
    sampleItems: ['FuseNail System', 'HammerFuze Kit', 'Alphalok Ankle'],
  },
  {
    name: 'Medline',
    documentType: 'Order Form',
    description: 'Grid-based ordering sheets with part numbers and specifications',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    layoutType: 'form',
    sampleItems: ['Surgical Tray A', 'Instrument Set B', 'Consumables Pack'],
  },
]

// Visual layout representations for each format type
function LayoutPreview({ type, color }: { type: ManufacturerFormat['layoutType']; color: string }) {
  const baseClass = 'w-full h-20 rounded-lg p-2'

  switch (type) {
    case 'table':
      return (
        <div className={`${baseClass} bg-white border border-gray-200`}>
          <div className="grid grid-cols-4 gap-1 h-full">
            {/* Header row */}
            <div className={`${color.replace('text', 'bg').replace('600', '200')} rounded h-3`} />
            <div className={`${color.replace('text', 'bg').replace('600', '200')} rounded h-3`} />
            <div className={`${color.replace('text', 'bg').replace('600', '200')} rounded h-3`} />
            <div className={`${color.replace('text', 'bg').replace('600', '200')} rounded h-3`} />
            {/* Data rows */}
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gray-100 rounded h-2" />
            ))}
          </div>
        </div>
      )
    case 'checklist':
      return (
        <div className={`${baseClass} bg-white border border-gray-200`}>
          <div className="space-y-1">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded border-2 ${color.replace('text', 'border')}`}>
                  {i < 2 && <div className={`w-full h-full ${color.replace('text', 'bg')}`} />}
                </div>
                <div className="bg-gray-100 rounded h-2 flex-1" />
              </div>
            ))}
          </div>
        </div>
      )
    case 'catalog':
      return (
        <div className={`${baseClass} bg-white border border-gray-200`}>
          <div className="grid grid-cols-2 gap-2 h-full">
            <div className="space-y-1">
              <div className={`${color.replace('text', 'bg').replace('600', '200')} rounded h-2 w-2/3`} />
              <div className="bg-gray-100 rounded h-1" />
              <div className="bg-gray-100 rounded h-1 w-4/5" />
              <div className="bg-gray-100 rounded h-1 w-3/5" />
            </div>
            <div className="space-y-1">
              <div className={`${color.replace('text', 'bg').replace('600', '200')} rounded h-2 w-2/3`} />
              <div className="bg-gray-100 rounded h-1" />
              <div className="bg-gray-100 rounded h-1 w-4/5" />
              <div className="bg-gray-100 rounded h-1 w-3/5" />
            </div>
          </div>
        </div>
      )
    case 'form':
      return (
        <div className={`${baseClass} bg-white border border-gray-200`}>
          <div className="grid grid-cols-3 gap-1 h-full">
            {/* Form fields */}
            <div className="col-span-2 space-y-1">
              <div className="flex gap-1">
                <div className={`${color.replace('text', 'bg').replace('600', '200')} rounded h-2 w-1/4`} />
                <div className="bg-gray-100 rounded h-2 flex-1" />
              </div>
              <div className="flex gap-1">
                <div className={`${color.replace('text', 'bg').replace('600', '200')} rounded h-2 w-1/4`} />
                <div className="bg-gray-100 rounded h-2 flex-1" />
              </div>
              <div className="flex gap-1">
                <div className={`${color.replace('text', 'bg').replace('600', '200')} rounded h-2 w-1/4`} />
                <div className="bg-gray-100 rounded h-2 flex-1" />
              </div>
            </div>
            <div className="border-l border-gray-200 pl-1 space-y-1">
              <div className="bg-gray-100 rounded h-2" />
              <div className="bg-gray-100 rounded h-2" />
              <div className="bg-gray-100 rounded h-2" />
            </div>
          </div>
        </div>
      )
  }
}

export default function RealWorldExamples({ className = '' }: RealWorldExamplesProps) {
  return (
    <div className={`${className}`}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-6 sm:mb-8"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4 border border-amber-100">
          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          Knowledge Locked Away
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-2 px-2">
          Your Expertise Is Scattered Across Documents
        </h3>
        <p className="text-sm sm:text-base text-text-secondary max-w-2xl mx-auto px-2">
          Years of institutional knowledge trapped in different formats.
          AI can&apos;t read these. Every answer requires someone to dig through files manually.
        </p>
      </motion.div>

      {/* Manufacturer cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {manufacturers.map((manufacturer, index) => (
          <motion.div
            key={manufacturer.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`${manufacturer.bgColor} rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-100`}
          >
            {/* Manufacturer name */}
            <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
              <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${manufacturer.color.replace('text', 'bg')}`} />
              <span className={`text-xs sm:text-sm font-semibold ${manufacturer.color} truncate`}>{manufacturer.name}</span>
            </div>

            {/* Document type */}
            <p className="text-xs sm:text-sm font-medium text-text-primary mb-1 line-clamp-1">
              {manufacturer.documentType}
            </p>

            {/* Layout preview - hidden on very small screens */}
            <div className="hidden sm:block">
              <LayoutPreview type={manufacturer.layoutType} color={manufacturer.color} />
            </div>

            {/* Description */}
            <p className="text-[10px] sm:text-xs text-text-muted mt-1.5 sm:mt-2 leading-relaxed line-clamp-2 sm:line-clamp-none">
              {manufacturer.description}
            </p>

            {/* Sample items - hidden on mobile */}
            <div className="mt-2 sm:mt-3 hidden sm:flex flex-wrap gap-1">
              {manufacturer.sampleItems.slice(0, 2).map((item) => (
                <span
                  key={item}
                  className="text-xs px-2 py-0.5 bg-white/60 rounded text-text-secondary"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Key message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="mt-6 sm:mt-8 text-center"
      >
        <div className="inline-flex items-center justify-center gap-2 sm:gap-3 px-3 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-amber-500/5 to-amber-500/10 rounded-lg sm:rounded-xl border border-amber-500/20 flex-wrap">
          <div className="flex items-center gap-1">
            <span className="text-lg sm:text-2xl font-bold text-amber-600">1000s</span>
            <span className="text-xs sm:text-sm text-text-secondary">docs</span>
          </div>
          <div className="h-6 sm:h-8 w-px bg-border" />
          <div className="flex items-center gap-1">
            <span className="text-lg sm:text-2xl font-bold text-amber-600">70+</span>
            <span className="text-xs sm:text-sm text-text-secondary">formats</span>
          </div>
          <div className="h-6 sm:h-8 w-px bg-border" />
          <div className="flex items-center gap-1">
            <span className="text-lg sm:text-2xl font-bold text-red-500">0</span>
            <span className="text-xs sm:text-sm text-text-secondary">AI access</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
