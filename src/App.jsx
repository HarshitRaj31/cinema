import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Movies from './pages/Movies'
import Login from './pages/Login'
import Register from './pages/Register'
import Booking from './pages/Booking'
import Theater from './pages/Theatre'
import SeatSelection from './pages/SeatSelection'
import Payment from './pages/Payment'
import BookingConfirmation from './pages/BookingConfirmation'
import BookingHistory from './pages/BookingHistory'
import AdminDashboard from './admin/AdminDashboard'
import ManageBookings from './admin/ManageBookings'
import ManageMovies from './admin/ManageMovies'
import ManageSeats from './admin/ManageSeats'
import ManageShows from './admin/ManageShows'
import ManageTheatres from './admin/ManageTheatres'
import Profile from './pages/Profile'
import AdminLogin from './admin/AdminLogin'
import Navbar from './components/Navbar'
import AdminNavbar from './admin/AdminNavbar'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/movies' element={<Movies/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/booking/:id' element={<Booking/>}/>
        <Route path='/theater/:id' element={<Theater/>}/>
        <Route path='/seats' element={<SeatSelection/>}/>
        <Route path='/payment' element={<Payment/>}/>
        <Route path='/booking-confirmation' element={<BookingConfirmation/>}/>
        <Route path='/booking-history' element={<BookingHistory/>}/>
         <Route path='/admin' element={<AdminDashboard/>}/>
         <Route path="/admin/bookings" element={<ManageBookings />}/>
         <Route path="/admin/movies" element={<ManageMovies />}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path="/admin/theatres"element={<ManageTheatres />}/>
          <Route path="/admin/shows"element={<ManageShows />}/>
          <Route path="/admin/seats"element={<ManageSeats />}/>
          <Route path='/admin-login' element={<AdminLogin/>}/>
          <Route path='/navbar' element={<Navbar/>}/>
           <Route path='/admin-navbar' element={<AdminNavbar/>}/>
      </Routes>
    </>
  )
}

export default App
