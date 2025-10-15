const Filter = (props) => {
  return (
    <>
      filter shown
      <input value={props.value} onChange={props.onChange} />
    </>
  );
};

export default Filter;
