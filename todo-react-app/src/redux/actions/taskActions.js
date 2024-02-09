
export const addTask = (tasks) => ({
  type: 'ADD_TASK',
  payload: tasks,
});


export const updateTask = (updatedTask) => ({
  type: 'UPDATE_TASK',
  payload: updatedTask,
});


export const deleteTask = (taskId) => ({
  type: 'DELETE_TASK',
  payload: taskId,
});

