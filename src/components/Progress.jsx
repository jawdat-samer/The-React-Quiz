export default function Progress({ index, answer, numQuestions, points, maxPossiblePoints }) {
  return (
    <header className="progress">
      <progress max={numQuestions} value={index + Number(answer !== null)}></progress>

      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>

      <p>
        <strong>{points}</strong> / {maxPossiblePoints} Points
      </p>
    </header>
  );
}
