import styles from './TasksTable.module.css';
import { Trash2, Edit2 } from 'lucide-react';

const TaskRow = ({ task, onDelete, onEdit, onRowClick }) => {
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('he-IL');
  };

  const formatStatusDisplay = (status) => {
    if (!status) return 'NEW';
    return status.replace(/([A-Z])/g, ' $1').trim().toUpperCase();
  };

  const getStatusClass = (status) => {
    if (!status) return styles.new;
    const className = status.toLowerCase();
    return styles[className] || styles.new;
  };

  return (
    <tr className={styles.row} onClick={() => onRowClick(task)}>
      <td className={styles.taskTitle}>{task.title}</td>
      <td>
        <span className={`${styles.badge} ${styles[task.priority?.toLowerCase()]}`}>
          {task.priority}
        </span>
      </td>
      <td className={styles.dateCell}>{formatDate(task.createdAt)}</td>
      <td className={styles.dateCell} style={{fontWeight: '600'}}>{formatDate(task.dueDate)}</td>
      <td>
        <div className={styles.userColumn}>
          <span className={styles.userName}>{task.userFullName || 'Unassigned'}</span>
          <span className={styles.userContact}>{task.userPhone}</span>
        </div>
      </td>
      <td>
        <span className={`${styles.statusBadge} ${getStatusClass(task.status)}`}>
          {formatStatusDisplay(task.status)}
        </span>
      </td>
      <td className={styles.actions}>
        <button onClick={(e) => onEdit(task, e)} className={styles.editBtn}>
          <Edit2 size={18} />
        </button>
        <button onClick={(e) => onDelete(task.id, e)} className={styles.deleteBtn}>
          <Trash2 size={18} />
        </button>
      </td>
    </tr>
  );
};

export default TaskRow;