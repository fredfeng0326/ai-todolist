import { Button, Form, Input, Layout, Space } from 'antd';
import styled from '@emotion/styled';
import AuthApi from '../libs/api/authApi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StyledContent = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '18px 0 0 0',
});


type LoginFormFields = {
  username: string;
  password: string;
};

export default function Login() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isRequesting, setIsRequesting] = useState(false);

  const onFinish = async (values: LoginFormFields) => {
    try {
      setIsRequesting(true);
      await AuthApi.login(values);
      navigate('/task')
      // do somethin
    } catch (e) {
      // error handling
    } finally {
      setIsRequesting(false);
    }
  }
  return (
    <Layout>
      <Layout.Content style={{
        display: 'flex',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <StyledContent>
          <h1>Todo List</h1>
          <Form form={form} name={'login'} onFinish={onFinish} style={{maxWidth: '400px'}}>
            <Form.Item label={'Username'} name={'username'} rules={[{required: true, message: 'please input your username'}]}>
              <Input placeholder={'username'} />
            </Form.Item>
            <Form.Item label={'Password'} name={'password'} rules={[{required: true, message: 'please input your password'}]}>
              <Input.Password placeholder={'password'} />
            </Form.Item>
            <Space direction={'vertical'} align={'center'} style={{width: '100%'}}>
              <Button type={'primary'} htmlType={'submit'} loading={isRequesting}>Login</Button>
            </Space>
          </Form>
        </StyledContent>
      </Layout.Content>
    </Layout>
  );
}
