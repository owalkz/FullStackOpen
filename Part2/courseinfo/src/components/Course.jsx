import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const Course = ({ course }) => {
  return course.map((course) => (
    <div key={course.id}>
      <Header title={course.name} />
      <Content parts={course.parts} />
      <Total total={course.parts} />
    </div>
  ));
};

export default Course;
