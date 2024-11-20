// eslint.config.js
const tsParser = require('@typescript-eslint/parser');

module.exports = {
    ignores: ['node_modules', 'dist', 'build'], // Ignore these directories
    files: ['src/**/*.ts'], // Apply ESLint only to TypeScript files in the src directory
    languageOptions: {
        ecmaVersion: 'latest', // Use the latest ECMAScript standard
        sourceType: 'module', // Allow the use of imports
        parser: tsParser, // Use the TypeScript parser
    },
    plugins: {
        '@typescript-eslint': require('@typescript-eslint/eslint-plugin'), // Use the TypeScript ESLint plugin
    },
    rules: {
        'no-unused-vars': 'off', // Warn about unused variables
        'no-console': 'off', // Warn about console.log usage
        '@typescript-eslint/no-explicit-any': 'error', // Disallow usage of the 'any' type
        '@typescript-eslint/explicit-function-return-type': 'warn', // Warn if function return type is not explicitly specified
        // Add more rules as needed
    },
};
