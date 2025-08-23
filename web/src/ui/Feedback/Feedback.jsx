import styles from "./Feedback.module.css";

export const Feedback = ({ variant, children }) => {
  return (
    <div role="alert" className={styles[variant]}>
      {children}
    </div>
  );
};
