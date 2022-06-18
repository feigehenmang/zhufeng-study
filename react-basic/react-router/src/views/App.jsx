import React from 'react'
import { Routes, Route, BrowserRouter, Link } from 'react-router-dom'
import Home from './Home'
import User from './User'
import Profile from './Profile'
import Post from './Post'
import Count from './Count'
import { Auth } from './Auth'
export default function App() {
    return <BrowserRouter>
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/user">User</Link>
            </li>
            <li>
                <Link to="/profile">Profile</Link>
            </li>
            <li>
                <Link to="/post/13">Post</Link>
            </li>
            <li>
                <Link to="/count">Count</Link>
            </li>
        </ul>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user" element={<User />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/post/:id" element={<Auth children={<Post></Post>} />} />
            <Route path="/count" element={<Count ></Count>} />
        </Routes>
    </BrowserRouter>
}