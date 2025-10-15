const Notification = ({ message, type }) => {
  if (!message) return null;
  return <div className={type === "good" ? "error" : "bad"}>{message}</div>;
};

export default Notification;
