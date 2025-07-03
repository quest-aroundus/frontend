// jest.config.ts
import nextJest from 'next/jest'

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // 절대경로 alias 처리 (tsconfig 기준)
  },
  testEnvironment: 'jsdom',
  testMatch: ['**/__tests__/**/*.(test|spec).[jt]s?(x)'],
}

export default createJestConfig(customJestConfig)
