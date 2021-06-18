module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  resetMocks: true,
  testMatch: ['!**/build-backend/**', '**/src/**/*.(spec).ts']
};
