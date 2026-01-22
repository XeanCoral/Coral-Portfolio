'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface NavigationProps {
  isScrolled: boolean
}

const navItems = ['About', 'Projects', 'Experience', 'Contact']

export default function Navigation({ isScrolled }: NavigationProps) {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
        >
          Portfolio
        </motion.div>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              whileHover={{ scale: 1.05, color: '#3b82f6' }}
              className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors"
            >
              {item}
            </motion.a>
          ))}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-gradient-to-r from-primary to-accent text-white rounded-full font-medium hover:shadow-lg transition-shadow"
          >
            Get In Touch
          </motion.button>
        </div>
      </div>
    </motion.nav>
  )
}
