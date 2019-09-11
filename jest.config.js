// jest.config.js
const {defaults} = require('jest-config');
module.exports = {
  // ...
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  testPathIgnorePatterns: [
    '<rootDir>/ios/',
    '<rootDir>/android/',
    '<rootDir>/node_modules/',
    '<rootDir>/e2e/' /* SKIP END TO END TEST FOR NOW */,
  ],
};
