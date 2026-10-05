export const BASE_URL = (import.meta.env.VITE_API_BASE_URL).replace(/\/+$/, '');

export const getAuthToken = (): string | null => {
  return localStorage.getItem('admin_access_token');
};

export const setAuthToken = (token: string) => {
  localStorage.setItem('admin_access_token', token);
};

export const getRefreshToken = (): string | null => {
  return localStorage.getItem('admin_refresh_token');
};

export const setRefreshToken = (token: string) => {
  localStorage.setItem('admin_refresh_token', token);
};

export const removeAuthToken = () => {
  localStorage.removeItem('admin_access_token');
  localStorage.removeItem('admin_refresh_token');
  localStorage.removeItem('admin_selected_community');
};

export const getSelectedCommunity = (): string | null => {
  return localStorage.getItem('admin_selected_community');
};

export const setSelectedCommunity = (communityId: string) => {
  localStorage.setItem('admin_selected_community', communityId);
};

let refreshPromise: Promise<string | null> | null = null;

export const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return null;

  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = (async () => {
    try {
      const response = await fetch(`${BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });

      const data = await response.json().catch(() => ({}));
      if (response.ok && data.success && data.data?.accessToken) {
        setAuthToken(data.data.accessToken);
        if (data.data?.refreshToken) {
          setRefreshToken(data.data.refreshToken);
        }
        return data.data.accessToken as string;
      } else {
        return null;
      }
    } catch {
      return null;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
};

export const isTokenExpiringSoon = (token: string | null, bufferSeconds = 300): boolean => {
  if (!token) return true;
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return false;
    const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
    if (!payload.exp) return false;
    const now = Math.floor(Date.now() / 1000);
    return payload.exp - now < bufferSeconds;
  } catch {
    return false;
  }
};

interface RequestOptions {
  body?: any;
  headers?: Record<string, string>;
  skipAuthRefresh?: boolean;
}

const makeRequest = async (endpoint: string, method: string, options: RequestOptions = {}): Promise<any> => {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const response = await fetch(`${BASE_URL}${cleanEndpoint}`, {
    method,
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const data = await response.json().catch(() => ({}));

  const isAuthEndpoint = cleanEndpoint.includes('/auth/login') ||
                         cleanEndpoint.includes('/auth/verify-otp') ||
                         cleanEndpoint.includes('/auth/refresh');

  if (response.status === 401) {
    if (!isAuthEndpoint && !options.skipAuthRefresh) {
      const newToken = await refreshAccessToken();
      if (newToken) {
        // Retry the request with the refreshed token
        return makeRequest(endpoint, method, { ...options, skipAuthRefresh: true });
      }
    }

    removeAuthToken();
    window.location.reload();
    throw new Error('Session expired. Please log in again.');
  }

  if (!response.ok) {
    if (data.errors && Array.isArray(data.errors) && data.errors.length > 0) {
      const errorMsg = data.errors.map((e: any) => e.message).join(' | ');
      throw new Error(errorMsg);
    }
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
};

export const apiGet = (endpoint: string) => makeRequest(endpoint, 'GET');
export const apiPost = (endpoint: string, body: any) => makeRequest(endpoint, 'POST', { body });
export const apiPut = (endpoint: string, body: any) => makeRequest(endpoint, 'PUT', { body });
export const apiDelete = (endpoint: string) => makeRequest(endpoint, 'DELETE');

