import { useEffect, useReducer } from 'react';

import Main from './components/Main';
import Header from './components/Header';
import Loader from './components/Loader';
import Error from './components/Error';
import StartScreen from './components/StartScreen';
import Questions from './components/Questions';
import NextButton from './components/NextButton';
import Progress from './components/Progress';
import FinishScreen from './components/FinishScreen';
import RestartButton from './components/RestartButton';
import Footer from './components/Footer';
import Timer from './components/Timer';

const SECS_PER_QUESTIONS = 30;

const initialState = {
  questions: [],
  // 'loading', 'error', 'ready', 'active', 'finished'
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  let question = null;

  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload, status: 'ready' };
    case 'dataFailed':
      return { ...state, status: 'error' };
    case 'start':
      return { ...state, status: 'active', secondsRemaining: state.questions.length * SECS_PER_QUESTIONS };
    case 'newAnswer':
      question = state.questions[state.index];
      return {
        ...state,
        answer: action.payload,
        points: action.payload === question.correctOption ? state.points + question.points : state.points,
      };
    case 'nextQuestion':
      return { ...state, index: state.index + 1, answer: null };
    case 'finish':
      return {
        ...state,
        status: 'finished',
        highscore: state.points > state.highscore ? state.points : state.highscore,
      };
    case 'restart':
      return { ...state, status: 'ready', index: 0, answer: null, points: 0, secondsRemaining: 10 };
    case 'tick':
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining <= 0 ? 'finished' : state.status,
      };
    default:
      throw new Error('Action unknown');
  }
}

export default function App() {
  const [{ questions, status, index, answer, points, highscore, secondsRemaining }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((acc, cur) => acc + cur.points, 0);

  useEffect(function () {
    const controller = new AbortController();
    async function getQuestions() {
      try {
        const res = await fetch('http://localhost:8000/questions', controller.signal);
        const data = await res.json();

        dispatch({ type: 'dataReceived', payload: data });
      } catch (err) {
        console.log(err);

        dispatch({ type: 'dataFailed' });
      }
    }

    getQuestions();

    return function () {
      controller.abort();
    };
  }, []);

  return (
    <div className="app">
      <Header />

      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && questions.length > 0 && <StartScreen numQuestions={numQuestions} dispatch={dispatch} />}
        {status === 'active' && (
          <>
            <Progress
              index={index}
              answer={answer}
              numQuestions={numQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
            />
            <Questions question={questions[index]} dispatch={dispatch} answer={answer} />
            <Footer>
              {answer !== null && <NextButton index={index} numQuestions={numQuestions} dispatch={dispatch} />}
              <Timer secondsRemaining={secondsRemaining} dispatch={dispatch} />
            </Footer>
          </>
        )}
        {status === 'finished' && (
          <>
            <FinishScreen points={points} maxPossiblePoints={maxPossiblePoints} highscore={highscore} />
            <RestartButton dispatch={dispatch} />
          </>
        )}
      </Main>
    </div>
  );
}
