'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, Github } from 'lucide-react'

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A modern e-commerce solution with real-time inventory management, payment processing, and analytics dashboard.',
    tech: ['React', 'Next.js', 'Stripe', 'Tailwind CSS'],
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 2,
    title: 'AI-Powered Analytics',
    description: 'Advanced analytics platform leveraging machine learning for predictive insights and data visualization.',
    tech: ['TypeScript', 'React', 'AI/ML', 'D3.js'],
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 3,
    title: 'Design System',
    description: 'Comprehensive component library and design tokens for enterprise applications with accessibility first approach.',
    tech: ['Storybook', 'TypeScript', 'Tailwind CSS', 'Figma'],
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 4,
    title: 'Real-time Chat App',
    description: 'WebSocket-based chat application with encryption, file sharing, and presence indicators.',
    tech: ['Next.js', 'WebSocket', 'Socket.io', 'PostgreSQL'],
    color: 'from-green-500 to-teal-500'
  }
]

export default function Projects() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  return (
    <section id="projects" ref={ref} className="relative py-20 px-6 bg-foreground/2">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ translateY: -5, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)' }}
              className="group relative bg-card/50 backdrop-blur border border-border rounded-2xl p-8 overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10`} />

              <div className="relative z-10">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${project.color} mb-6 flex items-center justify-center`}>
                  <div className="w-6 h-6 border-2 border-white rounded" />
                </div>

                <h3 className="text-2xl font-bold text-foreground mb-3">{project.title}</h3>
                <p className="text-foreground/70 leading-relaxed mb-6">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-sm px-3 py-1 bg-primary/10 text-primary rounded-full font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4 pt-6 border-t border-border">
                  <motion.button
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
                  >
                    Live Demo
                    <ExternalLink className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all"
                  >
                    View Code
                    <Github className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
