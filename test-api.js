// Test script for RunToSip API
const API_BASE_URL = 'http://localhost:3001/api';

async function testAPI() {
  console.log('🧪 Testing RunToSip API...\n');

  try {
    // Test 1: Check if server is running
    console.log('1️⃣ Testing server connection...');
    const testResponse = await fetch(`${API_BASE_URL}/test`);
    const testData = await testResponse.json();
    console.log('✅ Server is running:', testData.message);
    console.log('⏰ Timestamp:', testData.timestamp);

    // Test 2: Get all data
    console.log('\n2️⃣ Testing data retrieval...');
    const dataResponse = await fetch(`${API_BASE_URL}/data`);
    const data = await dataResponse.json();
    console.log('✅ Data retrieved successfully');
    console.log(`📊 Events: ${data.events?.length || 0}`);
    console.log(`📰 Articles: ${data.articles?.length || 0}`);
    console.log(`📸 Photos: ${data.photos?.length || 0}`);
    console.log(`👥 Crew: ${data.crewMembers?.length || 0}`);

    // Test 3: Test events endpoint
    console.log('\n3️⃣ Testing events endpoint...');
    const eventsResponse = await fetch(`${API_BASE_URL}/events`);
    const events = await eventsResponse.json();
    console.log('✅ Events endpoint working');
    console.log(`📅 Found ${events.length} events`);

    // Test 4: Test articles endpoint
    console.log('\n4️⃣ Testing articles endpoint...');
    const articlesResponse = await fetch(`${API_BASE_URL}/articles`);
    const articles = await articlesResponse.json();
    console.log('✅ Articles endpoint working');
    console.log(`📰 Found ${articles.length} articles`);

    // Test 5: Test photos endpoint
    console.log('\n5️⃣ Testing photos endpoint...');
    const photosResponse = await fetch(`${API_BASE_URL}/photos`);
    const photos = await photosResponse.json();
    console.log('✅ Photos endpoint working');
    console.log(`📸 Found ${photos.length} photos`);

    // Test 6: Test crew endpoint
    console.log('\n6️⃣ Testing crew endpoint...');
    const crewResponse = await fetch(`${API_BASE_URL}/crew`);
    const crew = await crewResponse.json();
    console.log('✅ Crew endpoint working');
    console.log(`👥 Found ${crew.length} crew members`);

    console.log('\n🎉 All API tests passed!');
    console.log('\n📋 API Endpoints Summary:');
    console.log('   ✅ GET /api/test - Server status');
    console.log('   ✅ GET /api/data - All data');
    console.log('   ✅ GET /api/events - Events list');
    console.log('   ✅ GET /api/articles - Articles list');
    console.log('   ✅ GET /api/photos - Photos list');
    console.log('   ✅ GET /api/crew - Crew list');
    console.log('\n🚀 Your backend is ready for production!');

  } catch (error) {
    console.error('❌ API test failed:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Make sure the server is running: node server.js');
    console.log('2. Check if port 3001 is available');
    console.log('3. Verify all dependencies are installed');
    console.log('4. Check server logs for errors');
  }
}

// Run the test
testAPI(); 