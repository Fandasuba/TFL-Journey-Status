import Link from 'next/link';
import Header from '../components/Header';
import { getStatusClass, getStatusCssClass, getLineColorClass } from '@/app/utils/statusCheck';

async function getTubeStatus() {
  const response = await fetch(`http://localhost:3000/api/tube-status`, {
    cache: 'no-store'
  });
 
  if (!response.ok) {
    throw new Error('Failed to fetch tube status');
  }
 
  return response.json();
}

export default async function TravelPage() {
  const data = await getTubeStatus();
 
  return (
    <div className="page-layout">
      <Header showBackButton={true} backText="Back to Home" backHref="/" />

      <main className="main-content">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="transport-screen" style={{padding: '32px'}}>
              <div className="flex-between mb-6">
                <h1 className="text-3xl transport-text flicker">
                  LONDON UNDERGROUND STATUS
                </h1>
                <div style={{textAlign: 'right'}}>
                  <div className="transport-text" style={{fontSize: '14px'}}>LAST UPDATED</div>
                  <div className="transport-text-white text-lg" style={{fontFamily: 'JetBrains Mono, monospace'}}>
                    {new Date(data.lastUpdated).toLocaleString('en-GB', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
              </div>

              <div className="grid gap-3">
                {data.lines.map((line, index) => {
                  const statusType = getStatusClass(line.lineStatuses[0].statusSeverityDescription);
                  const lineColorClass = getLineColorClass(line.name);
                  return (
                    <div 
                      key={line.id} 
                      className={`status-line ${statusType}`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="line-info">
                        <div className="line-indicator"></div>
                        <div className="line-details">
                          <h3 className={lineColorClass}>
                            {line.name.replace(' line', '').toUpperCase()}
                          </h3>
                          <div className="line-id">LINE {line.id.toUpperCase()}</div>
                        </div>
                      </div>
                      
                      <div className="line-actions">
                        <div className={getStatusCssClass(statusType)}>
                          {line.lineStatuses[0].statusSeverityDescription.toUpperCase()}
                        </div>
                        
                        <Link href={`/travel/${line.id}`} className="btn-secondary">
                          DETAILS →
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 pt-6 border-t">
                <div className="flex-between">
                  <div className="transport-text" style={{fontSize: '14px'}}>
                    <div className="flex-items-center gap-2">
                      <div style={{width: '8px', height: '8px', background: '#00ff00', borderRadius: '50%'}} className="pulse"></div>
                      <span>LIVE DATA FEED ACTIVE</span>
                    </div>
                  </div>
                  <div className="transport-text-white" style={{fontSize: '14px', fontFamily: 'JetBrains Mono, monospace'}}>
                    TRANSPORT FOR LONDON • OFFICIAL
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}