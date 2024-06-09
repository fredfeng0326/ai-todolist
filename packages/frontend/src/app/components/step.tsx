import { Button, Form, Input, message, Modal, Select, Space, Table, TableColumnsType } from 'antd';
import { StepItem, StepType } from '../libs/hooks/useTask';
import { getFullDate } from '../libs/utils/dateFormatter';
import React, { FC, useState } from 'react';
import { mutate } from 'swr';
import StepApi from '../libs/api/step';

type Props = {
  steps: StepItem[]
}

const Step:FC<Props> = ({steps}) => {
  const [messageApi, contextHolder] = message.useMessage();

  const [edit, setEdit] = useState<StepItem>();
  const [isEdit, setIsEdit] = useState(false);

  const columns: TableColumnsType<StepItem> = [
    { title: 'Content', dataIndex: 'title', width: '300px', key:'title'},
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
        </Space>),
    },
  ];
  const [form] = Form.useForm();

  const onDelete = async (record: any) => {
    try {
      await StepApi.delete(record.id);
      await mutate('/task');
      messageApi.open({
        type: 'error',
        content: 'Step Deleted!'
      });
    } catch ( e ){
      console.log(e)
    }
  };

  const onEdit = async() => {
    try {
      if(edit?.id) {
        await StepApi.update(edit?.id, form.getFieldValue('title'), form.getFieldValue('status'));
      }
      messageApi.open({
        type: 'success',
        content: 'Step Updated!'
      });
      await mutate('/task');
      setIsEdit(false);
    } catch (e) {
      alert('error');
    }
  }

  return (
    <>
      <Table<StepItem> columns={columns} dataSource={steps} rowKey={'id'} />
      <Modal title={"Edit Task"} open={isEdit} footer={null} onCancel={() => setIsEdit(false)}>
        <Form
          form={form}
          onFinish={onEdit}
          initialValues={{
            title: edit?.title,
            status: edit?.status}}
        >
          <Form.Item name={'title'}>
            <Input />
          </Form.Item>
          <Form.Item name={'status'}>
            <Select>
              <Select.Option value={StepType.UNFINISHED}>Unfinished</Select.Option>
              <Select.Option value={StepType.FINISH}>Finish</Select.Option>
              <Select.Option value={StepType.CLOSED}>Closed</Select.Option>
              <Select.Option value={StepType.CANCELED}>Canceled</Select.Option>
            </Select>
          </Form.Item>
          <Space direction={'horizontal'} align={'center'} style={{width: '100%'}}>
            <Button type={'primary'} htmlType={'submit'}>Submit</Button>
            <Button onClick={() => setIsEdit(false)}>Cancel</Button>
          </Space>
        </Form>
      </Modal>
      {contextHolder}
    </>
  )
}

export default Step;
