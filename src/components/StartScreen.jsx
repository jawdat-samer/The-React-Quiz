export default function StartScreen({ numQuestions, dispatch }) {
  function handleStartQuiz() {
    dispatch({ type: 'start' });
  }

  return (
    <div className="start">
      <h2>Welcome The to React Quiz!</h2>
      <h3>{numQuestions} questions to test your React mastery</h3>
      <button className="btn btn-ui" onClick={handleStartQuiz}>
        Let's start
      </button>
    </div>
  );
}
