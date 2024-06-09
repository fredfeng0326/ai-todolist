import React, { FC, useState } from 'react';
import { Button, Form, Input, message, Space } from 'antd';
import TaskApi from '../libs/api/task';
import { mutate } from 'swr';

const AutoTask:FC = () => {
  const [aiContent, setAIContent] = useState('');
  const [isRequesting, setIsRequesting] = useState(false);
  const [steps, setSteps] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  const onAskAI = async () => {
    try {
      setIsRequesting(true)
      const res = await TaskApi.askAI(aiContent);
      setSteps(res.steps)
    } catch (e) {
      alert('error');
    } finally {
      setIsRequesting(false);
    }
  }

  const generateTask = async () => {
    try {
      setIsRequesting(true);
      const stepsArr = steps.map((step) => ({title: step}));
      await TaskApi.createTaskByAI(aiContent, stepsArr);
      messageApi.open({
        type: 'success',
        content: 'Task Added!'
      });
      await mutate('/task');
    } catch (e) {
      alert('error');
    } finally {
      setIsRequesting(false);
    }
  }
  return (
    <Form>
      {contextHolder}
      <Form.Item name={'question'}>
        <Input placeholder={'please try to input a task you want to do, like "clean house"'} onChange={(e) => setAIContent(e.target.value)}/>
      </Form.Item>
      <Space direction={'horizontal'} align={'center'} style={{width: '100%'}}>
        <Button type={'primary'} onClick={onAskAI} loading={isRequesting}>Ask AI</Button>
      </Space>
      {steps && steps.map((step, index) => (
        <div key={index} style={{fontSize: '16px', marginTop: '10px'}}>{step}</div>
      ))}
      {
        steps.length > 0 && (<Space direction={'horizontal'} align={'center'} style={{width: '100%', marginTop: '20px'}}>
          <Button type={'primary'} onClick={generateTask} loading={isRequesting} size={'large'}>Generate Task</Button>
        </Space>)
      }
    </Form>
  );
}

export default AutoTask;
