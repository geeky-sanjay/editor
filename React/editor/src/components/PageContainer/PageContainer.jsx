import styles from "./PageContainer.module.css";

const { pageContainer } = styles;

export const PageContainer = ({ children }) => {
  return <div className={pageContainer}>{children}</div>;
};

export default PageContainer;
