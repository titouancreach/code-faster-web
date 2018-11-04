import {useState} from 'react'

export function useInputValue() {
  const [inputValue, setInputValue] = useState('')

  const handleChange = e => {
    setInputValue(e.target.value)
  }

  const reset = () => setInputValue('')

  return [
    {
      onChange: handleChange,
      value: inputValue,
    },
    reset,
  ]
}
