import { useState, useCallback } from 'react'
import axios from 'axios'

export const useAxios = () => {
  const [ loading, setLoading ] = useState(false)
  const [ error, setError ] = useState(null)
  const request = useCallback(async (url, method = 'GET', body, headers) => {
    setLoading(true)
    try {
      const response =  await axios({
        url, method,
        data: body, headers
      })
      const data = response.data

      if (response.statusText !== 'OK') {
        setError(data.message)
        throw new Error(data.message || 'Что-то пошло не так')
      }

      setLoading(false)

      return response
    } catch (err) {
      setError(err.message)
      setLoading(false)
      throw err
    }
    // eslint-disable-next-line
  }, [loading])

  const clearEror = useCallback(() => {
    setError(null)
  }, [])

  return { loading, request, error, clearEror }
}