import styles from './LoadingSpinner.module.css';

const LoadingSpinner = () => {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.loader}></div>
      <p>Loading Tasks...</p>
    </div>
  );
};

export default LoadingSpinner;