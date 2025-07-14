import Link from 'next/link';
import Header from '@/app/components/Header';
import { getStatusClass, getStatusCssClass, getLineColorClass } from '@/app/utils/statusCheck';

async function getLineData(lineId) {
  const response = await fetch(`http://localhost:3000/api/tube-status`, {
    cache: 'no-store'
  });
 
  if (!response.ok) {
    throw new Error('Failed to fetch tube status');
  }
 
  const data = await response.json();
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
      <div className="page-layout">
        <Header showBackButton={true} backText="Back to Status Board" backHref="/travel" />
        
        <main className="error-container">
          <div className="container">
            <div className="max-w-2xl mx-auto transport-screen text-center" style={{padding: '32px'}}>
              <div className="error-content">
                <div className="error-icon">
                  <span>!</span>
                </div>
                <h1 className="text-3xl transport-text mb-4">
                  LINE NOT FOUND
                </h1>
                <p className="transport-text-white mb-2">
                  REQUESTED LINE ID: {resolvedParams.lineId.toUpperCase()}
                </p>
                <p className="text-gray" style={{fontSize: '14px'}}>
                  The specified line could not be located in the system
                </p>
              </div>
              
              <Link href="/travel" className="btn-secondary">
                ← RETURN TO STATUS BOARD
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }
 
  const status = lineData.lineStatuses[0];
  const statusType = getStatusClass(status.statusSeverityDescription);
  const hasDisruption = statusType !== 'good';
  const lineColorClass = getLineColorClass(lineData.name);
 
  return (
    <div className="page-layout">
      <Header showBackButton={true} backText="Back to Status Board" backHref="/travel" />

      <main className="main-content">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="transport-screen" style={{padding: '32px'}}>
              <div className="flex-between mb-8">
                <div>
                  <h1 className={`text-4xl flicker mb-2 ${lineColorClass}`}>
                    {lineData.name.replace(' line', '').toUpperCase()} LINE
                  </h1>
                  <div className="transport-text" style={{fontSize: '14px'}}>
                    LINE ID: {lineData.id.toUpperCase()}
                  </div>
                </div>
                <div style={{textAlign: 'right'}}>
                  <div className="transport-text" style={{fontSize: '14px'}}>LAST UPDATED</div>
                  <div className="transport-text-white text-lg" style={{fontFamily: 'JetBrains Mono, monospace'}}>
                    {new Date(lastUpdated).toLocaleString('en-GB', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
              </div>

              <div className="card-dark mb-8">
                <h2 className="transport-text text-xl mb-4">CURRENT STATUS</h2>
                <div className={`${getStatusCssClass(statusType)}`} style={{display: 'inline-block', padding: '12px 24px', fontSize: '18px'}}>
                  {status.statusSeverityDescription.toUpperCase()}
                </div>
              </div>

              {hasDisruption && (
                <div className="alert-disruption">
                  <h3 className="alert-title">
                    <div className="alert-icon">
                      <span>!</span>
                    </div>
                    SERVICE DISRUPTION DETAILS
                  </h3>
                  <div className="alert-content">
                    <p className="alert-text">
                      {status.reason || 'NO ADDITIONAL DETAILS AVAILABLE AT THIS TIME'}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex-between pt-6 border-t">
                <Link href="/travel" className="btn-secondary" style={{padding: '12px 24px'}}>
                  ← BACK TO STATUS BOARD
                </Link>
                
                <div className="transport-text" style={{fontSize: '14px'}}>
                  <div className="flex-items-center gap-2">
                    <div style={{width: '8px', height: '8px', background: '#00ff00', borderRadius: '50%'}} className="pulse"></div>
                    <span>LIVE MONITORING ACTIVE</span>
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