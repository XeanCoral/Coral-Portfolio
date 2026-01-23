'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Hero from '@/components/Hero'
import About from '@/components/About'
import BigThree from '@/components/BigThree'
import CurrentlyLearning from '@/components/CurrentlyLearning'
import Projects from '@/components/Projects'
import Experience from '@/components/Experience'
import Contact from '@/components/Contact'
import Navigation from '@/components/Navigation'
import Home from '@/components/Home'

export default function Page() {
  const [activeSection, setActiveSection] = useState('home')
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-background via-background to-blue-50">
      <Navigation isScrolled={isScrolled} />
      <main className="relative">
        <Hero />
        <About />
        <Home />
        <BigThree />
        <CurrentlyLearning />
        <Projects />
        <Experience />
        <Contact />
      </main>
    </div>
  )
}
