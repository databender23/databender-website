/**
 * Main Diagrams Index for PDF Generation
 *
 * This module re-exports all industry-specific diagram modules and provides
 * a unified interface for accessing diagrams by guide slug.
 *
 * Usage:
 *   import { getDiagram, hasDiagram } from './diagrams.mjs';
 *   const svg = getDiagram('associate-multiplier');  // Returns Legal diagram
 *   const svg = getDiagram('hipaa-compliant-ai');    // Returns Healthcare diagram
 */

// Import industry-specific diagram modules
import {
  LEGAL_DIAGRAMS,
  getLegalDiagram,
  hasLegalDiagram,
} from './diagrams-legal.mjs';

import {
  HEALTHCARE_DIAGRAMS,
  getHealthcareDiagram,
  hasHealthcareDiagram,
} from './diagrams-healthcare.mjs';

import {
  MANUFACTURING_DIAGRAMS,
  getManufacturingDiagram,
  hasManufacturingDiagram,
} from './diagrams-manufacturing.mjs';

import {
  CRE_DIAGRAMS,
  getCREDiagram,
  hasCREDiagram,
} from './diagrams-cre.mjs';

import {
  CONSTRUCTION_DIAGRAMS,
  getConstructionDiagram,
  hasConstructionDiagram,
  DISTRIBUTION_DIAGRAMS,
  getDistributionDiagram,
  hasDistributionDiagram,
} from './diagrams-construction-distribution.mjs';

// =============================================================================
// ALL DIAGRAMS - Combined from all industries
// =============================================================================

export const ALL_DIAGRAMS = {
  ...LEGAL_DIAGRAMS,
  ...HEALTHCARE_DIAGRAMS,
  ...MANUFACTURING_DIAGRAMS,
  ...CRE_DIAGRAMS,
  ...CONSTRUCTION_DIAGRAMS,
  ...DISTRIBUTION_DIAGRAMS,
};

// =============================================================================
// UNIFIED API
// =============================================================================

/**
 * Get a diagram SVG by guide slug (searches all industries)
 * @param {string} slug - The guide slug
 * @returns {string|null} SVG string or null if not found
 */
export function getDiagram(slug) {
  // Try each industry in order
  if (hasLegalDiagram(slug)) return getLegalDiagram(slug);
  if (hasHealthcareDiagram(slug)) return getHealthcareDiagram(slug);
  if (hasManufacturingDiagram(slug)) return getManufacturingDiagram(slug);
  if (hasCREDiagram(slug)) return getCREDiagram(slug);
  if (hasConstructionDiagram(slug)) return getConstructionDiagram(slug);
  if (hasDistributionDiagram(slug)) return getDistributionDiagram(slug);

  console.warn(`No diagram found for slug: ${slug}`);
  return null;
}

/**
 * Check if a diagram exists for a given slug (any industry)
 * @param {string} slug - The guide slug
 * @returns {boolean} True if diagram exists
 */
export function hasDiagram(slug) {
  return (
    hasLegalDiagram(slug) ||
    hasHealthcareDiagram(slug) ||
    hasManufacturingDiagram(slug) ||
    hasCREDiagram(slug) ||
    hasConstructionDiagram(slug) ||
    hasDistributionDiagram(slug)
  );
}

/**
 * Get all available diagram slugs across all industries
 * @returns {string[]} Array of all available slugs
 */
export function getAllDiagramSlugs() {
  return Object.keys(ALL_DIAGRAMS);
}

/**
 * Get the industry for a given diagram slug
 * @param {string} slug - The guide slug
 * @returns {string|null} Industry name or null if not found
 */
export function getDiagramIndustry(slug) {
  if (hasLegalDiagram(slug)) return 'legal';
  if (hasHealthcareDiagram(slug)) return 'healthcare';
  if (hasManufacturingDiagram(slug)) return 'manufacturing';
  if (hasCREDiagram(slug)) return 'cre';
  if (hasConstructionDiagram(slug)) return 'construction';
  if (hasDistributionDiagram(slug)) return 'distribution';
  return null;
}

// =============================================================================
// RE-EXPORTS - For direct access to industry-specific modules
// =============================================================================

export {
  // Legal
  LEGAL_DIAGRAMS,
  getLegalDiagram,
  hasLegalDiagram,
  // Healthcare
  HEALTHCARE_DIAGRAMS,
  getHealthcareDiagram,
  hasHealthcareDiagram,
  // Manufacturing
  MANUFACTURING_DIAGRAMS,
  getManufacturingDiagram,
  hasManufacturingDiagram,
  // CRE
  CRE_DIAGRAMS,
  getCREDiagram,
  hasCREDiagram,
  // Construction
  CONSTRUCTION_DIAGRAMS,
  getConstructionDiagram,
  hasConstructionDiagram,
  // Distribution
  DISTRIBUTION_DIAGRAMS,
  getDistributionDiagram,
  hasDistributionDiagram,
};

// Default export with all utilities
export default {
  // All diagrams combined
  ALL_DIAGRAMS,
  // Unified API
  getDiagram,
  hasDiagram,
  getAllDiagramSlugs,
  getDiagramIndustry,
  // Industry-specific
  LEGAL_DIAGRAMS,
  HEALTHCARE_DIAGRAMS,
  MANUFACTURING_DIAGRAMS,
  CRE_DIAGRAMS,
  CONSTRUCTION_DIAGRAMS,
  DISTRIBUTION_DIAGRAMS,
};
