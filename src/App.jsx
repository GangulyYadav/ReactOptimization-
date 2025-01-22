import React, { useEffect, useRef, useState } from 'react'

function App() {
    const [password, setpassword] = useState('')
    const [isVisible, setIsVisible] = useState(false)

    const passwordRef = useRef(null)
    const password2Ref = useRef(null)

    useEffect(() => {
        // console.log("Page Loaded!")
        // console.log('passwordref', passwordRef)
        // console.log('password2ref', password2Ref)
        if (passwordRef.current.type == 'password') {
            passwordRef.current.type = 'text'
        } else {
            passwordRef.current.type = 'password'
        }
        // console.log(passwordRef.current.type)
        // console.log(passwordRef.current.type)
    }, [isVisible])

    console.log('Hi')


    const checkPassword = () => {
        if (password2Ref.current.value == passwordRef.current.value) {
            // console.log('style',password2Ref.current.style)
            password2Ref.current.style.border = '4px solid green'
            // password2Ref.current.style.borderColor = 'green'
            console.log('Hurrey')
            // password2Ref.current.style.borderColor = 'green'
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100vw', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
            {/* <label htmlFor="">Password</label>
            <input
                type="password"
                name="password"
                id="password"
                ref={passwordRef}
                // value={password}
                onChange={(e) => {
                    // setpassword(e.target.value)
                    passwordRef.current.value = e.target.value
                }}
            /> */}

            <label htmlFor="pass1">Password</label>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: 200 }}>




                <input
                    type="password"
                    name="password"
                    id="pass1"
                    ref={passwordRef}
                    // value={password}
                    onChange={(e) => {
                        // setpassword(e.target.value)
                        passwordRef.current.value = e.target.value


                    }}
                />

                {
                    isVisible ?
                        <button onClick={() => setIsVisible(false)}>
                            <i class="fa-solid fa-eye"></i>
                        </button>
                        :
                        <button onClick={() => setIsVisible(true)}>
                            <i class="fa-solid fa-eye-slash"></i>
                        </button>
                }

            </div>
            <br /><br />
            <label htmlFor="pass2">Confirm Password</label>
            <input
                type="password"
                name="password2"
                id="pass2"
                ref={password2Ref}
                // value={password}
                onChange={(e) => {
                    // setpassword(e.target.value)

                    password2Ref.current.value = e.target.value
                    checkPassword()
                }}
            />

            {(password2Ref.current.value == passwordRef.current.value) && <p style={{ color: 'green', fontWeight: 'bold' }}>Password Matched ✅</p>}
        </div>
    )
}

export default App