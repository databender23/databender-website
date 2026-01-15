/**
 * Healthcare AI Readiness Assessment Tests
 * Tests the scoring algorithm and tier assignment for healthcare assessments
 */

import {
  healthcareQuestions,
  calculateHealthcareScores,
  healthcareTierDescriptions,
  type HealthcareQuestion,
  type HealthcareScores,
} from '@/lib/healthcare-assessment'

describe('Healthcare AI Readiness Assessment', () => {
  describe('healthcareQuestions', () => {
    it('should have 12 questions', () => {
      expect(healthcareQuestions).toHaveLength(12)
    })

    it('should have 4 questions in each category', () => {
      const documentManagement = healthcareQuestions.filter(q => q.category === 'documentManagement')
      const knowledgeRetention = healthcareQuestions.filter(q => q.category === 'knowledgeRetention')
      const aiReadiness = healthcareQuestions.filter(q => q.category === 'aiReadiness')

      expect(documentManagement).toHaveLength(4)
      expect(knowledgeRetention).toHaveLength(4)
      expect(aiReadiness).toHaveLength(4)
    })

    it('should have unique question IDs', () => {
      const ids = healthcareQuestions.map(q => q.id)
      const uniqueIds = new Set(ids)
      expect(uniqueIds.size).toBe(ids.length)
    })

    it('should have 4 options per question with values 1-4', () => {
      healthcareQuestions.forEach(q => {
        expect(q.options).toHaveLength(4)
        const values = q.options.map(o => o.value)
        expect(values).toEqual([1, 2, 3, 4])
      })
    })

    it('should have healthcare-specific question IDs', () => {
      const ids = healthcareQuestions.map(q => q.id)
      expect(ids).toContain('search-capability')
      expect(ids).toContain('turnover-impact')
      expect(ids).toContain('compliance-posture')
      expect(ids).toContain('on-premise-capability')
    })
  })

  describe('calculateHealthcareScores', () => {
    it('should return 0 for empty answers', () => {
      const result = calculateHealthcareScores({})
      expect(result.documentManagement).toBe(0)
      expect(result.knowledgeRetention).toBe(0)
      expect(result.aiReadiness).toBe(0)
      expect(result.total).toBe(0)
    })

    it('should calculate minimum scores correctly', () => {
      // All 1s = 25% per category
      const answers: Record<string, number> = {}
      healthcareQuestions.forEach(q => {
        answers[q.id] = 1
      })

      const result = calculateHealthcareScores(answers)
      expect(result.documentManagement).toBe(25)
      expect(result.knowledgeRetention).toBe(25)
      expect(result.aiReadiness).toBe(25)
      expect(result.total).toBe(25)
    })

    it('should calculate maximum scores correctly', () => {
      // All 4s = 100% per category
      const answers: Record<string, number> = {}
      healthcareQuestions.forEach(q => {
        answers[q.id] = 4
      })

      const result = calculateHealthcareScores(answers)
      expect(result.documentManagement).toBe(100)
      expect(result.knowledgeRetention).toBe(100)
      expect(result.aiReadiness).toBe(100)
      expect(result.total).toBe(100)
    })

    it('should handle partial answers', () => {
      const answers = {
        'search-capability': 4,
        'format-consistency': 4,
        // Only 2 of 4 documentManagement questions answered
      }

      const result = calculateHealthcareScores(answers)
      expect(result.documentManagement).toBe(100) // Both answered with 4
      expect(result.knowledgeRetention).toBe(0) // None answered
      expect(result.aiReadiness).toBe(0) // None answered
    })

    it('should calculate mid-range scores correctly', () => {
      // All 2.5 average = 62.5%, rounds to 63
      const answers: Record<string, number> = {}
      healthcareQuestions.forEach((q, i) => {
        // Alternate 2 and 3 for average of 2.5
        answers[q.id] = i % 2 === 0 ? 2 : 3
      })

      const result = calculateHealthcareScores(answers)
      // Each category has 4 questions: 2+3+2+3 = 10, 10/(4*4) = 62.5%
      expect(result.documentManagement).toBe(63)
      expect(result.knowledgeRetention).toBe(63)
      expect(result.aiReadiness).toBe(63)
    })

    it('should normalize scores to 0-100 scale', () => {
      const answers: Record<string, number> = {}
      healthcareQuestions.forEach(q => {
        answers[q.id] = 3 // 75% of max
      })

      const result = calculateHealthcareScores(answers)
      expect(result.documentManagement).toBe(75)
      expect(result.knowledgeRetention).toBe(75)
      expect(result.aiReadiness).toBe(75)
      expect(result.total).toBe(75)
    })
  })

  describe('tier assignment', () => {
    it('should assign "early" tier for scores under 35', () => {
      const answers: Record<string, number> = {}
      healthcareQuestions.forEach(q => {
        answers[q.id] = 1 // All 1s = 25%
      })

      const result = calculateHealthcareScores(answers)
      expect(result.total).toBe(25)
      expect(result.tier).toBe('early')
    })

    it('should assign "emerging" tier for scores 35-54', () => {
      // Need average of 2 per question: 2/4 = 50%
      const answers: Record<string, number> = {}
      healthcareQuestions.forEach(q => {
        answers[q.id] = 2
      })

      const result = calculateHealthcareScores(answers)
      expect(result.total).toBe(50)
      expect(result.tier).toBe('emerging')
    })

    it('should assign "developing" tier for scores 55-74', () => {
      // Mix of 2s and 3s for ~63%
      const answers: Record<string, number> = {}
      healthcareQuestions.forEach((q, i) => {
        answers[q.id] = i % 2 === 0 ? 2 : 3
      })

      const result = calculateHealthcareScores(answers)
      expect(result.total).toBe(63)
      expect(result.tier).toBe('developing')
    })

    it('should assign "ready" tier for scores 75+', () => {
      const answers: Record<string, number> = {}
      healthcareQuestions.forEach(q => {
        answers[q.id] = 4
      })

      const result = calculateHealthcareScores(answers)
      expect(result.total).toBe(100)
      expect(result.tier).toBe('ready')
    })

    it('should handle edge case at tier boundaries', () => {
      // Test score of exactly 35 (emerging threshold)
      // 35% = 1.4 average. Can't hit exactly, but close:
      // Mixed scores to get ~36%
      const answers: Record<string, number> = {}
      healthcareQuestions.forEach((q, i) => {
        // Pattern to get close to 35%: mostly 1s with some 2s
        answers[q.id] = i < 9 ? 1 : 2 // 9 ones, 3 twos = 15/48 = 31.25% = early
      })

      const result = calculateHealthcareScores(answers)
      expect(result.tier).toBe('early')
    })
  })

  describe('recommendations', () => {
    it('should generate recommendations based on lowest scoring categories', () => {
      // Score high on documentManagement, low on others
      const answers: Record<string, number> = {}
      healthcareQuestions.forEach(q => {
        if (q.category === 'documentManagement') {
          answers[q.id] = 4
        } else {
          answers[q.id] = 1
        }
      })

      const result = calculateHealthcareScores(answers)
      expect(result.recommendations.length).toBeGreaterThan(0)
      expect(result.recommendations.length).toBeLessThanOrEqual(2)
    })

    it('should include document management recommendation when that category is low', () => {
      const answers: Record<string, number> = {}
      healthcareQuestions.forEach(q => {
        if (q.category === 'documentManagement') {
          answers[q.id] = 1
        } else {
          answers[q.id] = 4
        }
      })

      const result = calculateHealthcareScores(answers)
      expect(result.recommendations.some(r =>
        r.includes('documents') || r.includes('organized')
      )).toBe(true)
    })

    it('should include knowledge retention recommendation when that category is low', () => {
      const answers: Record<string, number> = {}
      healthcareQuestions.forEach(q => {
        if (q.category === 'knowledgeRetention') {
          answers[q.id] = 1
        } else {
          answers[q.id] = 4
        }
      })

      const result = calculateHealthcareScores(answers)
      expect(result.recommendations.some(r =>
        r.includes('capturing') || r.includes('staff') || r.includes('retirement')
      )).toBe(true)
    })

    it('should include AI readiness recommendation when that category is low', () => {
      const answers: Record<string, number> = {}
      healthcareQuestions.forEach(q => {
        if (q.category === 'aiReadiness') {
          answers[q.id] = 1
        } else {
          answers[q.id] = 4
        }
      })

      const result = calculateHealthcareScores(answers)
      expect(result.recommendations.some(r =>
        r.includes('governance') || r.includes('infrastructure') || r.includes('AI')
      )).toBe(true)
    })
  })

  describe('healthcareTierDescriptions', () => {
    it('should have descriptions for all tiers', () => {
      expect(healthcareTierDescriptions.early).toBeDefined()
      expect(healthcareTierDescriptions.emerging).toBeDefined()
      expect(healthcareTierDescriptions.developing).toBeDefined()
      expect(healthcareTierDescriptions.ready).toBeDefined()
    })

    it('should have title, description, and nextSteps for each tier', () => {
      Object.values(healthcareTierDescriptions).forEach(tier => {
        expect(tier.title).toBeTruthy()
        expect(tier.description).toBeTruthy()
        expect(tier.nextSteps).toBeInstanceOf(Array)
        expect(tier.nextSteps.length).toBeGreaterThan(0)
      })
    })

    it('should have healthcare-specific content in nextSteps', () => {
      // Check that at least some nextSteps mention healthcare-specific concerns
      const allNextSteps = Object.values(healthcareTierDescriptions)
        .flatMap(tier => tier.nextSteps)
        .join(' ')
        .toLowerCase()

      expect(
        allNextSteps.includes('clinical') ||
        allNextSteps.includes('compliance') ||
        allNextSteps.includes('hipaa') ||
        allNextSteps.includes('phi')
      ).toBe(true)
    })
  })
})
