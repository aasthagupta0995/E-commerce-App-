import React, { useEffect } from 'react'
import { Button, Card, Col, Form, Input, Row, Space, Spin, Typography, message } from 'antd'
import { Edit, Mail, MapPin, Phone, UserCircle2 } from 'lucide-react'
import useSWR from 'swr'
import { fetcher } from '../../lib/fetcher'
import { httpRequest } from '../../lib/http-request'

const { Paragraph, Text, Title } = Typography

const Profile = () => {
    const [isEditing, setIsEditing] = React.useState(false)
    const { data, error, isLoading } = useSWR('/auth/session', fetcher)
    const [isSaving, setIsSaving] = React.useState(false)
    const [form] = Form.useForm()

    const handleEdit = () => {
        setIsEditing(true)
    }

    const handleCancel = () => {
        setIsEditing(false)
        form.resetFields()
    }


    useEffect(() => {
        if (data) {
            form.setFieldsValue({
                name: data.name,
                email: data.email,
                city: data.city || '',
                state: data.state || '',
                country: data.country || '',
                pincode: data.pincode || '',
                phone: data.phone || '',
            })
        }
    }, [data, form])

    const updateUser = async (values: any) => {

        try {
            setIsSaving(true)
            const { data } = await httpRequest.put('/auth/update', values)
            console.log(data)
            setIsEditing(false)
            message.success('Profile updated successfully')

        }
        catch (error) {
            console.error('Error updating user profile:', error)
            message.error('Unable to update profile. Please try again.')
        }
        finally {
            setIsSaving(false)
        }
    }

    if (isLoading) {
        return (
            <div className="profile-settings-page profile-loading-state">
                <Spin size="large" />
            </div>
        )
    }

    // if (error) {
    //     return (
    //         <div className="profile-settings-page profile-loading-state">
    //             <Card className="profile-card">
    //                 <Title level={4}>Unable to load your profile</Title>
    //                 <Paragraph type="secondary">
    //                     Please refresh the page and try again.
    //                 </Paragraph>
    //             </Card>
    //         </div>
    //     )
    // }

    const initials = (data?.name || 'User')
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part: string) => part[0]?.toUpperCase())
        .join('')


    return (
        <div className="profile-settings-page">
            <Card className="profile-card" bordered={false}>
                <div className="profile-heading">
                    <Space size={14}>
                        <div className="profile-avatar">{initials || 'U'}</div>
                        <div>
                            <Title level={3}>Profile Settings</Title>
                            <Text type="secondary">Manage your personal details and contact information.</Text>
                        </div>
                    </Space>
                    {!isEditing && (
                        <Button
                            className="profile-edit-btn"
                            icon={<Edit size={16} />}
                            onClick={handleEdit}
                        >
                            Edit Profile
                        </Button>
                    )}
                </div>

                <Form form={form} layout="vertical" onFinish={updateUser}>
                    <div className="profile-section-label">Personal Information</div>
                    <Row gutter={16}>
                        <Col xs={24} md={12}>
                            <Form.Item name="name" label="Full Name" rules={[{ required: true, message: 'Name is required' }]}>
                                <Input prefix={<UserCircle2 size={16} />} placeholder="Enter your full name" disabled={!isEditing} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item name="email" label="Email Address" rules={[{ required: true, type: 'email' }]}>
                                <Input prefix={<Mail size={16} />} placeholder="Email address" disabled />
                            </Form.Item>
                        </Col>
                    </Row>

                    <div className="profile-section-label">Address Details</div>
                    <Row gutter={16}>
                        <Col xs={24} md={8}>
                            <Form.Item name="city" label="City" rules={[{ required: true, message: 'City is required' }]}>
                                <Input prefix={<MapPin size={16} />} placeholder="Enter city" disabled={!isEditing} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item name="state" label="State" rules={[{ required: true, message: 'State is required' }]}>
                                <Input placeholder="Enter state" disabled={!isEditing} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item name="country" label="Country" rules={[{ required: true, message: 'Country is required' }]}>
                                <Input placeholder="Enter country" disabled={!isEditing} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col xs={24} md={12}>
                            <Form.Item name="pincode" label="Postal Code" rules={[{ required: true, message: 'Postal code is required' }]}>
                                <Input placeholder="Enter postal code" disabled={!isEditing} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item name="phone" label="Phone Number" rules={[{ required: true, message: 'Phone number is required' }]}>
                                <Input prefix={<Phone size={16} />} placeholder="Enter phone number" disabled={!isEditing} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <div className="profile-actions">
                        {isEditing && (
                            <Button className="profile-cancel-btn" onClick={handleCancel}>
                                Cancel
                            </Button>
                        )}
                        <Button className="profile-save-btn" htmlType="submit" disabled={!isEditing} loading={isSaving}>
                            Save Changes
                        </Button>
                    </div>
                </Form>
                </Card>
        </div>
    )
}

export default Profile