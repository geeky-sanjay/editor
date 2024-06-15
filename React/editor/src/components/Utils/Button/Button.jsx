import styles from "./Button.module.css";

const { buttonContainer, buttonGray } = styles;

const Button = ({ onClick, children, ...rest }) => {
  return (
    <div className={buttonContainer}>
      <button className={buttonGray} {...rest} onClick={onClick}>
        {children}
      </button>
    </div>
  );
};

export default Button;
