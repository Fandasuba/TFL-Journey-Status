import Link from 'next/link';

async function getLineData(lineId) {
  const response = await fetch(`http://localhost:3000/api/tube-status`, {
    cache: 'no-store'
  });
 
  if (!response.ok) {
    throw new Error('Failed to fetch tube status');
  }
 
  const data = await response.json();
  
  console.log('Looking for lineId:', lineId);
  console.log('Available line IDs:', data.lines.map(line => line.id));
  
  const lineData = data.lines.find(line => line.id === lineId);
  
  return {
    lineData,
    lastUpdated: data.lastUpdated
  };
}

export default async function LineDetailsPage({ params }) {
  const resolvedParams = await params;
  const { lineData, lastUpdated } = await getLineData(resolvedParams.lineId);
 
  if (!lineData) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-red-600">Line not found</h1>
        <p>Looking for line ID: {resolvedParams.lineId}</p>
        <Link href="/travel" className="text-blue-600 hover:text-blue-900 mt-4 inline-block">
          ← Go Back
        </Link>
      </div>
    );
  }
 
  const status = lineData.lineStatuses[0];
  const hasDisruption = status.statusSeverityDescription !== 'Good Service';
 
  return (
    <div className="container mx-auto p-6">
      <div className="mb-4 text-sm text-gray-600">
        Last Updated: {new Date(lastUpdated).toLocaleString()}
      </div>
     
      <h1 className="text-4xl font-bold mb-6">{lineData.name} Line</h1>
     
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Current Status</h2>
        <span className={`px-4 py-2 rounded-full text-sm font-medium ${
          hasDisruption
            ? 'bg-red-100 text-red-800'
            : 'bg-green-100 text-green-800'
        }`}>
          {status.statusSeverityDescription}
        </span>
      </div>
     
      {hasDisruption && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-red-800 mb-2">Service Disruption</h3>
          <p className="text-red-700">
            {status.reason || 'No additional details available'}
          </p>
        </div>
      )}
     
      <Link
        href="/travel"
        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        ← Go Back
      </Link>
    </div>
  );
}