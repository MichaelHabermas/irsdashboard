/** @type {import('jest').Config} */
export default {
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleNameMapper: {
    '^@irs/shared$': '<rootDir>/../../shared/dist/index.js',
  },
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s', '!main.ts'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  passWithNoTests: true,
  coverageThreshold: {
    global: {
      // Nest DI + TS emit adds implicit constructor branches; raised back toward 80 via HTTP tests in Epic 5.
      branches: 75,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
