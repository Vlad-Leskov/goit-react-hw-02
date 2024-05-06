// import css from "./Options.css";

export default function Options({ onClick }) {
  return (
    <div>
      <button onClick={() => onClick("good")}>Good</button>
      <button onClick={() => onClick("neutral")}>Neutral</button>
      <button onClick={() => onClick("bad")}>Bad</button>
    </div>
  );
}
