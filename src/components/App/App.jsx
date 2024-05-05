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

  const positiveFeedback =
    totalFeedback > 0 ? Math.round((values.good / totalFeedback) * 100) : 0;

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
      <Options nameButton={"Good"} onClick={() => updateFeedback("good")} />
      <Options
        nameButton={"Neutral"}
        onClick={() => updateFeedback("neutral")}
      />
      <Options nameButton={"Bad"} onClick={() => updateFeedback("bad")} />
      {totalFeedback > 0 && (
        <Options nameButton={"Reset"} onClick={resetFeedback} />
      )}
      {totalFeedback > 0 ? (
        <>
          <Feedback nameFeedback={"Good: "} valueFeedback={values.good} />
          <Feedback nameFeedback={"Neutral: "} valueFeedback={values.neutral} />
          <Feedback nameFeedback={"Bad: "} valueFeedback={values.bad} />
          <p>Total feedback: {totalFeedback}</p>
          <p>Positive feedback: {positiveFeedback}%</p>
        </>
      ) : (
        <Notification message="No feedback yet" />
      )}
    </div>
  );
}
