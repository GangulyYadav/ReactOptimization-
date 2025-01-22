import React, { useEffect, useMemo, useRef, useState } from 'react'
import { memo } from 'react';

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
    const person = {
        firstName: 'Ganguly',
        lastName: 'Yadav',
        age: 23,
        contact: '9529493797'
    }




    const searchRef = useRef(null)

    useEffect(()=>{
        console.log("Page Loaded!")
        console.log('Searchref',searchRef)
    })

    const debounceCall = useMemo(() => debounce(handleChange, 1000),
        [])
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100vw' }}>
            <h1>Debouncing</h1>
            {/*
            Avoiding Inline Functions and Objects in JSX
            {
                person?.age
                } */}

            <input
                type="text"
                name="search"
                id="search"
                ref={searchRef}
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value)
                    debounceCall(e)
                }}
            />
        </div>
    )
}

export default memo(App)
// Using React.memo for Component Memoization