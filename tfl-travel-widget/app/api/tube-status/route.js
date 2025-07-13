let serverCache = null;
let lastFetch = null;
const CACHE_DURATION = 5 * 60 * 1000;

export async function GET() {
  const now = Date.now();
  if (serverCache && lastFetch && (now - lastFetch) < CACHE_DURATION) { // Checks a server cache exists and its timestamp, and the time the api was last called. Compares it to the current time and the last fetch to see if we are due another api call 
    console.log(`Cache served. Cache age: ${Math.round((now - lastFetch) / 1000)}s`);
    
    return Response.json(serverCache, {
      headers: { 
        'Cache-Control': 's-maxage=300, stale-while-revalidate=300', // Next caching options. Essentially max store 300 seconds, revalidates every 5 minutes the server is consistently live.
        'X-Cache-Status': 'HIT' // Debug header to see cache status
      }
    });
  }
  
  try {
    console.log('Cache expired - making a new api call');
    
    const response = await fetch(`https://api.tfl.gov.uk/Line/Mode/tube/Status?app_key=${process.env.PRIMARY_KEY}`);
    
    if (!response.ok) {
      throw new Error(`TfL API responded with ${response.status}`);
    }
    
    const data = await response.json();
    
    serverCache = {
      lines: data,
      lastUpdated: new Date().toISOString(),
      cacheInfo: {
        cachedAt: new Date().toISOString(),
        expiresAt: new Date(now + CACHE_DURATION).toISOString()
      }
    };
    lastFetch = now;
    
    console.log(`✅ Fresh data cached. Next refresh at: ${new Date(now + CACHE_DURATION).toLocaleTimeString()}`);
    
    return Response.json(serverCache, {
      headers: { 
        'Cache-Control': 's-maxage=300, stale-while-revalidate=300',
        'X-Cache-Status': 'MISS' // Debug header
      }
    });
    
  } catch (error) {
    console.error('Error fetching TfL data:', error);
    
    // worst case serve slightly old data but for a short duration.
    if (serverCache) {
      console.log(' API error: Serving most recent data for a minute. Will try again in 1 minute.');
      return Response.json({
        ...serverCache,
        error: 'Using cached data due to API unavailability'
      }, {
        headers: { 
          'Cache-Control': 's-maxage=60', // Shorter cache for error responses
          'X-Cache-Status': 'STALE'
        }
      });
    }
    
    return Response.json(
      { error: 'Failed to fetch tube status and no cached data available' }, 
      { status: 500 }
    );
  }
}