import './App.css';
import React, { useState } from 'react';
import Questions from './Questions.js';

function App() {

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [startGame, setStartGame] = useState(false)
  const [questions, setQuestions] = useState([])
  const [score, setScore] = useState(0)
  const [errorMessage, setErrorMessage] = useState('')

  const findCorrectAnswer = question => {
    return question.choices.find(choice => choice.correct)
  }

  const answerQuestion = answer => {
    if (answer.correct) {
      setErrorMessage('')
      setScore(score + 1)
    } else {
      setErrorMessage(`Nesprávna odpoveď! Správna odpoveď je: ${findCorrectAnswer(questions[currentQuestion]).text}`)
      return
    }

    const nextQuestion = currentQuestion + 1
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion)
    } else {
      setErrorMessage(`Z ${questions.length} otázok bolo zodpovedaných správne ${score} otázok.`)
      setStartGame(false)
    }
  }

  const doStartGame = () => {
    setCurrentQuestion(0)
    setScore(0)
    setErrorMessage('')
    setQuestions(Questions.sort(() => 0.5 - Math.random()).slice(0, 60))
    setStartGame(true)
  }

  return (
    <div className="App">
        <main class="my-0 mx-auto max-w-3xl text-center">
        <h2 class="p-6 text-4xl">ŽSR Quiz</h2>
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
            </div>
            <br/>
            <br/>
            <div class="flex justify-center">
              <div class="w-220 rounded-lg border border-gray-200 text-gray-900">
            {
              questions[currentQuestion].choices.map((choice, index) => (
                <>
                  <button
                    key={index}
                    onClick={() => answerQuestion(choice)}
                    aria-current="true"
                    type="button"
                    class="
                      text-left
                      px-6
                      py-2
                      text-base
                      border-b border-gray-200
                      w-full
                      rounded-t-lg
                      bg-blue-600
                      text-white
                      cursor-pointer
                    "
                  >
                    {choice.text}
                  </button>
                </>
              ))
            }
              </div>
            </div>
          </>
          ) : (
            <>
              <button class="bg-sky-600 hover:bg-sky-700 px-5 py-3 text-white rounded-lg" onClick={() => doStartGame()}>Začni!</button>
            </>
          )}
      </main>
    </div>
  );
}

export default App;
