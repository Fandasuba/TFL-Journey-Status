import Link from 'next/link';

async function getTubeStatus() {
  const response = await fetch(`http://localhost:3000/api/tube-status`, {
    cache: 'no-store' // Always get fresh data on server
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch tube status');
  }
  
  return response.json();
}

export default async function TravelPage() {
  const data = await getTubeStatus();
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Travel Widget</h1>
      
      <div className="mb-4 text-sm text-gray-600">
        Last Updated: {new Date(data.lastUpdated).toLocaleString()}
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Line</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.lines.map(line => (
              <tr key={line.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {line.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    line.lineStatuses[0].statusSeverityDescription === 'Good Service' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {line.lineStatuses[0].statusSeverityDescription}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link 
                    href={`/travel/${line.id}`}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    View More
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}