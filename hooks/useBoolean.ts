import { useState } from 'react'

export const useBoolean = (initialValue: boolean) => {
  const [value, setValue] = useState(initialValue)

  const setFalse = () => setValue(false)
  const setTrue = () => setValue(true)

  return {
    value,
    setFalse,
    setTrue,
  }
}
