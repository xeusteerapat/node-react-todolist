import React, { useState } from 'react';
import useToggle from '../hooks/useToggle';
import { Form, Input, Checkbox, Button } from 'antd';

const Todo = ({
  todo,
  id,
  checked,
  onChangeCheckBox,
  updateTodo,
  deleteTask
}) => {
  const [editTodo, setEditTodo] = useState(todo);
  const [isEditing, toggleEditing] = useToggle(false);

  const handleChange = e => {
    setEditTodo(e.target.value);
  };

  const onFinish = value => {
    updateTodo(id, editTodo);
    toggleEditing(false);
  };
  return (
    <>
      {isEditing ? (
        <Form onFinish={onFinish}>
          <Input value={editTodo} onChange={handleChange} />
          <Button type="success" htmlType="submit">
            Save
          </Button>
        </Form>
      ) : (
        <>
          <Checkbox id={id} checked={checked} onChange={onChangeCheckBox}>
            {todo}
          </Checkbox>
          <Button type="warning" onClick={() => toggleEditing(id)}>
            Edit
          </Button>
          <Button type="danger" onClick={() => deleteTask(id)}>
            Delete
          </Button>
        </>
      )}
    </>
  );
};

export default Todo;
