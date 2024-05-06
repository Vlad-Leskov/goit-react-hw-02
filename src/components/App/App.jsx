import css from "./App.module.css";
import Description from "../Description/Description";
import Options from "../Options/Options";
import Feedback from "../Feedback/Feedback";
import { useState } from "react";
import { useEffect } from "react";
import Notification from "../Notification/Notification";

export default function App() {
  const initialState = () => {
    const savedState = localStorage.getItem("feedbackState");
    return savedState
      ? JSON.parse(savedState)
      : { good: 0, neutral: 0, bad: 0 };
  };

  const [values, setValues] = useState(initialState);

  useEffect(() => {
    localStorage.setItem("feedbackState", JSON.stringify(values));
  }, [values]);

  const updateFeedback = (feedbackType) => {
    setValues({
      ...values,
      [feedbackType]: values[feedbackType] + 1,
    });
  };

  const totalFeedback = values.good + values.neutral + values.bad;

  const positiveFeedback = Math.round((values.good / totalFeedback) * 100);

  const resetFeedback = () => {
    setValues({
      good: 0,
      neutral: 0,
      bad: 0,
    });
  };

  return (
    <div className={css.container}>
      <Description />
      <Options onClick={updateFeedback} />
      {totalFeedback > 0 && <button onClick={resetFeedback}>Reset</button>}
      {totalFeedback > 0 ? (
        <Feedback
          goodFeedback={values.good}
          neutralFeedback={values.neutral}
          badFeedback={values.bad}
          totalFeedback={totalFeedback}
          positiveFeedback={positiveFeedback}
        />
      ) : (
        <Notification message="No feedback yet" />
      )}
    </div>
  );
}
