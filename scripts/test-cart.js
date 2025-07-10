#!/usr/bin/env node

/**
 * Cart Test Runner
 * 
 * This script runs all cart-related tests in the MarketPlace app.
 * It can be used to quickly test cart functionality during development.
 */

const { execSync } = require('child_process');
const path = require('path');

console.log('🧪 Running Cart Tests...\n');

try {
  // Run cart slice tests
  console.log('📦 Testing Cart Slice...');
  execSync('npm test -- src/store/__tests__/cartSlice.test.ts', { 
    stdio: 'inherit',
    cwd: process.cwd()
  });
  
  console.log('\n✅ Cart Slice tests passed!\n');
  
  // Run store tests
  console.log('🏪 Testing Redux Store...');
  execSync('npm test -- src/store/__tests__/store.test.ts', { 
    stdio: 'inherit',
    cwd: process.cwd()
  });
  
  console.log('\n✅ Store tests passed!\n');
  
  // Run all cart-related tests together
  console.log('🛒 Running All Cart Tests...');
  execSync('npm test -- --testPathPattern="cart"', { 
    stdio: 'inherit',
    cwd: process.cwd()
  });
  
  console.log('\n🎉 All cart tests completed successfully!');
  
} catch (error) {
  console.error('\n❌ Some tests failed!');
  console.error('Check the output above for details.');
  process.exit(1);
} 