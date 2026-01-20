/**
 * Legal AI Readiness Assessment Tests
 * Tests the scoring algorithm and tier assignment for legal assessments
 */

import {
  legalQuestions,
  calculateLegalScores,
  tierDescriptions,
  type LegalQuestion,
  type LegalScores,
} from '@/lib/legal-assessment'

describe('Legal AI Readiness Assessment', () => {
  describe('legalQuestions', () => {
    it('should have 14 questions', () => {
      expect(legalQuestions).toHaveLength(14)
    })

    it('should have correct questions in each category', () => {
      const aiOpportunity = legalQuestions.filter(q => q.category === 'aiOpportunity')
      const dataReadiness = legalQuestions.filter(q => q.category === 'dataReadiness')
      const privacyPosture = legalQuestions.filter(q => q.category === 'privacyPosture')

      expect(aiOpportunity).toHaveLength(5)
      expect(dataReadiness).toHaveLength(5)
      expect(privacyPosture).toHaveLength(4)
    })

    it('should have unique question IDs', () => {
      const ids = legalQuestions.map(q => q.id)
      const uniqueIds = new Set(ids)
      expect(uniqueIds.size).toBe(ids.length)
    })

    it('should have 4 options per question with values 1-4', () => {
      legalQuestions.forEach(q => {
        expect(q.options).toHaveLength(4)
        const values = q.options.map(o => o.value).sort((a, b) => a - b)
        expect(values).toEqual([1, 2, 3, 4])
      })
    })
  })

  describe('calculateLegalScores', () => {
    it('should return 0 for empty answers', () => {
      const result = calculateLegalScores({})
      expect(result.aiOpportunity).toBe(0)
      expect(result.dataReadiness).toBe(0)
      expect(result.privacyPosture).toBe(0)
      expect(result.total).toBe(0)
    })

    it('should calculate minimum scores correctly', () => {
      // All 1s = 25% per category
      const answers: Record<string, number> = {}
      legalQuestions.forEach(q => {
        answers[q.id] = 1
      })

      const result = calculateLegalScores(answers)
      expect(result.aiOpportunity).toBe(25)
      expect(result.dataReadiness).toBe(25)
      expect(result.privacyPosture).toBe(25)
      expect(result.total).toBe(25)
    })

    it('should calculate maximum scores correctly', () => {
      // All 4s = 100% per category
      const answers: Record<string, number> = {}
      legalQuestions.forEach(q => {
        answers[q.id] = 4
      })

      const result = calculateLegalScores(answers)
      expect(result.aiOpportunity).toBe(100)
      expect(result.dataReadiness).toBe(100)
      expect(result.privacyPosture).toBe(100)
      expect(result.total).toBe(100)
    })

    it('should handle partial answers', () => {
      const answers = {
        'document-review-volume': 4,
        'research-time': 4,
        // Only 2 of 4 aiOpportunity questions answered
      }

      const result = calculateLegalScores(answers)
      expect(result.aiOpportunity).toBe(100) // Both answered with 4
      expect(result.dataReadiness).toBe(0) // None answered
      expect(result.privacyPosture).toBe(0) // None answered
    })

    it('should calculate mid-range scores correctly', () => {
      // All 2.5 average should produce scores around 60-65%
      const answers: Record<string, number> = {}
      legalQuestions.forEach((q, i) => {
        // Alternate 2 and 3 for average of 2.5
        answers[q.id] = i % 2 === 0 ? 2 : 3
      })

      const result = calculateLegalScores(answers)
      // Mid-range scores should be between 55-70%
      expect(result.aiOpportunity).toBeGreaterThanOrEqual(55)
      expect(result.aiOpportunity).toBeLessThanOrEqual(70)
      expect(result.dataReadiness).toBeGreaterThanOrEqual(55)
      expect(result.dataReadiness).toBeLessThanOrEqual(70)
      expect(result.privacyPosture).toBeGreaterThanOrEqual(55)
      expect(result.privacyPosture).toBeLessThanOrEqual(70)
    })
  })

  describe('tier assignment', () => {
    it('should assign "early" tier for scores under 35', () => {
      const answers: Record<string, number> = {}
      legalQuestions.forEach(q => {
        answers[q.id] = 1 // All 1s = 25%
      })

      const result = calculateLegalScores(answers)
      expect(result.tier).toBe('early')
    })

    it('should assign "emerging" tier for scores 35-54', () => {
      // Need average of 2 per question: 2/4 = 50%
      const answers: Record<string, number> = {}
      legalQuestions.forEach(q => {
        answers[q.id] = 2
      })

      const result = calculateLegalScores(answers)
      expect(result.total).toBe(50)
      expect(result.tier).toBe('emerging')
    })

    it('should assign "developing" tier for scores 55-74', () => {
      // Need average of 3 per question: 3/4 = 75%
      const answers: Record<string, number> = {}
      legalQuestions.forEach(q => {
        answers[q.id] = 3
      })

      const result = calculateLegalScores(answers)
      expect(result.total).toBe(75)
      expect(result.tier).toBe('ready') // 75 is actually "ready" threshold

      // Try a score that lands in developing
      const answers2: Record<string, number> = {}
      legalQuestions.forEach((q, i) => {
        answers2[q.id] = i % 2 === 0 ? 2 : 3 // Average ~2.5 = 63%
      })
      const result2 = calculateLegalScores(answers2)
      expect(result2.tier).toBe('developing')
    })

    it('should assign "ready" tier for scores 75+', () => {
      const answers: Record<string, number> = {}
      legalQuestions.forEach(q => {
        answers[q.id] = 4
      })

      const result = calculateLegalScores(answers)
      expect(result.tier).toBe('ready')
    })
  })

  describe('recommendations', () => {
    it('should generate recommendations based on lowest scoring categories', () => {
      // Score high on aiOpportunity, low on others
      const answers: Record<string, number> = {}
      legalQuestions.forEach(q => {
        if (q.category === 'aiOpportunity') {
          answers[q.id] = 4
        } else {
          answers[q.id] = 1
        }
      })

      const result = calculateLegalScores(answers)
      expect(result.recommendations.length).toBeGreaterThan(0)
      expect(result.recommendations.length).toBeLessThanOrEqual(2)
    })

    it('should include data readiness recommendation when that category is low', () => {
      const answers: Record<string, number> = {}
      legalQuestions.forEach(q => {
        if (q.category === 'dataReadiness') {
          answers[q.id] = 1
        } else {
          answers[q.id] = 4
        }
      })

      const result = calculateLegalScores(answers)
      expect(result.recommendations.some(r => r.includes('documents') || r.includes('organized'))).toBe(true)
    })

    it('should include privacy recommendation when that category is low', () => {
      const answers: Record<string, number> = {}
      legalQuestions.forEach(q => {
        if (q.category === 'privacyPosture') {
          answers[q.id] = 1
        } else {
          answers[q.id] = 4
        }
      })

      const result = calculateLegalScores(answers)
      expect(result.recommendations.some(r => r.includes('governance') || r.includes('ethics'))).toBe(true)
    })
  })

  describe('tierDescriptions', () => {
    it('should have descriptions for all tiers', () => {
      expect(tierDescriptions.early).toBeDefined()
      expect(tierDescriptions.emerging).toBeDefined()
      expect(tierDescriptions.developing).toBeDefined()
      expect(tierDescriptions.ready).toBeDefined()
    })

    it('should have title, description, and nextSteps for each tier', () => {
      Object.values(tierDescriptions).forEach(tier => {
        expect(tier.title).toBeTruthy()
        expect(tier.description).toBeTruthy()
        expect(tier.nextSteps).toBeInstanceOf(Array)
        expect(tier.nextSteps.length).toBeGreaterThan(0)
      })
    })
  })
})
