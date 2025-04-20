// src/pages/dashboard/DashboardHome.jsx
import React from 'react';
import { Row, Col, Card, Statistic, Table, Typography, Tag } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, HomeOutlined, UserOutlined, EyeOutlined, CommentOutlined } from '@ant-design/icons';

const { Title } = Typography;

const DashboardHome = () => {
  // Mock data for statistics
  const statistics = [
    {
      title: 'Total Properties',
      value: 142,
      icon: <HomeOutlined />,
      prefix: null,
      suffix: null,
      color: '#1890ff',
      increase: 12,
    },
    {
      title: 'Active Users',
      value: 857,
      icon: <UserOutlined />,
      prefix: null,
      suffix: null,
      color: '#52c41a',
      increase: 23,
    },
    {
      title: 'Total Views',
      value: 15473,
      icon: <EyeOutlined />,
      prefix: null,
      suffix: null,
      color: '#722ed1',
      increase: -8,
    },
    {
      title: 'New Inquiries',
      value: 48,
      icon: <CommentOutlined />,
      prefix: null,
      suffix: null,
      color: '#fa8c16',
      increase: 32,
    },
  ];

  // Mock data for recent properties
  const recentProperties = [
    {
      key: '1',
      title: 'Modern Apartment in Downtown',
      price: '$350,000',
      location: 'New York, NY',
      date: '2023-04-12',
      status: 'Active',
    },
    {
      key: '2',
      title: 'Luxury Beach House',
      price: '$1,250,000',
      location: 'Miami, FL',
      date: '2023-04-10',
      status: 'Pending',
    },
    {
      key: '3',
      title: 'Cozy Suburban Home',
      price: '$420,000',
      location: 'Chicago, IL',
      date: '2023-04-08',
      status: 'Sold',
    },
    {
      key: '4',
      title: 'Modern Studio Apartment',
      price: '$220,000',
      location: 'Seattle, WA',
      date: '2023-04-05',
      status: 'Active',
    },
    {
      key: '5',
      title: 'Family Home with Garden',
      price: '$550,000',
      location: 'Austin, TX',
      date: '2023-04-01',
      status: 'Active',
    },
  ];

  const columns = [
    {
      title: 'Property',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Date Added',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = 'green';
        if (status === 'Pending') {
          color = 'gold';
        } else if (status === 'Sold') {
          color = 'volcano';
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
  ];

  return (
    <div>
      <Title level={2}>Dashboard</Title>
      <Title level={5} style={{ marginTop: 0, marginBottom: 24, opacity: 0.65 }}>
        Welcome to your real estate admin dashboard
      </Title>
      
      {/* Statistics Cards */}
      <Row gutter={24} style={{ marginBottom: 24 }}>
        {statistics.map((stat, index) => (
          <Col xs={24} sm={12} md={12} lg={6} key={index}>
            <Card>
              <Statistic
                title={stat.title}
                value={stat.value}
                valueStyle={{ color: stat.color }}
                prefix={stat.icon}
                suffix={stat.suffix}
              />
              <div style={{ marginTop: 8 }}>
                {stat.increase > 0 ? (
                  <span style={{ color: '#52c41a' }}>
                    <ArrowUpOutlined /> {stat.increase}% increase
                  </span>
                ) : (
                  <span style={{ color: '#f5222d' }}>
                    <ArrowDownOutlined /> {Math.abs(stat.increase)}% decrease
                  </span>
                )}
              </div>
            </Card>
          </Col>
        ))}
      </Row>
      
      {/* Recent Properties Table */}
      <Card
        title="Recent Properties"
        style={{ marginBottom: 24 }}
        extra={<a href="/dashboard/properties">View All</a>}
      >
        <Table 
          columns={columns} 
          dataSource={recentProperties} 
          pagination={false} 
        />
      </Card>
    </div>
  );
};

export default DashboardHome;