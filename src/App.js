import './App.css';
import React, { useState } from 'react';

function App() {

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [startGame, setStartGame] = useState(false)
  const [questions, setQuestions] = useState([])
  const [score, setScore] = useState(0)
  const [errorMessage, setErrorMessage] = useState('')
  const [showAnswer, setShowAnswer] = useState(false)

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

  const doStartGame = path => {
    setScore(0)
    setShowAnswer(false)
    setErrorMessage('')
    setQuestions((require(`./${path}`)).sort(() => 0.5 - Math.random()).slice(0, 60))
    setStartGame(true)
    setUpQuestion(0)
  }

  const doNextQuestion = () => {
    const nextQuestion = currentQuestion + 1
    if (nextQuestion < questions.length) {
      setUpQuestion(nextQuestion)
    } else {
      setErrorMessage(`Z ${questions.length} otázok bolo zodpovedaných správne ${score} otázok.`)
      setStartGame(false)
    }

    setShowAnswer(false)
  }

  return (
    <div className="App">
        <main class="my-0 mx-auto max-w-3xl text-center">
        <h2 class="p-6 text-4xl">Quiz</h2>
        {errorMessage.length ? (
        <div class="bg-blue-100 rounded-lg py-5 px-6 mb-4 text-base text-blue-700 mb-3" role="alert">
          Hláška: {errorMessage}
        </div>
        ) : null}

        {startGame ? (
          <>
            <div class="p-6 shadow-lg rounded-lg bg-gray-100 text-gray-700">
              <h2 class="font-semibold text-3xl mb-5">Priebeh Quizu</h2>
              <p class="text-lg">
                Skóre: {score}
              </p>
              <hr class="my-6 border-gray-300" />
              <p>Otázka {currentQuestion + 1}</p>
              <p class="text-2xl">{questions[currentQuestion].question}</p>
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
                <div>
                  <button
                    key={index}
                    onClick={() => answerQuestion(choice)}
                    class={"text-base h-full p-10 hover:brightness-110 w-full rounded-lg text-white "+(showAnswer && choice.correct ? 'bg-green-700' : showAnswer ? 'bg-red-700' : 'bg-blue-700')}>
                    {choice.text}
                  </button>
                </div>
              ))
            }
            </div>
            <div>
            { showAnswer ? (<button class="bg-green-700 hover:brightness-110 px-5 my-8 py-5 text-white rounded-lg" onClick={() => doNextQuestion()}>Pokračuj!</button>) : null }
            </div>
          </>
          ) : (
            <div class="flex justify-center">
              <button class="bg-sky-600 hover:brightness-110 px-5 py-3 m-8 text-white rounded-lg" onClick={() => doStartGame('zsr.js')}>Začni ŽSR!</button>
              <button class="bg-sky-600 hover:brightness-110 px-5 py-3 m-8 text-white rounded-lg" onClick={() => doStartGame('ze.js')}>Začni ŽE!</button>
            </div>
          )}
      </main>
    </div>
  );
}

export default App;
