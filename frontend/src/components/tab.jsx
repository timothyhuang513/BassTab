import styles from "./tab.module.css";

export function Tab() {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Tablature</h3>
      <div className={styles.tabContainer}>
        <pre className={styles.tabContent}>
          {`G|----------------|----------------|----------------|----------------|
D|----------------|----------------|----------------|----------------|
A|----------------|----------------|----------------|----------------|
E|----------------|----------------|----------------|----------------|`}
        </pre>
      </div>
    </div>
  );
}
