import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import {Link} from 'react-router-dom'

export default function Header() {
  return (
    <header className='header'>
        <div className='logo'>
            <Link to='/'> TeamWork</Link>
        </div>
        <ul>
            <li>
                <Link to='/login'>
                    <FaSignInAlt /> Login 
                </Link>
                <Link to='/Register'>
                    <FaSignOutAlt /> Logut 
                </Link>
                <Link to='/Register'>
                    <FaUser /> Register 
                </Link>
            </li>
        </ul>
    </header>
  )
}
