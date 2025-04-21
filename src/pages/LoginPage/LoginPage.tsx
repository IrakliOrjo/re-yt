// Updated LoginPage.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Typography, Layout, Row, Col, Alert, Spin } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import { useAuth } from '../../contexts/AuthContext';

const { Title, Text } = Typography;
const { Content } = Layout;

function LoginPage() {
  const { currentUser, isWhitelisted, whitelistLoading, signInWithGoogle } = useAuth();
  const [error, setError] = useState<null | string>(null);
  const navigate = useNavigate();

  // Redirect if user is logged in AND whitelisted
  useEffect(() => {
    if (currentUser && isWhitelisted) {
      navigate('/dashboard');
    }
  }, [currentUser, isWhitelisted, navigate]);

  const handleGoogleSignIn = async () => {
    setError(null);
    try {
      await signInWithGoogle();
      // The redirect will happen automatically if user is whitelisted
    } catch (error) {
      console.error("Error signing in with Google:", error);
      setError("Failed to sign in with Google. Please try again.");
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ padding: '50px' }}>
        <Row justify="center" align="middle" style={{ minHeight: '80vh' }}>
          <Col xs={24} sm={16} md={12} lg={8}>
            <Card style={{ textAlign: 'center', padding: '20px' }}>
              <Title level={2}>Real Estate Admin</Title>
              <Text>Sign in to access your dashboard</Text>
              
              {currentUser && whitelistLoading && (
                <div style={{ margin: '20px 0' }}>
                  <Spin tip="Verifying access..." />
                </div>
              )}
              
              {currentUser && !whitelistLoading && !isWhitelisted && (
                <Alert
                  message="Access Denied"
                  description="Your email is not authorized to access this application. Please contact the administrator."
                  type="error"
                  showIcon
                  style={{ marginTop: '20px', marginBottom: '20px' }}
                />
              )}
              
              {error && (
                <Alert
                  message="Error"
                  description={error}
                  type="error"
                  showIcon
                  style={{ marginTop: '20px', marginBottom: '20px' }}
                />
              )}
              
              <div style={{ margin: '30px 0' }}>
                {!currentUser ? (
                  <Button 
                    type="primary" 
                    icon={<GoogleOutlined />} 
                    size="large"
                    onClick={handleGoogleSignIn}
                    style={{ width: '100%' }}
                  >
                    Sign in with Google
                  </Button>
                ) : (
                  <Button 
                    type="primary"
                    size="large"
                    onClick={() => navigate('/dashboard')}
                    style={{ width: '100%' }}
                    disabled={!isWhitelisted}
                  >
                    {isWhitelisted ? 'Go to Dashboard' : 'Access Denied'}
                  </Button>
                )}
              </div>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default LoginPage;