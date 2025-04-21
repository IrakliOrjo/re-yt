// Updated ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { Spin, Result } from 'antd';
import { useAuth } from '../../contexts/AuthContext';

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { currentUser, isWhitelisted, whitelistLoading } = useAuth();

  // If not authenticated, redirect to login
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  // While checking whitelist status, show loading
  if (whitelistLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" tip="Verifying your access..." />
      </div>
    );
  }

  // If authenticated but not whitelisted, show access denied
  if (!isWhitelisted) {
    return (
      <Result
        status="403"
        title="Access Denied"
        subTitle="Your email is not authorized to access this application. Please contact the administrator."
        extra={<Navigate to="/login" />}
      />
    );
  }

  // If authenticated and whitelisted, render the children components
  return children;
}