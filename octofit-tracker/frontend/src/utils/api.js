export function getApiBaseUrl() {
  const env = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env : {};
  const codespaceName = (env.VITE_CODESPACE_NAME || '').trim();

  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    const protocol = window.location.protocol || 'http:';

    if (hostname.includes('app.github.dev')) {
      if (hostname.includes('-5173.')) {
        return `${protocol}//${hostname.replace('-5173.', '-8000.')}`;
      }

      if (hostname.includes('-8000.')) {
        return `${protocol}//${hostname}`;
      }
    }

    if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '0.0.0.0') {
      return codespaceName ? `https://${codespaceName}-8000.app.github.dev` : 'http://127.0.0.1:8000';
    }
  }

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  return 'http://127.0.0.1:8000';
}

export function getApiUrl(path) {
  const normalizedPath = path.replace(/^\/+/, '');
  return `${getApiBaseUrl()}/api/${normalizedPath}`;
}
