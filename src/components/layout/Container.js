import styles from './Container.module.css';

function Container({ customClass, children }) {
  return (
    <div className={`${styles.container} ${customClass ? styles[customClass] : ''}`}>
      {children}
    </div>
  );
}

export default Container;
