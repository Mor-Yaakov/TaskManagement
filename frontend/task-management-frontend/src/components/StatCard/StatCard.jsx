import { ClipboardList, Clock, CheckCircle2 } from 'lucide-react';
import styles from './StatCard.module.css';

const StatCard = ({ label, value, type }) => {
  const getIcon = () => {
    // הוספת ה-className ישירות לאייקון
    const iconProps = { size: 32, strokeWidth: 2.5, className: styles.icon };
    
    switch (type) {
      case 'total': return <ClipboardList {...iconProps} />;
      case 'pending': return <Clock {...iconProps} />;
      case 'completed': return <CheckCircle2 {...iconProps} />;
      default: return null;
    }
  };

  return (
    <div className={`${styles.card} ${styles[type]}`}>
      <div className={styles.iconWrapper}>
        {getIcon()}
      </div>
      <span className={styles.label}>{label}</span>
      <div className={styles.value}>{value}</div>
    </div>
  );
};

export default StatCard;