import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addTask, updateTask } from './redux/actions/taskActions';
import { Routes, Route, Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Checkbox, Input, Button, List, Typography } from 'antd';
import {
  UnorderedListOutlined,
  FileAddOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer } = Layout;

const { Title, Text } = Typography;
const TaskList = () => {
    const [tasks, setTasks] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:5256/api/tasks');
          const sortedTasks = response.data.slice().sort((a, b) => b.id - a.id);
          setTasks(sortedTasks);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []); 
  
    const handleDelete = async (id) => {
      try {
        await axios.delete(`http://localhost:5256/api/tasks/${id}`);
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      } catch (error) {
        console.error('Error deleting data:', error);
      }
    };
  
    const handleToggleComplete = async (id, isCompleted, name) => {
        try {
          await axios.put(`http://localhost:5256/api/tasks/${id}`, {
            Name: name,
            IsCompleted: !isCompleted,
          });
      
          setTasks((prevTasks) =>
            prevTasks.map((task) =>
              task.id === id ? { ...task, isCompleted: !isCompleted } : task
            )
          );
        } catch (error) {
          console.error('Error updating data:', error);
        }
      };
      
  
    return (
      <div>
        <Title level={3}>Tasks</Title>
        <List
          bordered
          dataSource={tasks}
          renderItem={(task) => (
            <List.Item
              actions={[
                <Link to={`/task-guncelle/${task.id}`}>
                  <EditOutlined key="edit" />
                </Link>,
                <DeleteOutlined key="delete" onClick={() => handleDelete(task.id)} />,
              ]}
            >
              <Checkbox
                checked={task.isCompleted}
                onChange={() => handleToggleComplete(task.id, task.isCompleted, task.name)}
              >
                <Text delete={task.isCompleted}>{task.name}</Text>
              </Checkbox>
            </List.Item>
          )}
        />
      </div>
    );
  };
  
const TaskUpdate = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();
  
    const [inputValue2, setInputValue2] = useState('');
    const tasks = useSelector((state) => state.inputValues.tasks);
  
    useEffect(() => {
      const taskToUpdate = tasks.find((task) => task.id === parseInt(id));
  
      if (taskToUpdate) {
        setInputValue2(taskToUpdate.name);
      }
    }, [tasks, id]);
  
    const handleUpdate = async () => {
      try {
        const response = await axios.put(`http://localhost:5256/api/tasks/${id}`, {
          Name: inputValue2,
          IsCompleted: false,
        });
        const updatedTask = response.data;
        dispatch(updateTask(updatedTask));

        navigate('/liste');
      } catch (error) {
        console.error('Error updating data:', error);
      }
    };
  
    return (
      <div>
        <Title level={3}>Update Task</Title>
        <Input type="text" value={inputValue2} onChange={(e) => setInputValue2(e.target.value)} /><hr>
        </hr>
        <Button type="primary" onClick={handleUpdate}>
          Update
        </Button>
      </div>
    );
  };
  

const TaskAdd = () => {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAdd = async () => {
    try {
      const response = await axios.post('http://localhost:5256/api/tasks', {
        Name: inputValue,
        IsCompleted: false,
      });

      dispatch(addTask(response.data));  
      setInputValue('');
      navigate('/liste');
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };

  return (
    
    <div>
        <Title level={3}>Add Task</Title>
      <Input type="text" value={inputValue} onChange={handleInputChange} /><hr></hr>
      <Button type="primary" onClick={handleAdd}>
        Add
      </Button>
    </div>
  );
};

const App = () => {
  return (
    <Layout>
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} > 
          <Menu.Item key="1" >
            <Link to="/liste">
              <UnorderedListOutlined />
              Task List
            </Link>
          </Menu.Item>
          <Menu.Item key="2" >
            <Link to="/task-ekle">
              <FileAddOutlined />
              Task Add
            </Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '30px 0' }}>
          <Breadcrumb.Item>
            <Link to="/liste">ToDo App</Link>
          </Breadcrumb.Item>
         
        </Breadcrumb>
        <div className="site-layout-content">
          <Routes>
            <Route path="/liste" element={<TaskList />} />
            <Route path="/task-ekle" element={<TaskAdd />} />
            <Route path="/task-guncelle/:id" element={<TaskUpdate />} />
            <Route path="/" element={<Navigate to="/liste" />} />
          </Routes>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>ToDo App</Footer>
    </Layout>
  );
};

export default App;