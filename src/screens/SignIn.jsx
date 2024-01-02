import { React, useState } from 'react'
import { signIn } from '../services/user.js'
import { useNavigate } from 'react-router-dom'
import cartoonpartimg from "./cartooparty.jpeg"
const SignIn = (props) => {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    isError: false,
    errorMsg: ""
  })

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    })
  }

  const onSignIn = async (event) => {
    event.preventDefault()
    const { setUser } = props
    try {
      const user = await signIn(form)
      setUser(user)
      navigate('/dionhp')
    } catch (error) {
      console.error(error)
      setForm({
        isError: true,
        errorMsg: 'Incorrect e-mail and/or password. Try again.',
        email: '',
        password: '',
      })
    }
  }

  const renderError = () => {
    const toggleForm = form.isError ? 'danger' : ''
    if (form.isError) {
      return (
        <button type='submit' className={toggleForm}>
          {form.errorMsg}
        </button>
      )
    } else {
      return <button type='submit'>Sign In</button>
    }
  }

  const { email, password } = form

  return (
    <div className='signUp/In image' style={{ 
      backgroundImage: `url(${cartoonpartimg })`,
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      backgroundRepeat: 'no-repeat',
      width: '100vw', 
      height: '100vh', 
      position: 'absolute', 
      top: '0',
      left: '0',
      overflow: 'hidden'}}>
    <div className='sign-up-in-form-container'>
      <div className='sign-up-in-box'>
      <h3>Sign In</h3>
      <form onSubmit={onSignIn}>
        <label>Email</label>
        
        <input
          required
          type='email'
          name='email'
          value={email}
          placeholder='Enter Email'
          onChange={handleChange}
        />
        
        <label>Password</label>
        <input
          required
          name='password'
          value={password}
          type='password'
          placeholder='Password'
          onChange={handleChange}
        />
       
        {renderError()}
      </form>
      
      </div>
      
    </div>
    </div>
  )
}

export default SignIn