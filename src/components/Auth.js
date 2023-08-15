import React from 'react'
import { useState } from "react";
import { useCookies } from 'react-cookie'

const Auth = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['email', 'token'])
  const [error, setError] = useState(null)
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState(null)
  const [isLogIn, setIsLogIn] = useState(true)

  // console.log(email, password, confirmPassword)
  // console.log('cookies:', cookies)

  const viewLogin = (status) => {
    setError(null)
    setIsLogIn(status)
  }

  const handleSubmit = async (e, endpoint) => {
    e.preventDefault()
    if (!isLogIn && password !== confirmPassword) {
      setError('Make sure passwords match!')
      return
    }
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/${endpoint}`, {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        // credentials: 'include',
        body: JSON.stringify({email, password})
      })
      const data = await response.json()
      console.log('data ', data.message)
      if (data.message) {
        setError(data.message)
      } else {
        if (data.email && data.token) {
          console.log(data.email)
          setCookie('Email', data.email)
          setCookie('AuthToken', data.token)
        }
      }
    } catch (error) {
      console.error(error)
    }
  }




    return (
      <div className="auth-container">
        <div className="auth-container-box">
          <form title='login'>
            <h2 title='header' >{isLogIn ? 'Please log in' : 'Please sign up'}</h2>
            <input 
            type="email" 
            placeholder="email" 
            name='emailInput'
            onChange={(e) => setEmail(e.target.value)} 
            />
            <input 
            type="password" 
            placeholder="password" 
            onChange={(e) => setPassword(e.target.value)}
            /> 
            {!isLogIn && <input 
            type="password" 
            placeholder="confirm password" 
            onChange={(e) => setConfirmPassword(e.target.value)}
            />}
            <input 
            type="submit" 
            className="create"
            data-testid="submit" 
            value={isLogIn ? 'Log in' : 'Sign up'} 
            onClick={(e) => handleSubmit(e, isLogIn ? 'auth/login' : 'auth/signup')} 
            />
          </form>
          <div className="error-container">
            {error && 
            <p className="display-auth-error" data-testid="error">
              {error}  
            </p>}
          </div>
          <div className="auth-options">
            <button 
            onClick={() => viewLogin(false)}
            style={{backgroundColor : !isLogIn ? 'rgb(255, 255, 255)' : 'rgb(188, 188, 188)'}}
            >Sign up</button>
            <button 
            onClick={() => viewLogin(true)}
            style={{backgroundColor : !isLogIn ? 'rgb(255, 255, 255)' : 'rgb(188, 188, 188)'}}
            >Log in</button>
          </div>
        </div>
      </div>
    );
  }
  
  export default Auth;
  

