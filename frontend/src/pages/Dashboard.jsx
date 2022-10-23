import { useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Dashboard() {

  const navigate = useNavigate()

  const { user } = useSelector((state) => state.auth )

  useEffect( () => {
    if(!user) {
      navigate('/login')
    }
  }, [user, navigate])

    return (
      <>
      <section className='heading'>
        <h1>Welcome {user && user.data.username}</h1>
        <p>Dashboard</p>
      </section>
      </>
    )
  }
  