/**
 * Lead Scoring Tests
 * Tests the lead scoring algorithm used for visitor prioritization
 */

import {
  calculatePageScore,
  calculateEventScore,
  calculateLeadScore,
  getLeadTier,
  getTierColor,
  getTierBadgeClasses,
  PAGE_SCORES,
  BEHAVIOR_SCORES,
  LEAD_SCORE_THRESHOLDS,
  type VisitorScoreData,
} from '@/lib/analytics/lead-scoring'

describe('Lead Scoring', () => {
  describe('calculatePageScore', () => {
    it('should return high score for contact page', () => {
      const score = calculatePageScore('/contact')
      expect(score).toBe(PAGE_SCORES['/contact'])
      expect(score).toBe(30)
    })

    it('should return score for service pages with pattern matching', () => {
      const score = calculatePageScore('/services/data-ai-strategy')
      expect(score).toBe(15) // Matches /services pattern
    })

    it('should return score for case study pages', () => {
      const score = calculatePageScore('/case-studies/example')
      expect(score).toBe(20) // Matches /case-studies pattern
    })

    it('should return base score for homepage', () => {
      const score = calculatePageScore('/')
      expect(score).toBe(5)
    })

    it('should return default score for unknown pages', () => {
      const score = calculatePageScore('/unknown-page')
      expect(score).toBe(2)
    })

    it('should match industry pages pattern', () => {
      const score = calculatePageScore('/industries/legal')
      expect(score).toBe(10)
    })

    it('should match resource guides pattern', () => {
      const score = calculatePageScore('/resources/guides/data-strategy')
      expect(score).toBe(15)
    })
  })

  describe('calculateEventScore', () => {
    it('should return page score for pageview events', () => {
      const score = calculateEventScore('pageview', '/contact')
      expect(score).toBe(30)
    })

    it('should return scroll depth score for 100% scroll', () => {
      const score = calculateEventScore('scroll_depth', '/', { depth: 100 })
      expect(score).toBe(BEHAVIOR_SCORES.SCROLL_DEPTH_100)
    })

    it('should return scroll depth score for 50% scroll', () => {
      const score = calculateEventScore('scroll_depth', '/', { depth: 50 })
      expect(score).toBe(BEHAVIOR_SCORES.SCROLL_DEPTH_50)
    })

    it('should return chat opened score', () => {
      const score = calculateEventScore('chat_open', '/')
      expect(score).toBe(BEHAVIOR_SCORES.CHAT_OPENED)
    })

    it('should return form submit score', () => {
      const score = calculateEventScore('form_submit', '/contact')
      expect(score).toBe(BEHAVIOR_SCORES.FORM_SUBMITTED)
    })

    it('should return assessment score for assessment forms', () => {
      const score = calculateEventScore('form_submit', '/assessments', { formName: 'assessment' })
      expect(score).toBe(BEHAVIOR_SCORES.ASSESSMENT_COMPLETED)
    })
  })

  describe('getLeadTier', () => {
    it('should return Cold for scores 0-25', () => {
      expect(getLeadTier(0)).toBe('Cold')
      expect(getLeadTier(15)).toBe('Cold')
      expect(getLeadTier(25)).toBe('Cold')
    })

    it('should return Warm for scores 26-50', () => {
      expect(getLeadTier(26)).toBe('Warm')
      expect(getLeadTier(40)).toBe('Warm')
      expect(getLeadTier(50)).toBe('Warm')
    })

    it('should return Hot for scores 51-75', () => {
      expect(getLeadTier(51)).toBe('Hot')
      expect(getLeadTier(60)).toBe('Hot')
      expect(getLeadTier(75)).toBe('Hot')
    })

    it('should return Very Hot for scores above 75', () => {
      expect(getLeadTier(76)).toBe('Very Hot')
      expect(getLeadTier(100)).toBe('Very Hot')
      expect(getLeadTier(500)).toBe('Very Hot')
    })
  })

  describe('calculateLeadScore', () => {
    const baseVisitorData: VisitorScoreData = {
      pagesVisited: [],
      maxScrollDepth: 0,
      chatOpened: false,
      chatMessagesSent: 0,
      formSubmitted: false,
      assessmentCompleted: false,
      pageCount: 1,
      sessionDurationSeconds: 30,
      isReturningVisitor: false,
    }

    it('should calculate page score from visited pages', () => {
      const result = calculateLeadScore({
        ...baseVisitorData,
        pagesVisited: ['/contact', '/services/data-ai-strategy'],
      })
      expect(result.pageScore).toBe(45) // 30 + 15
    })

    it('should add behavior score for form submission', () => {
      const result = calculateLeadScore({
        ...baseVisitorData,
        pagesVisited: ['/contact'],
        formSubmitted: true,
      })
      expect(result.behaviorScore).toBe(BEHAVIOR_SCORES.FORM_SUBMITTED)
    })

    it('should add score for returning visitors', () => {
      const result = calculateLeadScore({
        ...baseVisitorData,
        pagesVisited: ['/'],
        isReturningVisitor: true,
      })
      expect(result.behaviorScore).toBe(BEHAVIOR_SCORES.RETURNING_VISITOR)
    })

    it('should include reasons for scoring', () => {
      const result = calculateLeadScore({
        ...baseVisitorData,
        pagesVisited: ['/contact'],
        chatOpened: true,
        formSubmitted: true,
      })
      expect(result.reasons).toContain('Opened chat widget')
      expect(result.reasons).toContain('Submitted a form')
    })

    it('should assign correct tier based on total score', () => {
      const coldResult = calculateLeadScore({
        ...baseVisitorData,
        pagesVisited: ['/'],
      })
      expect(coldResult.tier).toBe('Cold')

      const hotResult = calculateLeadScore({
        ...baseVisitorData,
        pagesVisited: ['/contact'],
        formSubmitted: true,
      })
      expect(hotResult.tier).toBe('Very Hot') // 30 + 50 = 80
    })
  })

  describe('getTierColor', () => {
    it('should return correct colors for each tier', () => {
      expect(getTierColor('Cold')).toBe('#6B7280')
      expect(getTierColor('Warm')).toBe('#F59E0B')
      expect(getTierColor('Hot')).toBe('#EF4444')
      expect(getTierColor('Very Hot')).toBe('#DC2626')
    })
  })

  describe('getTierBadgeClasses', () => {
    it('should return Tailwind classes for each tier', () => {
      expect(getTierBadgeClasses('Cold')).toContain('gray')
      expect(getTierBadgeClasses('Warm')).toContain('amber')
      expect(getTierBadgeClasses('Hot')).toContain('red')
      expect(getTierBadgeClasses('Very Hot')).toContain('red')
    })
  })

  describe('LEAD_SCORE_THRESHOLDS', () => {
    it('should have correct threshold boundaries', () => {
      expect(LEAD_SCORE_THRESHOLDS.COLD.max).toBe(25)
      expect(LEAD_SCORE_THRESHOLDS.WARM.max).toBe(50)
      expect(LEAD_SCORE_THRESHOLDS.HOT.max).toBe(75)
      expect(LEAD_SCORE_THRESHOLDS.VERY_HOT.min).toBe(76)
    })
  })
})
