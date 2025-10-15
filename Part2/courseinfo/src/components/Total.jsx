const Total = ({ total }) => {
  const exercisesTotal = total.reduce((sum, part) => sum + part.exercises, 0);
  return <p>Number of exercises {exercisesTotal}</p>;
};

export default Total;
