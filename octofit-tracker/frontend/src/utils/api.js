export function getApiBaseUrl() {
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;

    if (hostname.includes('app.github.dev')) {
      if (hostname.includes('-5173.')) {
        return `https://${hostname.replace('-5173.', '-8000.')}`;
      }

      if (hostname.includes('-8000.')) {
        return `https://${hostname}`;
      }
    }
  }

  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  if (codespaceName && codespaceName.trim()) {
    return `https://${codespaceName.trim()}-8000.app.github.dev`;
  }

  return 'http://127.0.0.1:8000';
}

export function getApiUrl(path) {
  const normalizedPath = path.replace(/^\/+/, '');
  return `${getApiBaseUrl()}/api/${normalizedPath}`;
}
