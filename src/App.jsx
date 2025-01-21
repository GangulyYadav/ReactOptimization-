import React, { useMemo, useState } from 'react'


const handleChange = (e) => {
    console.log(e.target.value);
}

const debounce = (func, wait) => {
    let timerID;// undefined 
    return (...args) => {
        clearTimeout(timerID)
        timerID = setTimeout(() => {
            func(...args)
        }, wait)
    }
}



function App() {
    const [search, setSearch] = useState('')

    const debounceCall = useMemo(() => debounce(handleChange, 1000),
        [])
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100vw' }}>
            <h1>Debouncing</h1>
            <input
                type="text"
                name="search"
                id="search"
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value)
                    debounceCall(e)
                }}
            />
        </div>
    )
}

export default App