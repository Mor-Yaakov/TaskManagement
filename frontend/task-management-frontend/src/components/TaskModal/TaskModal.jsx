import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { X, Pencil, AlertCircle } from 'lucide-react';
import { addTask, editTask, clearSelectedTask } from '../../features/tasks/tasksSlice';
import styles from './TaskModal.module.css';

const TaskModal = ({ isOpen, onClose, initialEditMode }) => {
  const dispatch = useDispatch();
  const { selectedTask, error: apiError } = useSelector((state) => state.tasks);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'Low',
    userFullName: '',
    userPhone: '',
    userEmail: '',
    status: 'New'
  });

  useEffect(() => {
    if (isOpen) {
      setErrors({});
      if (selectedTask) {
        setFormData({
          id: selectedTask.id,
          title: selectedTask.title || '',
          description: selectedTask.description || '',
          dueDate: selectedTask.dueDate ? selectedTask.dueDate.split('T')[0] : '',
          priority: selectedTask.priority || 'Low',
          userFullName: selectedTask.userFullName || '',
          userPhone: selectedTask.userPhone || '',
          userEmail: selectedTask.userEmail || '',
          status: selectedTask.status || 'New'
        });
        setIsEditing(initialEditMode);
      } else {
        setFormData({
          title: '', description: '', dueDate: '', priority: 'Low',
          userFullName: '', userPhone: '', userEmail: '', status: 'New'
        });
        setIsEditing(true);
      }
    }
  }, [selectedTask, isOpen, initialEditMode]);

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Required';
    if (!formData.description.trim()) newErrors.description = 'Required';
    if (!formData.dueDate) newErrors.dueDate = 'Required';
    if (!formData.userFullName.trim()) newErrors.userFullName = 'Required';
    if (!formData.userEmail.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) newErrors.userEmail = 'Invalid email';
    if (!formData.userPhone.match(/^[0-9\-+]{9,15}$/)) newErrors.userPhone = 'Invalid phone';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleClose = () => {
    dispatch(clearSelectedTask());
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      if (selectedTask) {
        await dispatch(editTask({ id: selectedTask.id, task: formData })).unwrap();
      } else {
        await dispatch(addTask(formData)).unwrap();
      }
      handleClose();
    } catch (err) {
      console.error(err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={handleClose} type="button">
          <X size={18} />
        </button>

        <div className={styles.header}>
          <h2>{selectedTask ? (isEditing ? 'Edit Task' : 'Task Details') : 'Add New Task'}</h2>
          {selectedTask && !isEditing && (
            <button className={styles.editIconBtn} onClick={() => setIsEditing(true)} type="button">
              <Pencil size={18} /> Edit
            </button>
          )}
        </div>

        {apiError && <div className={styles.errorMsg}><AlertCircle size={14}/> {apiError}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Task Info</h3>
            <div className={styles.inputGroup}>
              <label>Title *</label>
              <input 
                className={errors.title ? styles.inputError : ''}
                type="text" disabled={!isEditing} value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Description *</label>
              <textarea 
                className={errors.description ? styles.inputError : ''}
                disabled={!isEditing} value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>
            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label>Due Date *</label>
                <input 
                  className={errors.dueDate ? styles.inputError : ''}
                  type="date" disabled={!isEditing} value={formData.dueDate}
                  onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Priority</label>
                <select disabled={!isEditing} value={formData.priority}
                  onChange={(e) => setFormData({...formData, priority: e.target.value})}>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div className={styles.inputGroup}>
                <label>Status</label>
                <select disabled={!isEditing} value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}>
                  <option value="New">New</option>
                  <option value="InProgress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Assignee Details</h3>
            <div className={styles.inputGroup}>
              <label>Full Name *</label>
              <input 
                className={errors.userFullName ? styles.inputError : ''}
                type="text" 
                disabled={!isEditing || !!selectedTask} 
                value={formData.userFullName}
                onChange={(e) => setFormData({...formData, userFullName: e.target.value})}
              />
            </div>
            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label>Phone *</label>
                <input 
                  className={errors.userPhone ? styles.inputError : ''}
                  type="tel" 
                  disabled={!isEditing || !!selectedTask} 
                  value={formData.userPhone}
                  onChange={(e) => setFormData({...formData, userPhone: e.target.value})}
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Email *</label>
                <input 
                  className={errors.userEmail ? styles.inputError : ''}
                  type="email" 
                  disabled={!isEditing || !!selectedTask} 
                  value={formData.userEmail}
                  onChange={(e) => setFormData({...formData, userEmail: e.target.value})}
                />
              </div>
            </div>
          </section>

          {isEditing && (
            <button type="submit" className={styles.submitBtn}>
              {selectedTask ? 'Save Changes' : 'Create Task'}
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default TaskModal;