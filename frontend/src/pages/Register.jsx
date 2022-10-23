import { useState, useEffect } from "react"
import { FaUser } from 'react-icons/fa'

//Get Something from state, Call any fun  
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { toast } from "react-toastify"
import { register, reset } from "../features/auth/authSlice"
import Spinner from '../components/Spinner'

export default function Register() {

  const [formData, setFormData] = useState({
    username:'',
    email:'',
    password:'',
    confirmPassword:''
  })

  const { username, email, password, confirmPassword } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )
  

  useEffect(() => {

    if(isError){
      toast.error(message)
    }

    if(isSuccess || user){
      navigate('/')
    }
    
     dispatch(reset())

  }, [user, isError, isSuccess, message, navigate, dispatch])

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

    if( password !== confirmPassword ){
      toast.error('Password does not match!')
    }else{
      const userData = {
        username,
        email,
        password,
      }

      dispatch(register(userData))
    }
  }

  if(isLoading) {
    return <Spinner />
  }
  
    return (
      <>
      <section className='heading'>
        <h1>
          <FaUser/> Register</h1>
        <p>Register Yourself</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input type='text' className='form-control' name="username" id="username" 
              onChange={onChange} value={username} placeholder='Enter your name' />
          </div>
          <div className="form-group">
            <input type='email' className='form-control' name="email" id="email" 
              onChange={onChange} value={email} placeholder='Enter your email' />
          </div>
          <div className="form-group">
            <input type='password' className='form-control' name="password" id="password" 
              onChange={onChange} value={password} placeholder='Enter your password' />
          </div>
          <div className="form-group">
            <input type='password' className='form-control' name="confirmPassword" id="confirmPassword" 
              onChange={onChange} value={confirmPassword} placeholder='Confirm password' />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">Register</button>
          </div>
        </form>

      </section>
      </>
      
    )
  }
  