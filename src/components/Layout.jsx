import { useLocation } from 'react-router-dom'
import { Navbar } from './Navbar'

export function Layout({ children }) {
  const location = useLocation()
  const showNavbar = location.pathname !== '/game'
  
  return (
    <>
      {showNavbar && <Navbar />}
      {children}
    </>
  )
} 