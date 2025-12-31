import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks } from '../../features/tasks/tasksSlice'; 
import StatCard from '../StatCard/StatCard';
import TasksTable from '../TasksTable/TasksTable';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { list, isLoading, error } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const total = list.length;
  const pending = list.filter(t => t.status !== 'Completed').length;
  const completed = list.filter(t => t.status === 'Completed').length;

  return (
    <div className={styles.dashboardBlock}>
      <header className={styles.header}>
        <div className={styles.headerTitle}>
          <h1>Task Manager</h1>
        </div>
      </header>

      <div className={styles.contentPadding}>
        <section className={styles.statsSection}>
          <StatCard label="Total Tasks" value={isLoading ? '...' : total} type="total" />
          <StatCard label="Pending" value={isLoading ? '...' : pending} type="pending" />
          <StatCard label="Completed" value={isLoading ? '...' : completed} type="completed" />
        </section>

        {error && <div className={styles.errorBanner}>Error: {error}</div>}

        <section className={styles.tableSection}>
          <TasksTable />
        </section>
      </div>
    </div>
  );
};

export default Dashboard;