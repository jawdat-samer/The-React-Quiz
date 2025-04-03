export default function NextButton({ index, numQuestions, dispatch }) {
  function handleNextQuestion() {
    dispatch({ type: 'nextQuestion' });
  }

  function handleFinishQuiz() {
    dispatch({ type: 'finish' });
  }

  if (index === numQuestions - 1) {
    return (
      <button className="btn btn-ui" onClick={handleFinishQuiz}>
        Finish
      </button>
    );
  }

  return (
    <button className="btn btn-ui" onClick={handleNextQuestion}>
      Next
    </button>
  );
}
