import React, { useState } from 'react';
import { Button } from './Button';

type TestRole = 'None' | 'Contributor' | 'Editor' | 'Admin';

export const BackendTester: React.FC = () => {
  const [role, setRole] = useState<TestRole>('Contributor');
  const [response, setResponse] = useState<any>(null);
  const [status, setStatus] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const testEndpoint = async (endpoint: string, method: string = 'GET') => {
    setIsLoading(true);
    setResponse(null);
    setStatus(null);

    const headers: Record<string, string> = {};
    if (role !== 'None') {
      const tokenMap: Record<TestRole, string> = {
        'None': '',
        'Contributor': 'contributor-token',
        'Editor': 'editor-token',
        'Admin': 'admin-token',
      };
      headers['Authorization'] = `Bearer ${tokenMap[role]}`;
    }

    try {
      const res = await fetch(`/api/${endpoint}`, {
        method,
        headers,
      });

      const data = await res.json();
      setStatus(res.status);
      setResponse(data);
    } catch (err) {
      setStatus(500);
      setResponse({ error: 'Failed to connect to backend' });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusClass = (code: number) => {
    if (code >= 200 && code < 300) return 'badge-200';
    if (code === 401) return 'badge-401';
    if (code === 403) return 'badge-403';
    return '';
  };

  return (
    <div className="card mt-4">
      <h2 className="mb-2">Backend Logic Tester</h2>
      <p className="text-sm mb-4">Select a role and trigger endpoints to verify RBAC logic.</p>

      <div className="flex flex-col gap-4">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <label className="font-medium text-sm">Active Role:</label>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {(['None', 'Contributor', 'Editor', 'Admin'] as TestRole[]).map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`px-3 py-1 text-xs rounded transition-colors ${
                  role === r ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button variant="primary" size="sm" onClick={() => testEndpoint('profile')}>
            GET /profile
          </Button>
          <Button variant="secondary" size="sm" onClick={() => testEndpoint('content', 'POST')}>
            POST /content
          </Button>
          <Button variant="danger" size="sm" onClick={() => testEndpoint('system', 'DELETE')}>
            DELETE /system
          </Button>
        </div>

        {status && (
          <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '0.5rem', border: '1px solid #f3f4f6', minWidth: 0 }}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-bold">Response Data</span>
              <span className={`badge ${getStatusClass(status)}`}>
                Status: {status}
              </span>
            </div>
            <pre className="pre-block">
              {JSON.stringify(response, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
