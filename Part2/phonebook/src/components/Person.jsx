const Person = (props) => {
  return (
    <>
      <p>
        {props.name} {props.number}
      </p>
      <button onClick={props.deleteNote}>Delete</button>
    </>
  );
};

export default Person;
