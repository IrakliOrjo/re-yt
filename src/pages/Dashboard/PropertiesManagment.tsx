import { useState, useEffect } from 'react';
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
  Tooltip,
  Upload,
  message,
  Spin
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined,
  EyeOutlined,
  UploadOutlined,
  PictureOutlined
} from '@ant-design/icons';
import { uploadImageToCloudinary } from '../../services/uploadService';
import { 
  getAllProperties, 
  createProperty, 
  updateProperty, 
  deleteProperty,
  Property,
  PropertyImage,
} from '../../services/api';
import {  UploadFile } from 'antd/es/upload';
import { ColumnsType } from 'antd/es/table';

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const PropertiesManagement = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrls, setImageUrls] = useState<PropertyImage[]>([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  
  // State for properties data
  const [properties, setProperties] = useState<Property[] | []>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load properties from API
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAllProperties();
        setProperties(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Failed to load properties');
        }
        message.error('Failed to load properties');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  console.log('properties,', properties)

  const showModal = (property: Property | null = null) => {
    setEditingProperty(property);
    if (property) {
      // Format the property data to match the form fields
      const formData = {
        ...property,
        location: property.address // Map address to location field
      };
      form.setFieldsValue(formData);
      
      // Set image URLs if available
      if (property.images && Array.isArray(property.images) && property.images.length > 0) {
        console.log('Found property images:', property.images);
        setImageUrls(property.images);
      } else if (property.main_image) {
        console.log('Only found main image:', property.main_image);
        setImageUrls([{ url: property.main_image }]);
      }
    } else {
      form.resetFields();
      setImageUrls([]);
    }
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingProperty(null);
    setImageUrls([]);
    form.resetFields();
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      
      // Prepare property data
      const propertyData = {
        ...values,
        address: values.location, // Map location field to address
        images: imageUrls
      };

      setLoading(true);
      
      if (editingProperty) {
        // Update existing property
        await updateProperty(Number(editingProperty.id), propertyData);
        message.success('Property updated successfully');
      } else {
        // Create new property
        await createProperty(propertyData);
        message.success('Property added successfully');
      }
      
      // Refresh the properties list
      const updatedProperties = await getAllProperties();
      setProperties(updatedProperties);
      
      setIsModalVisible(false);
      setEditingProperty(null);
      setImageUrls([]);
      form.resetFields();
    } catch (err) {
      console.error('Error saving property:', err);
      message.error('Failed to save property: ' + (err || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id:number) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this property?',
      content: 'This action cannot be undone.',
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          setLoading(true);
          await deleteProperty(id);
          message.success('Property deleted successfully');
          
          // Refresh the properties list
          const updatedProperties = await getAllProperties();
          setProperties(updatedProperties);
        } catch (err) {
          console.error('Error deleting property:', err);
          message.error('Failed to delete property: ' + (err || 'Unknown error'));
        } finally {
          setLoading(false);
        }
      }
    });
  };

  // Handle image upload to Cloudinary
  const handleUpload = async (file:File ) => {
    setUploading(true);
    
    try {
      // Upload with secure signature using our service
      const imageUrl = await uploadImageToCloudinary(file);
      
      // Add the new URL to our existing list
      setImageUrls(prev => [...prev, { url: imageUrl }]);
      message.success('Image uploaded successfully');
      return imageUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      message.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  function isPropertyImage(item: any): item is PropertyImage {
    return item && typeof item === 'object' && 'url' in item;
  }

  // Custom file upload component logic for Ant Design Upload
  const customUploadProps = {
    beforeUpload: (file: File) => {
      // Your existing validation logic
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('You can only upload image files!');
        return false;
      }
      
      const isLessThan5MB = file.size / 1024 / 1024 < 5;
      if (!isLessThan5MB) {
        message.error('Image must be smaller than 5MB!');
        return false;
      }
      
      handleUpload(file);
      return false;
    },
    // Create a properly typed fileList
    fileList: imageUrls.map((item, index) => {
      const url = isPropertyImage(item) ? item.url : item;
      return {
        uid: `-${index}`,
        name: `Image ${index + 1}`,
        status: 'done' as const, // Use const assertion for literal type
        url, // Use the extracted URL
        thumbUrl: url,
      };
    }),
    onPreview: (file: UploadFile) => {
      setPreviewImage(file.url ?? file.thumbUrl ?? '');
      setPreviewVisible(true);
    },
    onRemove: (file: UploadFile) => {
      const fileUrl = file.url || file.thumbUrl || '';
      
      // Filter using the same logic that discerns between types
      const newImageUrls = imageUrls.filter(item => {
        const itemUrl = isPropertyImage(item) ? item.url : item;
        return itemUrl !== fileUrl;
      });
      
      setImageUrls(newImageUrls);
      return true;
    },
    listType: 'picture-card' as const, // Use const assertion for literal type
  };

  // Table columns
  const columns: ColumnsType<Property> = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text:string, record:Property) => (
        <Space>
          {text}
          {record.featured && <Tag color="gold">Featured</Tag>}
        </Space>
      ),
    },
    {
      title: 'Image',
      key: 'image',
      render: (_, record:Property) => (
        <Space>
          {record.main_image ? (
            <Tooltip title="View Image">
              <Button 
                type="text" 
                icon={<PictureOutlined />}
                onClick={() => {
                  setPreviewImage(record.main_image ?? '');
                  setPreviewVisible(true);
                }}
              />
            </Tooltip>
          ) : (
            <Tag color="default">No Image</Tag>
          )}
        </Space>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      filters: [
        { text: 'House', value: 'house' },
        { text: 'Apartment', value: 'apartment' },
        { text: 'Commercial', value: 'commercial' },
      ],
      onFilter: (value, record: Property) => record.type === value,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      sorter: (a: Property, b: Property) => (a.price || 0) - (b.price || 0),
      render: (price: number) => price ? `$${price.toLocaleString()}` : '$0',
    },
    {
      title: 'Beds/Baths',
      key: 'bedbath',
      render: (_, record:Property) => `${record.bedrooms || 0} bd / ${record.bathrooms || 0} ba`,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: 'Sale', value: 'Sale' },
        { text: 'Rent', value: 'Rent' },
      ],
      onFilter: (value, record:Property) => record.status === value,
      render: (status:string) => {
        let color = 'green';
        if (status === 'Rent') {
          color = 'blue';
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Actions',
      key: 'action',
      render: (_, record:Property) => (
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
              onClick={() => handleDelete(Number(record.id))}
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
            disabled={loading}
          >
            Add Property
          </Button>
        </Col>
      </Row>

      {error && (
        <div style={{ marginBottom: 16 }}>
          <Text type="danger">{error}</Text>
        </div>
      )}

      <Card>
        <Table 
          columns={columns} 
          dataSource={properties} 
          rowKey="id" 
          loading={loading}
          pagination={{ pageSize: 10 }}
        />
      </Card>

      {/* Image Preview Modal */}
      <Modal
        open={previewVisible}
        title="Image Preview"
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        <img alt="property" style={{ width: '100%' }} src={previewImage} />
      </Modal>

      {/* Add/Edit Property Modal */}
      <Modal
        title={editingProperty ? 'Edit Property' : 'Add New Property'}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
        okText={editingProperty ? 'Save Changes' : 'Add Property'}
        okButtonProps={{ disabled: uploading || loading }}
        confirmLoading={loading}
      >
        <Spin spinning={loading}>
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
              <Col span={24}>
                <Form.Item
                  name="description"
                  label="Description"
                >
                  <TextArea rows={4} placeholder="Property description" />
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
                    <Option value="house">House</Option>
                    <Option value="appartment">Appartment</Option>
                    <Option value="commercial">Commercial</Option>
                    <Option value="land">LAnd</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="price"
                  label="Price"
                  rules={[{ required: true, message: 'Please enter the price' }]}
                >
                  <InputNumber<number>
                    style={{ width: '100%' }}
                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(value) => {
                      if (value === undefined) return 0;
                      return parseFloat(value.replace(/\$\s?|(,*)/g, '')) || 0;
                    }}
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
                    <Option value="Sale">Sale</Option>
                    <Option value="Rent">Rent</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  name="bedrooms"
                  label="Bedrooms"
                  rules={[{ required: true, message: 'Please enter number of bedrooms' }]}
                >
                  <InputNumber min={0} style={{ width: '100%' }} placeholder="Number of bedrooms" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="bathrooms"
                  label="Bathrooms"
                  rules={[{ required: true, message: 'Please enter number of bathrooms' }]}
                >
                  <InputNumber min={0} step={0.5} style={{ width: '100%' }} placeholder="Number of bathrooms" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="toilet_count"
                  label="Toilet Count"
                >
                  <InputNumber min={0} style={{ width: '100%' }} placeholder="Number of toilets" />
                </Form.Item>
              </Col>
            </Row>
            
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  name="floor"
                  label="Floor"
                >
                  <InputNumber min={0} style={{ width: '100%' }} placeholder="Floor" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="total_floors"
                  label="Total Floors"
                >
                  <InputNumber min={0} style={{ width: '100%' }} placeholder="Total floors" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="surface"
                  label="Surface Area"
                  rules={[{ required: true, message: 'Please enter surface area' }]}
                >
                  <Input placeholder="e.g. 120 კვ.მ" />
                </Form.Item>
              </Col>
            </Row>
            
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="location"
                  label="Location"
                  rules={[{ required: true, message: 'Please enter the location' }]}
                >
                  <Input placeholder="Full address" />
                </Form.Item>
              </Col>
            </Row>
            
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  name="repair"
                  label="Repair/Condition"
                >
                  <Select placeholder="Select condition">
                    <Option value="ახალი გარემონტებული">Newly Renovated</Option>
                    <Option value="ძველი რემონტით">Old Renovated</Option>
                    <Option value="სარემონტო">Needs renovation</Option>
                    <Option value="თეთრი კარკასი">White Frame</Option>
                    <Option value="შავი კარკასი">Black Frame</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="heating_system"
                  label="Heating System"
                >
                  <Select placeholder="Select heating">
                    <Option value="central">Central</Option>
                    <Option value="gas">Gas Heat</Option>
                    <Option value="electric">Electric Heat</Option>
                    <Option value="none">Has None</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="featured"
                  label="Featured Property"
                  valuePropName="checked"
                >
                  <Select defaultValue={false}>
                    <Option value={true}>Yes</Option>
                    <Option value={false}>No</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            
            <Row gutter={16}>
              <Col span={6}>
                <Form.Item
                  name="balcony"
                  label="Balcony"
                  valuePropName="checked"
                >
                  <Select defaultValue={false}>
                    <Option value={true}>Yes</Option>
                    <Option value={false}>No</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  name="parking"
                  label="Parking"
                  valuePropName="checked"
                >
                  <Select defaultValue={false}>
                    <Option value={true}>Yes</Option>
                    <Option value={false}>No</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  name="furniture"
                  label="Furniture"
                  valuePropName="checked"
                >
                  <Select defaultValue={false}>
                    <Option value={true}>Yes</Option>
                    <Option value={false}>No</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  name="elevator"
                  label="Elevator"
                  valuePropName="checked"
                >
                  <Select defaultValue={false}>
                    <Option value={true}>Yes</Option>
                    <Option value={false}>No</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            {/* Image Upload Section */}
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  label="Property Images"
                  extra="Upload up to 10 images. Each image must be less than 5MB."
                >
                  <Upload {...customUploadProps} key={imageUrls.length}>
                    {imageUrls.length >= 10 ? null : (
                      <div>
                        <UploadOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                      </div>
                    )}
                  </Upload>
                  {uploading && <div style={{ marginTop: 16 }}>Uploading...</div>}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Spin>
      </Modal>
    </div>
  );
};

export default PropertiesManagement;