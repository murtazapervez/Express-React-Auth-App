import { useState, useEffect } from "react"
import { FaSignInAlt } from 'react-icons/fa'

export default function Login() {

  const [formData, setFormData] = useState({
    email:'',
    password:'',
  })

  const onChange = (e) => {
    setFormData(
      (prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    })
    )
  }
  const onSubmit = (e) => {
    e.preventDefault()
  }


  const { email, password } = formData;
    return (
      <>
      <section className='heading'>
        <h1>
          <FaSignInAlt/> Login</h1>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          
          <div className="form-group">
            <input type='email' className='form-control' name="email" id="email" 
              onChange={onChange} value={email} placeholder='Enter your email' />
          </div>
          <div className="form-group">
            <input type='password' className='form-control' name="password" id="password" 
              onChange={onChange} value={password} placeholder='Enter your password' />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">Register</button>
          </div>
        </form>

      </section>
      </>
      
    )
  }
  