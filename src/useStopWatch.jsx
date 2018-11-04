import {useState, useEffect} from 'react'

export function useStopWatch(initialValue, callback) {
  const [remainingTime, setRemainingTime] = useState(initialValue)
  const [remainingTimeDisplayed, setRemainingTimeDisplayed] = useState(
    initialValue
  )

  useEffect(
    () => {
      const timer = setInterval(() => {
        if (remainingTime <= 1) {
          setRemainingTimeDisplayed(remainingTime - 1)
          callback()
          clearInterval(timer)
          return
        }
        setRemainingTime(remainingTime - 1)
        setRemainingTimeDisplayed(remainingTime - 1)
      }, 1000)
      return () => {
        clearInterval(timer)
      }
    },
    [remainingTime]
  )
  return remainingTimeDisplayed
}
