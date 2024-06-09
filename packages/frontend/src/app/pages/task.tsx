import useTask, { TaskItem, TaskType } from '../libs/hooks/useTask';
import {
  Button,
  Form,
  Input,
  Layout,
  message,
  Modal,
  Select,
  Space,
  Table,
  TableColumnsType
} from 'antd';
import useAuth from '../libs/hooks/useAuth';
import TaskApi from '../libs/api/task';
import { mutate } from 'swr';
import { getFullDate } from '../libs/utils/dateFormatter';
import React, { useState } from 'react';
import StepApi from '../libs/api/step';
import Step from '../components/step';
import AuthApi from '../libs/api/authApi';
import AutoTask from '../components/auto-task';
const { Header, Content } = Layout;

export default function Task() {
  const { tasks } = useTask();
  const { user, authenticated} = useAuth();
  const [messageApi, contextHolder] = message.useMessage();
  const [isEdit, setIsEdit] = useState(false);
  const [edit, setEdit] = useState<TaskItem>();
  const [isAddStep, setIsAddStep] = useState(false);
  const [addStep, setAddStep] = useState<TaskItem>();
  const [stepContent, setStepContent] = useState('');
  const [aiFunction, setAiFunction] = useState(false);
  const [isAddTask, setIsAddTask] = useState(false);
  const [isAskAI, setAskAI] = useState(false);

  const onDelete = async (record: any) => {
    try {
      await TaskApi.deleteTask(record.id);
      await mutate('/task');
      messageApi.open({
        type: 'error',
        content: 'Task Deleted!'
      });
    } catch ( e ){
      console.log(e)
    }
  };
  const [form] = Form.useForm();
  const [addForm] = Form.useForm();

  const columns: TableColumnsType<TaskItem> = [
    { title: 'title', dataIndex: 'title', width: '200px', key:'title'},
    { title: 'description', dataIndex: 'description', width: '500px', key: 'description'},
    { title: 'status', dataIndex: 'status', width: '150px'},
    { title: 'updated time', dataIndex: 'updatedAt', sortDirections: ['ascend'], width: '250px', render: ((date: string) => getFullDate(date))},
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (text, record) => (
        <Space>
          <Button onClick={() => onDelete(record)}>Delete</Button>
          <Button onClick={() => {setEdit(record); setIsEdit(true)}}>Edit</Button>
          <Button onClick={() => {setAddStep(record); setIsAddStep(true)}}>Add Step</Button>
        </Space>),
    },
  ];

  const onEdit = async() => {
    try {
      if(edit?.id) {
        await TaskApi.updateTask(edit?.id, form.getFieldValue('title'), form.getFieldValue('description'), form.getFieldValue('status'));
      }
      messageApi.open({
        type: 'success',
        content: 'Task Updated!'
      });
      await mutate('/task');
      setIsEdit(false);
    } catch (e) {
      alert('error');
    }
  }

  const onAddStep = async () => {
    try {
      if(addStep?.id) {
        await StepApi.createStep(addStep?.id, stepContent);
      }
      messageApi.open({
        type: 'success',
        content: 'Step Added!'
      });
      await mutate('/task');
      setIsAddStep(false);
    } catch (e) {
      alert('error');
    }
  }

  const onUpdateUser = async () => {
    try {
      await AuthApi.updateUser();
      messageApi.open({
        type: 'success',
        content: 'You can use AI function now!'
      });
      await mutate('/auth');
    } catch (e) {
      alert('error');
    }
  }

  const onAddTask = async () => {
    try {
      await TaskApi.createTask(addForm.getFieldValue('title'), addForm.getFieldValue('description'));
      messageApi.open({
        type: 'success',
        content: 'Task Added!'
      });
      await mutate('/task');
      setIsAddTask(false);
    } catch (e) {
      alert('error');
    }
  }

  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }} >
        {authenticated ? <div style={{color: 'white'}}>{user.username}</div>: 'no logged in'}
        <Button style={{marginLeft: '30px'}} type={'primary'} onClick={() => setAiFunction(true)}>Update AI Function</Button>
      </Header>
      <Content>
        {contextHolder}
        <div style={{display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'center', flexDirection: 'column'}}>
          <Space style={{width: '80%', justifyContent: 'space-between', marginTop: '20px', marginBottom: '30px'}}>
            <Button size={'large'} type={'primary'} onClick={() => setIsAddTask(true)}>Add Task</Button>
            {user.isAdmin && <Button size={'large'} type={'primary'} onClick={() => setAskAI(true)}>AI Function</Button>}
          </Space>
          <Table
            columns={columns}
            expandable={{
              expandedRowRender: (record) => <Step steps={record.steps}/>,
              rowExpandable: (record) => record.steps.length > 0,
            }}
            dataSource={tasks.map((x, i) => ({ ...x, key: i }))}
          />
        </div>
        <Modal title={"Edit Task"} open={isEdit} footer={null} onCancel={() => setIsEdit(false)}>
          <Form
            form={form}
            onFinish={onEdit}
            initialValues={{
              title: edit?.title,
              description: edit?.description,
              status: edit?.status}}
          >
            <Form.Item name={'title'} label={'title'}>
              <Input />
            </Form.Item>
            <Form.Item name={'description'} label={'description'}>
              <Input />
            </Form.Item>
            <Form.Item name={'status'} label={'status'}>
              <Select>
                <Select.Option value={TaskType.UNFINISHED}>Unfinished</Select.Option>
                <Select.Option value={TaskType.FINISH}>Finish</Select.Option>
                <Select.Option value={TaskType.CLOSED}>Closed</Select.Option>
                <Select.Option value={TaskType.CANCELED}>Canceled</Select.Option>
              </Select>
            </Form.Item>
            <Space direction={'horizontal'} align={'center'} style={{width: '100%'}}>
              <Button type={'primary'} htmlType={'submit'}>Submit</Button>
              <Button onClick={() => setIsEdit(false)}>Cancel</Button>
            </Space>
          </Form>
        </Modal>
        <Modal title={"Add Task"} open={isAddTask} footer={null} onCancel={() => setIsAddTask(false)}>
          <Form
            form={addForm}
            onFinish={onAddTask}
          >
            <Form.Item name={'title'} label={'title'}>
              <Input />
            </Form.Item>
            <Form.Item name={'description'} label={'description'}>
              <Input />
            </Form.Item>
            <Space direction={'horizontal'} align={'center'} style={{width: '100%'}}>
              <Button type={'primary'} htmlType={'submit'}>Submit</Button>
              <Button onClick={() => setIsEdit(false)}>Cancel</Button>
            </Space>
          </Form>
        </Modal>
        <Modal title={"Add Step"} open={isAddStep} footer={null} onCancel={() => setIsAddStep(false)}>
          <Form>
            <Form.Item name={'title'}>
              <Input placeholder={'please input the content of the step'} onChange={(e) => setStepContent(e.target.value)}/>
            </Form.Item>
            <Space direction={'horizontal'} align={'center'} style={{width: '100%'}}>
              <Button type={'primary'} onClick={onAddStep}>Submit</Button>
              <Button onClick={() => setIsEdit(false)}>Cancel</Button>
            </Space>
          </Form>
        </Modal>
      </Content>
      <Modal title={"Update For AI Function"} footer={null} onCancel={() => setAiFunction(false)} open={aiFunction}>
        <h2>{user.isAdmin ? "You already have this function": 'Do you want to pay 10$ for ai generator task function?'}</h2>
        <Space direction={'horizontal'} align={'center'} style={{width: '100%', marginTop: '30px'}}>
          <Button type={'primary'} onClick={onUpdateUser}>Submit</Button>
          <Button onClick={() => setAiFunction(false)}>Cancel</Button>
        </Space>
      </Modal>
      <Modal title={"AI Function"} footer={null} onCancel={() => setAskAI(false)} open={isAskAI}>
        <AutoTask />
      </Modal>
    </Layout>
  );
}
