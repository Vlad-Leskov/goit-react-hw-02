// import css from "./Feedback.css";
export default function Feedback({
  goodFeedback,
  neutralFeedback,
  badFeedback,
  totalFeedback,
  positiveFeedback,
}) {
  return (
    <>
      <p>Good: {goodFeedback}</p>
      <p>Neutral: {neutralFeedback}</p>
      <p>Bad: {badFeedback}</p>
      <p>Total feedback: {totalFeedback}</p>
      <p>Positive feedback: {positiveFeedback}%</p>
    </>
  );
}
