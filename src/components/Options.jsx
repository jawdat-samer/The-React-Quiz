export default function Options({ question, dispatch, answer }) {
  const hasAnswerd = answer !== null;

  function handleAnswer(answer) {
    dispatch({ type: 'newAnswer', payload: answer });
  }

  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${hasAnswerd && index === answer ? 'answer' : ''} ${
            hasAnswerd ? (hasAnswerd && index === question.correctOption ? 'correct' : 'wrong') : ''
          }`}
          onClick={() => handleAnswer(index)}
          disabled={hasAnswerd}
          key={option}>
          {option}
        </button>
      ))}
    </div>
  );
}
