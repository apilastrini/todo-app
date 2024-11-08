import { useState } from 'react';
import { TaskItem } from './../../types/components';
import Task from '../../components/Task';

import TaskToAdd from '../../components/TaskToAdd';

export default function TaskListPage() {
  const [taskList, setTaskList] = useState<TaskItem[]>([]);
  const [showTaskCreation, setShowTaskCreation] = useState<boolean>(false);

  // const handleTaskAdd = (newTask) => {
  //   setTaskList((prevTask) => [...prevTask, newTask]);
  // };

  const handleCancel = () => setShowTaskCreation(false);

  const handleSubmit = (x: TaskItem) => console.log('d', x);

  const addNewTask = () => {
    setShowTaskCreation(true);
  };
  return (
    <div>
      <p>Task list</p>
      {!showTaskCreation ? <button onClick={() => addNewTask()}>+ add task</button> : null}
      {showTaskCreation ? <TaskToAdd submit={handleSubmit} cancel={handleCancel} /> : null}
      {/* <>{taskList.length > 0 && taskList.map((task) => <Task key={task.id} />)}</> */}
    </div>
  );
}
