import{ useEffect, useState } from 'react'

const useLocalStorage = (key, initialValue) => {
    const [value, setValue] = useState(() => {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : initialValue;
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    },[value])


  return [value, setValue]
  
}

export default useLocalStorage