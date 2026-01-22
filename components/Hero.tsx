'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
}

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 right-10 w-72 h-72 bg-accent/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-20 left-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center max-w-4xl mx-auto px-6"
      >
        <motion.div variants={textVariants} className="mb-6">
          <span className="text-accent font-semibold text-lg">Welcome to Xean Coral portfolio</span>
        </motion.div>

        <motion.h1
          variants={textVariants}
          className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight"
        >
          Crafting Digital <br />
          <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Experiences
          </span>
        </motion.h1>

        <motion.p
          variants={textVariants}
          className="text-lg md:text-xl text-foreground/70 mb-10 leading-relaxed max-w-2xl mx-auto"
        >
          I build beautiful, accessible, and performant web experiences that blend thoughtful design with robust engineering.
        </motion.p>

        <motion.div
          variants={textVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(58, 130, 246, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-full font-semibold hover:shadow-xl transition-shadow"
          >
            View My Work
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, borderColor: '#3a82f6' }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 border-2 border-foreground/20 text-foreground rounded-full font-semibold hover:border-primary transition-colors"
          >
            Get In Touch
          </motion.button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex justify-center mt-10"
        >
          <ChevronDown className="w-6 h-6 text-primary animate-bounce" />
        </motion.div>
      </motion.div>
    </section>
  )
}
