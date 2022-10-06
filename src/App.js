import './App.css';
import React, { useState } from 'react';

function App() {

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [startGame, setStartGame] = useState(false)
  const [questions, setQuestions] = useState([])
  const [score, setScore] = useState(0)
  const [errorMessage, setErrorMessage] = useState('')
  const [showAnswer, setShowAnswer] = useState(false)
  const [questionCount, setQuestionCount] = useState(40)

  const answerQuestion = answer => {
    if (showAnswer) return
    if (answer.correct) {
      setErrorMessage('')
      setScore(score + 1)
    }

    setShowAnswer(true)
  }

  const setUpQuestion = q => {
    setCurrentQuestion(q)
    questions[q].choices.sort(() => 0.5 - Math.random())
  }

  const doStartGame = (path) => {
    const genrand = require('random-seed').create(new Date())
    setScore(0)
    setShowAnswer(false)
    setErrorMessage('')
    setQuestions((require(`./${path}`)).sort(() => 0.5 - genrand.floatBetween(0.0,1.0)).slice(0, questionCount))
    setStartGame(true)
    setUpQuestion(0)
  }

  const doNextQuestion = () => {
    const nextQuestion = currentQuestion + 1
    if (nextQuestion < questions.length) {
      setUpQuestion(nextQuestion)
    } else {
      setErrorMessage(`Z ${questions.length} otázok bolo zodpovedaných správne ${score} (${(score/questions.length) * 100.0}%) otázok. ${(score / questions.length < 0.75) ? "To si dojebal!" : "Gratulujem!"}`)
      setStartGame(false)
    }

    setShowAnswer(false)
  }

  return (
    <div className="App">
        <main class="my-0 mx-auto max-w-screen-lg text-center">
        <h2 class="p-6 text-4xl">{startGame ? (`Skóre: ${score}`) : ("Quiz")}</h2>
        {errorMessage.length ? (
        <div class="bg-blue-100 rounded-lg py-5 px-6 mb-4 text-base text-blue-700 mb-3" role="alert">
          Hláška: {errorMessage}
        </div>
        ) : null}

        {startGame ? (
          <>
            <div class="p-6 shadow-lg rounded-lg bg-gray-100 text-gray-700">
              <p>Otázka {currentQuestion + 1} z {questions.length}</p>
              <p class="text-base font-bold">{questions[currentQuestion].question}</p>
              <div class="flex justify-center mt-6">
                {questions[currentQuestion].image ? (
                  <img src={questions[currentQuestion].image} alt="Obrázok" class="my-6" />
                ) : null}
              </div>
            </div>
            <br/>
            <div class="flex justify-center space-y-2 flex-col">
            {
              questions[currentQuestion].choices.map((choice, index) => (
                choice.text === '-' ? null : (
                <div>
                  <button
                    key={index}
                    onClick={() => answerQuestion(choice)}
                    class={"text-sm p-1 hover:brightness-110 w-full rounded-lg text-white "+(showAnswer && choice.correct ? 'bg-green-700' : showAnswer ? 'bg-red-700' : 'bg-blue-700')}>
                    {choice.text}
                  </button>
                </div>
                )))
            }
            </div>
            <div>
            { showAnswer ? (<button class="bg-green-700 hover:brightness-110 px-5 my-8 py-5 text-white rounded-lg" onClick={() => doNextQuestion()}>Pokračuj!</button>) : null }
            </div>
          </>
          ) : (<>
            <div class="flex flex-wrap justify-center">
              <div class="flex md:w-1/3 mb-6 md:mb-0 items-center justify-center">
                <label class="uppercase tracking-wide text-white-700 text-xs font-bold mb-2" for="pocet-otazok">
                  Počet otázok
                </label>
                <input class="appearance-none w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="pocet-otazok" type="text" placeholder="40" onChange={e => setQuestionCount(e.target.value)}/>
              </div>
              <button class="bg-sky-600 hover:brightness-110 px-5 py-3 m-8 text-white rounded-lg" onClick={() => doStartGame('zsr.js')}>Začni ŽSR!</button>
              <button class="bg-sky-600 hover:brightness-110 px-5 py-3 m-8 text-white rounded-lg" onClick={() => doStartGame('ze.js')}>Začni ZE!</button>
            </div>
          </>)}
      </main>
    </div>
  );
}

export default App;
