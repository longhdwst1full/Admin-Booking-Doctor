export { default as useColorMode } from './useColorMode'
export { default as useLocalStorage } from './useLocalStorage'
export { default as useScrollLock } from './useScrollLock'

import { useCallback, useEffect } from 'react'

export const useDebounce = (effect: () => void, dependencies: any, delay: number) => {
  const callback = useCallback(effect, dependencies)

  useEffect(() => {
    const timeout = setTimeout(callback, delay)
    return () => clearTimeout(timeout)
  }, [callback, delay])
}
