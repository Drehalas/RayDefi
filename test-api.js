// Simple API test script
const BASE_URL = 'http://localhost:3001/api/v1';

async function testEndpoint(name, url, options = {}) {
  try {
    console.log(`\n🧪 Testing ${name}...`);
    console.log(`📡 ${options.method || 'GET'} ${url}`);
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
    
    const data = await response.json();
    
    if (response.ok) {
      console.log(`✅ ${name} - Success`);
      console.log(`📊 Response:`, {
        success: data.success,
        dataType: typeof data.data,
        timestamp: data.timestamp,
        ...(data.data && Array.isArray(data.data.tokens) ? { tokenCount: data.data.tokens.length } : {}),
        ...(data.data && Array.isArray(data.data.pools) ? { poolCount: data.data.pools.length } : {}),
        ...(data.data && Array.isArray(data.data.farms) ? { farmCount: data.data.farms.length } : {}),
      });
    } else {
      console.log(`❌ ${name} - Failed`);
      console.log(`📊 Error:`, data);
    }
  } catch (error) {
    console.log(`💥 ${name} - Error:`, error.message);
  }
}

async function runTests() {
  console.log('🚀 Starting RayDefi API Tests...');
  console.log('🏠 Base URL:', BASE_URL);
  
  // Test 1: Get Tokens
  await testEndpoint(
    'Get Tokens',
    `${BASE_URL}/tokens?limit=5`
  );
  
  // Test 2: Get Specific Token (using SOL address)
  await testEndpoint(
    'Get Token Details',
    `${BASE_URL}/tokens/So11111111111111111111111111111111111111112`
  );
  
  // Test 3: Swap Quote
  await testEndpoint(
    'Get Swap Quote',
    `${BASE_URL}/swap/quote`,
    {
      method: 'POST',
      body: JSON.stringify({
        tokenIn: 'So11111111111111111111111111111111111111112', // SOL
        tokenOut: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', // USDC
        amountIn: '1',
        slippageTolerance: '0.5'
      }),
    }
  );
  
  // Test 4: Get Pools
  await testEndpoint(
    'Get Pools',
    `${BASE_URL}/pools?sortBy=tvl&order=desc`
  );
  
  // Test 5: Get Farms
  await testEndpoint(
    'Get Farms',
    `${BASE_URL}/farms?sortBy=apy`
  );
  
  console.log('\n🎉 API Tests Completed!');
  console.log('📖 Visit http://localhost:3001/docs to see the interactive Swagger UI');
}

// Run tests
runTests().catch(console.error); 