import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Blog from './pages/Blog'
import BlogDetail from './pages/BlogDetail'
import Testimonials from './pages/Testimonials'
import Jobs from './pages/Jobs'
import Services from './pages/Services'
import HowItWorks from './pages/HowItWorks'
import About from './pages/About'
import Faqs from './pages/Faqs'
import Header from './components/Header'
import Footer from './components/Footer'

export default function App(){
  return (
    <div className="app-root">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/services" element={<Services/>} />
          <Route path="/how-it-works" element={<HowItWorks/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/faqs" element={<Faqs/>} />
          <Route path="/blog" element={<Blog/>} />
          <Route path="/blog/:id" element={<BlogDetail/>} />
          <Route path="/testimonials" element={<Testimonials/>} />
          <Route path="/jobs" element={<Jobs/>} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
