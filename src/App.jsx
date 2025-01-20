import { useCallback, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const debounce = (func, duration) => {
  let timer;
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func(...args);
    }, duration)
  }
}

const throttle = (func, duration) => {
  let lastFunc;
  let lastRan;

  return (...args) => {   // how to pass multi argument 
    const context = this;  // what is this
    if (!lastRan) {
      func.apply(context, args);    // apply and bind
      lastRan = Date.now()
    } else {
      clearTimeout(lastFunc)
      lastFunc = setTimeout(() => {
        if (Date.now() - lastRan >= duration) {
          func.apply(context, args)
          lastRan = Date.now();
        }
      }, duration - (Date.now() - lastRan))
      // 5         -     5 22:06  - 22:05   = 1
    }
  }
}



function App() {
  const [search, setSearch] = useState('')

  const handleSearch = (query) => {
    console.log("API Call for query:", query)
  }

  const debounceSearch = useCallback(
    debounce(handleSearch, 1000),
    [])


  const handleChange = (e) => {
    setSearch(e.target.value)
    debounceSearch(e.target.value)
    // handleSearch(e.target.value)
  }


  const logScrollPosition = () => {
    console.log("Scroll position:", window.scrollY)
  }

  useEffect(() => {
    const throttledScroll = throttle(logScrollPosition, 1000);
    window.addEventListener("scroll", throttledScroll)

    return () => {
      window.removeEventListener("scroll", throttledScroll)
    }
  }, [])
  return (
    <div style={{ height: "400vh" }}>
      <h2>Debounce Example</h2>
      <input
        type="text"
        name="search"
        id="search"
        value={search}
        placeholder='Search here....'
        onChange={handleChange}
      />
      <p>Scroll to check</p>
    </div>
  )
}

export default App
