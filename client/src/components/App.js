import React, { useEffect, useState } from 'react';
import {
  Modal,
  Checkbox,
  Typography,
  List,
  Row,
  Col,
  Input,
  Button,
  notification,
  Form
} from 'antd';
import './App.css';
import axios from '../config/axios';

const { Text } = Typography;
const { confirm } = Modal;

function App() {
  const [todoList, setTodoList] = useState([]);
  const [inputValue, setInputValue] = useState('');

  // fetch data from backend
  const fetchData = async () => {
    const result = await axios.get('/tasks');
    setTodoList(result.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onChange = e => {
    setInputValue(e.target.value);
  };

  // Add new task
  const onFinish = async () => {
    const body = {
      task: inputValue
    };
    await axios.post('/tasks', body);
    fetchData();
    setInputValue('');
  };

  // toggle complete todo
  const onChangeCheckBox = async e => {
    const body = {
      isCompleted: e.target.checked
    };
    await axios.put(`/tasks/${e.target.id}`, body);
    fetchData();
  };

  // Delete task with confirmation
  const deteleTask = async id => {
    confirm({
      title: 'Do you want to delete this items?',
      // icon: <ExclamationCircleOutlined />,
      content: `Do you want to delete Task ID: ${id}`,
      onOk() {
        axios.delete(`/tasks/${id}`).then(result => {
          notification.success({
            message: `Delete Task ID: ${id}`,
            description: `You have been deleted task ID: ${id} permanently`
          });
          fetchData();
        });
      },
      onCancel() {
        //Do Nothing
      }
    });
  };

  return (
    <div className="App">
      <Row justify="center" style={{ marginTop: '20px' }}>
        <Col span={10}>
          <List
            header={'To-do List'}
            bordered
            dataSource={todoList}
            renderItem={item => (
              <List.Item>
                <Checkbox
                  id={item.id}
                  key={item.id}
                  checked={item.isCompleted}
                  onChange={onChangeCheckBox}
                >
                  {item.task}
                </Checkbox>
                <Button type="danger" onClick={() => deteleTask(item.id)}>
                  Delete
                </Button>
              </List.Item>
            )}
          />
        </Col>
      </Row>
      <Row justify="center">
        <Form onFinish={onFinish}>
          <Col span={24}>
            <Form.Item>
              <Input value={inputValue} onChange={onChange} />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item>
              <Button
                style={{ width: '100%' }}
                type="primary"
                htmlType="submit"
              >
                Add
              </Button>
            </Form.Item>
          </Col>
        </Form>
      </Row>
    </div>
  );
}

export default App;
