export default function RestartButton({ dispatch }) {
  function handleRestartQuiz() {
    dispatch({ type: 'restart' });
  }

  return (
    <button className="btn btn-ui" onClick={handleRestartQuiz}>
      Restart Quiz
    </button>
  );
}
