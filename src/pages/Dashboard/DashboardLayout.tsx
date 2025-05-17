// src/pages/dashboard/DashboardLayout.jsx
import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Layout, Menu, theme,  Avatar, Dropdown, MenuProps } from 'antd';
import {
  DashboardOutlined,
  HomeOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;
 

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  
  // Define menu items
  const items = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: '/dashboard/properties',
      icon: <HomeOutlined />,
      label: 'Properties',
    },
    {
      key: '/dashboard/users',
      icon: <UserOutlined />,
      label: 'Users',
    },
    {
      key: '/dashboard/settings',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
  ];
  
  // User dropdown menu
  const userMenuItems: MenuProps['items'] = [
    {
      key: '1',
      label: 'Profile',
      icon: <UserOutlined />,
      onClick: () => navigate('/dashboard/profile'),
    },
    {
      key: '2',
      label: 'Settings',
      icon: <SettingOutlined />,
      onClick: () => navigate('/dashboard/settings'),
    },
    {
      key: '3',
      type: 'divider',
    },
    {
      key: '4',
      label: 'Logout',
      icon: <LogoutOutlined />,
      onClick: () => {
        // Handle logout logic here
        // For now, just navigate to home
        navigate('/');
      },
    },
  ];
  
  // Get the currently active menu key
  const getSelectedKey = () => {
    const path = location.pathname;
    const matchingItem = items.find(item => path === item.key || path.startsWith(item.key + '/'));
    return matchingItem ? [matchingItem.key] : ['/dashboard'];
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed} width={250}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="demo-logo-vertical" style={{ 
          height: 64, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: collapsed ? 'center' : 'flex-start',
          padding: collapsed ? '0' : '0 24px',
          color: 'white',
          fontSize: collapsed ? '18px' : '20px',
          fontWeight: 'bold'
        }}>
          {collapsed ? 'RE' : 'Real Estate Admin'}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={getSelectedKey()}
          items={items}
          onClick={({ key }) => navigate(key)}
        />
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 80 : 250, transition: 'all 0.2s' }}>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ padding: '0 24px' }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
              style: { fontSize: '18px' }
            })}
          </div>
          <div style={{ padding: '0 24px' }}>        
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>Admin User</span>
                <Avatar icon={<UserOutlined />} />
              </div>
            </Dropdown>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflow: 'auto'
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;