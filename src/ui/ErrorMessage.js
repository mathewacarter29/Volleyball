function ErrorMessage(props) {
  const style = {
    color: "darkred",
    backgroundColor: "salmon",
  };
  return (
    <div style={style}>
      <h4>Error: {props.title}</h4>
      <p>{props.message}</p>
    </div>
  );
}

export default ErrorMessage;
