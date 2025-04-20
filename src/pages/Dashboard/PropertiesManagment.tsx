// src/pages/dashboard/PropertiesManagement.jsx
import  { useState } from 'react';
import { 
  Table, 
  Card, 
  Button, 
  Space, 
  Modal, 
  Form, 
  Input, 
  Select, 
  InputNumber,
  Typography,
  Tag,
  Row,
  Col,
  Tooltip
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined,
  EyeOutlined
} from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;

const PropertiesManagement = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  
  // Mock data for properties
  const [properties, setProperties] = useState([
    {
      id: 1,
      title: 'Modern Apartment in Downtown',
      type: 'Apartment',
      price: 350000,
      bedrooms: 2,
      bathrooms: 2,
      location: 'New York, NY',
      status: 'Active',
      featured: true,
    },
    {
      id: 2,
      title: 'Luxury Beach House',
      type: 'House',
      price: 1250000,
      bedrooms: 4,
      bathrooms: 3,
      location: 'Miami, FL',
      status: 'Pending',
      featured: true,
    },
    {
      id: 3,
      title: 'Cozy Suburban Home',
      type: 'House',
      price: 420000,
      bedrooms: 3,
      bathrooms: 2,
      location: 'Chicago, IL',
      status: 'Sold',
      featured: false,
    },
    {
      id: 4,
      title: 'Modern Studio Apartment',
      type: 'Studio',
      price: 220000,
      bedrooms: 1,
      bathrooms: 1,
      location: 'Seattle, WA',
      status: 'Active',
      featured: false,
    },
    {
      id: 5,
      title: 'Family Home with Garden',
      type: 'House',
      price: 550000,
      bedrooms: 4,
      bathrooms: 3,
      location: 'Austin, TX',
      status: 'Active',
      featured: true,
    },
  ]);

  const showModal = (property = null) => {
    setEditingProperty(property);
    if (property) {
      form.setFieldsValue(property);
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingProperty(null);
    form.resetFields();
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      if (editingProperty) {
        // Update existing property
        const updatedProperties = properties.map(prop => 
          prop.id === editingProperty.id ? { ...prop, ...values } : prop
        );
        setProperties(updatedProperties);
      } else {
        // Add new property
        const newProperty = {
          ...values,
          id: Math.max(...properties.map(p => p.id)) + 1
        };
        setProperties([...properties, newProperty]);
      }
      setIsModalVisible(false);
      setEditingProperty(null);
      form.resetFields();
    });
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this property?',
      content: 'This action cannot be undone.',
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        setProperties(properties.filter(prop => prop.id !== id));
      }
    });
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <Space>
          {text}
          {record.featured && <Tag color="gold">Featured</Tag>}
        </Space>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      filters: [
        { text: 'Apartment', value: 'Apartment' },
        { text: 'House', value: 'House' },
        { text: 'Studio', value: 'Studio' },
      ],
      onFilter: (value, record) => record.type.indexOf(value) === 0,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      sorter: (a, b) => a.price - b.price,
      render: price => `$${price.toLocaleString()}`,
    },
    {
      title: 'Beds/Baths',
      key: 'bedbath',
      render: (_, record) => `${record.bedrooms} bd / ${record.bathrooms} ba`,
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: 'Active', value: 'Active' },
        { text: 'Pending', value: 'Pending' },
        { text: 'Sold', value: 'Sold' },
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
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
    {
      title: 'Actions',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="View">
            <Button 
              type="text" 
              icon={<EyeOutlined />}
              onClick={() => console.log('View property', record.id)}
            />
          </Tooltip>
          <Tooltip title="Edit">
            <Button 
              type="text" 
              icon={<EditOutlined />}
              onClick={() => showModal(record)}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button 
              type="text" 
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record.id)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col>
          <Title level={2}>Property Management</Title>
        </Col>
        <Col>
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={() => showModal()}
          >
            Add Property
          </Button>
        </Col>
      </Row>

      <Card>
        <Table 
          columns={columns} 
          dataSource={properties} 
          rowKey="id" 
          pagination={{ pageSize: 10 }}
        />
      </Card>

      <Modal
        title={editingProperty ? 'Edit Property' : 'Add New Property'}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
        okText={editingProperty ? 'Save Changes' : 'Add Property'}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="title"
                label="Property Title"
                rules={[{ required: true, message: 'Please enter the property title' }]}
              >
                <Input placeholder="Enter property title" />
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="type"
                label="Property Type"
                rules={[{ required: true, message: 'Please select property type' }]}
              >
                <Select placeholder="Select property type">
                  <Option value="Apartment">Apartment</Option>
                  <Option value="House">House</Option>
                  <Option value="Studio">Studio</Option>
                  <Option value="Condo">Condo</Option>
                  <Option value="Land">Land</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="price"
                label="Price"
                rules={[{ required: true, message: 'Please enter the price' }]}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/\$\s?|(,*)/g, '')}
                  placeholder="Property price"
                  min={0}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="status"
                label="Status"
                rules={[{ required: true, message: 'Please select status' }]}
              >
                <Select placeholder="Select status">
                  <Option value="Active">Active</Option>
                  <Option value="Pending">Pending</Option>
                  <Option value="Sold">Sold</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="bedrooms"
                label="Bedrooms"
                rules={[{ required: true, message: 'Please enter number of bedrooms' }]}
              >
                <InputNumber min={0} style={{ width: '100%' }} placeholder="Number of bedrooms" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="bathrooms"
                label="Bathrooms"
                rules={[{ required: true, message: 'Please enter number of bathrooms' }]}
              >
                <InputNumber min={0} step={0.5} style={{ width: '100%' }} placeholder="Number of bathrooms" />
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={16}>
            <Col span={16}>
              <Form.Item
                name="location"
                label="Location"
                rules={[{ required: true, message: 'Please enter the location' }]}
              >
                <Input placeholder="City, State" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="featured"
                label="Featured Property"
                valuePropName="checked"
              >
                <Select>
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default PropertiesManagement;