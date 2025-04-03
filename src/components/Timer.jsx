import { useEffect } from 'react';

export default function Timer({ secondsRemaining, dispatch }) {
  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  useEffect(
    function () {
      const timer = setInterval(() => {
        dispatch({ type: 'tick' });
      }, 1000);

      return function () {
        clearInterval(timer);
      };
    },
    [secondsRemaining, dispatch]
  );

  return (
    <p className="timer">
      {mins < 10 && '0'}
      {mins}:{seconds < 10 && '0'}
      {seconds}
    </p>
  );
}
