const config = {
    verbose: true,
    rootDir: "./",
    testEnvironment: "jsdom",
    moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'json'],
    transform: {
      '^.+\\.(js|jsx)?$': 'babel-jest',
      '^.+\\.(ts|tsx)?$': 'ts-jest',
    },
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/$1',
    },
    testMatch: [
      '<rootDir>/**/*.test.(js|jsx|ts|tsx)'
    ],
    transformIgnorePatterns: ['<rootDir>/node_modules/']
  };
  
  module.exports = config;