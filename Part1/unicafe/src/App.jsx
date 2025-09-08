import { useState } from "react";

const Button = (props) => <button onClick={props.onClick}>{props.text}</button>;

const Statisticline = (props) => (
  <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </tr>
);

const Statistics = (props) => {
  if (props.all === 0) {
    return <p>No feedback given</p>;
  }
  return (
    <>
      <table>
        <tbody>
          <Statisticline text="good" value={props.good}></Statisticline>
          <Statisticline text="neutral" value={props.neutral}></Statisticline>
          <Statisticline text="bad" value={props.bad}></Statisticline>
          <Statisticline text="all" value={props.all}></Statisticline>
          <Statisticline text="average" value={props.average}></Statisticline>
          <Statisticline
            text="positive"
            value={props.positive + "%"}
          ></Statisticline>
        </tbody>
      </table>
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [total, setTotal] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(() => new Uint8Array(8));
  const [maxVotes, setMaxVotes] = useState(0);

  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const increaseGood = () => {
    let newGood = good + 1;
    let newTotal = total + 1;
    let newAll = all + 1;
    setTotal(newTotal);
    setAll(newAll);
    setGood(newGood);
    if (newAll === 0) {
      setAverage(0);
      return;
    }
    let newAverage = newTotal / newAll;
    let newPositive = (newGood / newAll) * 100;
    setPositive(newPositive);
    setAverage(newAverage);
  };

  const increaseNeutral = () => {
    let newNeutral = neutral + 1;
    let newAll = all + 1;
    setNeutral(newNeutral);
    setAll(newAll);
    if (all === 0) {
      setAverage(0);
      return;
    }
    setAverage(total / newAll);
    let newPositive = (good / newAll) * 100;
    setPositive(newPositive);
  };

  const increaseBad = () => {
    let newBad = bad + 1;
    let newAll = all + 1;
    let newTotal = total - 1;
    setAll(newAll);
    setTotal(newTotal);
    setBad(newBad);
    if (all === 0) {
      setAverage(0);
      return;
    }
    setAverage(newTotal / newAll);
    let newPositive = (good / newAll) * 100;
    setPositive(newPositive);
  };

  const changeAnecdote = () => {
    let newPosition = Math.floor(Math.random() * anecdotes.length);
    setSelected(newPosition);
  };

  const voteForAnecdote = () => {
    let newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
    const max = Math.max(...newVotes);
    setMaxVotes(newVotes.findIndex((num) => num === max));
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={increaseGood} text="good"></Button>
      <Button onClick={increaseNeutral} text="neutral"></Button>
      <Button onClick={increaseBad} text="bad"></Button>
      <h1>statistics</h1>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive}
      ></Statistics>
      <div>
        <h1>Anecdote of the day</h1>
        {anecdotes[selected]}
        <br></br>has {votes[selected]} votes
      </div>
      <Button onClick={voteForAnecdote} text="vote"></Button>
      <Button onClick={changeAnecdote} text="next anecdote"></Button>
      <h1>Anecdote with Most Votes</h1>
      {anecdotes[maxVotes]}
      <br></br>has {votes[maxVotes]} votes
    </div>
  );
};

export default App;
