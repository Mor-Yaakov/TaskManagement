import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { removeTask, setSelectedTask } from '../../features/tasks/tasksSlice';
import TaskRow from './TaskRow';
import TaskModal from '../TaskModal/TaskModal';
import styles from './TasksTable.module.css';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'; 

const TasksTable = () => {
  const dispatch = useDispatch();
  const { list, isLoading } = useSelector((state) => state.tasks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialEditMode, setInitialEditMode] = useState(false);

  const handleDelete = (id, e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(removeTask(id));
    }
  };

  const handleEdit = (task, e) => {
    e.stopPropagation();
    dispatch(setSelectedTask(task));
    setInitialEditMode(true);
    setIsModalOpen(true);
  };

  const handleRowClick = (task) => {
    dispatch(setSelectedTask(task));
    setInitialEditMode(false);
    setIsModalOpen(true);
  };

  const handleAddNewTask = () => {
    dispatch(setSelectedTask(null));
    setInitialEditMode(true);
    setIsModalOpen(true);
  };

  if (isLoading) {
  return <LoadingSpinner />;
}

  return (
    <div className={styles.tasksContainer}>
      <div className={styles.tableHeaderActions}>
        <button onClick={handleAddNewTask} className={styles.addBtn}>+ Add New Task</button>
      </div>
      
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Priority</th>
              <th>Created</th>
              <th>Due Date</th>
              <th>Assignee</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.length > 0 ? (
              list.map((task) => (
                <TaskRow 
                  key={task.id} 
                  task={task} 
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                  onRowClick={handleRowClick}
                />
              ))
            ) : (
              <tr>
                <td colSpan="7" className={styles.emptyState}>No tasks found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <TaskModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        initialEditMode={initialEditMode}
      />
    </div>
  );
};

export default TasksTable;