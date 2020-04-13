import React, { useEffect, useState } from 'react';
import Todo from './Todo';
import { Form, Row, Col, Input, Button, Modal, notification, List } from 'antd';
import './App.css';
import axios from '../config/axios';

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

  // Toggle complete todo
  const onChangeCheckBox = async e => {
    const body = {
      isCompleted: e.target.checked
    };
    await axios.put(`/tasks/${e.target.id}`, body);
    fetchData();
  };

  // Edit todo
  const updateTodo = async (id, newTask) => {
    const updatedTask = todoList.find(todo => todo.id === id);
    updatedTask.task = newTask;

    const body = {
      task: updatedTask.task,
      isCompleted: updatedTask.isCompleted
    };
    await axios.put(`/tasks/${id}`, body);
    fetchData();
  };

  // Delete task with confirmation
  const deleteTask = async id => {
    confirm({
      title: 'Do you want to delete this items?',
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
                <Todo
                  id={item.id}
                  key={item.id}
                  todo={item.task}
                  onChangeCheckBox={onChangeCheckBox}
                  updateTodo={updateTodo}
                  deleteTask={deleteTask}
                  checked={item.isCompleted}
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
      <Row justify="center">
        <Col span={10}>
          <Form onFinish={onFinish}>
            <Row>
              <Col span={20}>
                <Form.Item>
                  <Input value={inputValue} onChange={onChange} />
                </Form.Item>
              </Col>
              <Col span={4}>
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
            </Row>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default App;
