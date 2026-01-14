import '@testing-library/jest-dom'
import React from 'react'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/',
}))

// Mock framer-motion to avoid animation issues in tests
// Using React.createElement instead of JSX for setup file compatibility
jest.mock('framer-motion', () => {
  const createMotionComponent = (tag: string) => {
    return ({ children, ...props }: { children?: React.ReactNode; [key: string]: unknown }) => {
      return React.createElement(tag, props, children)
    }
  }

  return {
    motion: {
      div: createMotionComponent('div'),
      span: createMotionComponent('span'),
      button: createMotionComponent('button'),
      p: createMotionComponent('p'),
      h1: createMotionComponent('h1'),
      h2: createMotionComponent('h2'),
      h3: createMotionComponent('h3'),
      section: createMotionComponent('section'),
      article: createMotionComponent('article'),
      form: createMotionComponent('form'),
      input: createMotionComponent('input'),
      a: createMotionComponent('a'),
      img: createMotionComponent('img'),
      ul: createMotionComponent('ul'),
      li: createMotionComponent('li'),
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
    useAnimation: () => ({
      start: jest.fn(),
      stop: jest.fn(),
    }),
    useInView: () => true,
  }
})

// Mock environment variables for tests
process.env.DYNAMODB_REGION = 'us-east-1'
process.env.SES_REGION = 'us-east-1'
process.env.JWT_SECRET = 'test-jwt-secret-for-testing'
process.env.ADMIN_USERNAME = 'testadmin'
process.env.ADMIN_PASSWORD_HASH = '$2b$10$test-hash'
