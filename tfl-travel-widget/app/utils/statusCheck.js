export function getStatusClass(statusDescription) {
  const status = statusDescription.toLowerCase();
  
  if (status.includes('good service')) {
    return 'good';
  } else if (status.includes('minor delay') || status.includes('minor disruption')) {
    return 'minor';
  } else if (status.includes('severe delay') || status.includes('severe disruption') || status.includes('major delay')) {
    return 'severe';
  } else if (status.includes('suspended') || status.includes('not running') || status.includes('no service')) {
    return 'suspended';
  } else {
    // Default for any other status
    return 'minor';
  }
}

export function getStatusCssClass(statusType) {
  switch (statusType) {
    case 'good':
      return 'status-good';
    case 'minor':
      return 'status-minor';
    case 'severe':
      return 'status-severe';
    case 'suspended':
      return 'status-suspended';
    default:
      return 'status-minor';
  }
}

export function getLineColorClass(lineName) {
  const name = lineName.toLowerCase().replace(' line', '').replace(/\s+/g, '-').replace('&', 'and');
  
  // Map line names to CSS classes
  const lineColorMap = {
    'bakerloo': 'line-bakerloo',
    'central': 'line-central',
    'circle': 'line-circle',
    'district': 'line-district',
    'hammersmith-and-city': 'line-hammersmith-city',
    'hammersmith-city': 'line-hammersmith-city',
    'hammersmith-&-city': 'line-hammersmith-city',
    'jubilee': 'line-jubilee',
    'metropolitan': 'line-metropolitan',
    'northern': 'line-northern',
    'piccadilly': 'line-piccadilly',
    'victoria': 'line-victoria',
    'waterloo-and-city': 'line-waterloo-city',
    'waterloo-city': 'line-waterloo-city',
    'elizabeth': 'line-elizabeth',
    'dlr': 'line-dlr',
    'london-overground': 'line-london-overground',
    'overground': 'line-london-overground'
  };
  
  return lineColorMap[name] || '';
}