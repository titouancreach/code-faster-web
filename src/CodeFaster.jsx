import React, {useState, useMemo} from 'react'
import {useStopWatch} from './useStopWatch'

import {cx} from 'emotion'
import {useInputValue} from './useInputValue'

function firstMatchingChar(a, b) {
  if (a && a[0] && b && b[0] && a[0] === b[0]) {
    return 1 + firstMatchingChar(a.slice(1), b.slice(1))
  }
  return 0
}

function isLineValid(line) {
  return !!line
}

function getRandomLine(content) {
  const lines = content.split('\n')
  const line = lines[Math.floor(Math.random() * (lines.length - 1))]
  if (isLineValid(line)) {
    return line
  }
  return getRandomLine(content)
}

function splitText(text, n) {
  return [text.slice(0, n), text.slice(n)]
}

function CodeFaster({content, className}) {
  const [userInputValue, reset] = useInputValue()
  const [correct, setCorrect] = useState(0)
  const [total, setTotal] = useState(0)
  const [text, setText] = useState(getRandomLine(content))
  const [timerHasTimeout, setTimerHasTimeout] = useState(false)

  const remainingTime = useStopWatch(60, () => setTimerHasTimeout(true))

  const [first, rest] = useMemo(() => {
    const matchingChar = firstMatchingChar(userInputValue.value, text)
    return splitText(text, matchingChar)
  })

  const remainingChar = text.length - first.length

  const handleSubmit = e => {
    e.preventDefault()
    setText(getRandomLine(content))
    if (userInputValue.value === text) {
      setCorrect(correct + 1)
    }
    setTotal(total + 1)
    reset()
  }

  return (
    <div className={cx(className, 'bg-white shadow-2 pa4')}>
      <form onSubmit={handleSubmit}>
        <div className="f5">
          <code className="blue">{first}</code>
          <code>{rest}</code>
        </div>
        <input type="text" {...userInputValue} disabled={timerHasTimeout} />
        <button type="submit" className="ml2" disabled={timerHasTimeout}>
          Envoyer
        </button>
      </form>
      <div>
        Correct lines: {correct}/{total}
      </div>
      <div> Remaining chars: {remainingChar}</div>
      <div> Remaingin time: {remainingTime}</div>
    </div>
  )
}

export default CodeFaster
