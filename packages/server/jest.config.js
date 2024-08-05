/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.ts'],
  globalSetup: '<rootDir>/test/jest.globalSetup.js',
  globalTeardown: '<rootDir>/test/jest.globalTeardown.js',
}
