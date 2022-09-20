import React from 'react'
import { BrowserRouter, Routes, Route,NavLink} from 'react-router-dom'
import Form from './Form'
import ListSales from './ListSales'
export default function Navigation() {
  return (
    <div>
        <BrowserRouter>
            <div className='header'>
                <NavLink className="links" to='/'>Home</NavLink>
                <NavLink className="links" to='/Sales'>Sales List</NavLink>
                <NavLink className="links">Login</NavLink>
                
            </div>
            <div className="content">
              <Routes>
              <Route exact path="/" element={<Form/>} />
              {/* <Route path="/login" element={<Login/>} /> */}
              <Route path="/Sales" element={<ListSales/>} />
              </Routes>
            </div>
        </BrowserRouter>
    </div>
  )
}
