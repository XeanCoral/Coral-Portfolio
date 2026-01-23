'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, Github, Lightbulb, BookOpen, Rocket } from 'lucide-react'

const bigThreeProjects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A production-ready e-commerce platform showcasing my expertise in full-stack development, payment integration, and user experience design. Built with modern best practices and scalable architecture.',
    category: 'What I Know',
    icon: Lightbulb,
    tech: ['React', 'Next.js', 'Stripe', 'PostgreSQL', 'Tailwind CSS'],
    color: 'from-blue-500 to-cyan-500',
    badge: 'Expertise'
  },
  {
    id: 2,
    title: 'AI-Powered Analytics Dashboard',
    description: 'A cutting-edge analytics platform where I learned machine learning integration, real-time data processing, and advanced visualization techniques. Demonstrates growth in emerging technologies.',
    category: 'What I Learned',
    icon: BookOpen,
    tech: ['TypeScript', 'React', 'TensorFlow', 'D3.js', 'WebSockets'],
    color: 'from-purple-500 to-pink-500',
    badge: 'Learning Journey'
  },
  {
    id: 3,
    title: 'AI Content Generation Suite',
    description: 'An ambitious project leveraging AI to automate creative workflows. This showcases my vision for the future of development with intelligent systems and human-centered design.',
    category: 'What I\'m Aspiring To',
    icon: Rocket,
    tech: ['Next.js', 'OpenAI', 'Claude API', 'Vercel AI SDK', 'Vector Databases'],
    color: 'from-orange-500 to-red-500',
    badge: 'Future Vision'
  }
]

export default function BigThree() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  return (
    <section id="big-three" ref={ref} className="relative py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            The Big <span className="text-primary">Three</span>
          </h2>
          <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
            My journey showcased through three projects that represent what I know, what I've learned, and what I'm building toward.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {bigThreeProjects.map((project, index) => {
            const IconComponent = project.icon
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ translateY: -8 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                
                <div className="relative bg-card/60 backdrop-blur border border-border rounded-2xl p-8 h-full overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  {/* Gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                  <div className="relative z-10">
                    {/* Icon and Badge */}
                    <div className="flex items-start justify-between mb-6">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r ${project.color} text-white`}>
                        {project.badge}
                      </span>
                    </div>

                    {/* Category */}
                    <p className="text-sm font-semibold text-primary mb-2">{project.category}</p>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-foreground mb-3">{project.title}</h3>

                    {/* Description */}
                    <p className="text-foreground/70 leading-relaxed mb-6">{project.description}</p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex gap-4 pt-6 border-t border-border">
                      <motion.button
                        whileHover={{ x: 4 }}
                        className="flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all text-sm"
                      >
                        Live Demo
                        <ExternalLink className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ x: 4 }}
                        className="flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all text-sm"
                      >
                        Code
                        <Github className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
