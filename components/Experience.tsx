'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { CheckCircle } from 'lucide-react'

const experiences = [
  {
    title: 'Senior Product Designer',
    company: 'Tech Innovation Labs',
    duration: '2022 - Present',
    description: 'Leading design system development and mentoring junior designers.',
    achievements: [
      'Improved design-to-development workflow efficiency by 40%',
      'Mentored 3 junior designers to senior level',
      'Established accessibility standards across all products'
    ]
  },
  {
    title: 'Full Stack Developer',
    company: 'Digital Solutions Inc',
    duration: '2020 - 2022',
    description: 'Developed and maintained multiple client-facing web applications.',
    achievements: [
      'Built 5+ production-ready applications',
      'Reduced bundle size by 35% through optimization',
      'Implemented automated testing achieving 85% coverage'
    ]
  },
  {
    title: 'Frontend Developer',
    company: 'StartupHub',
    duration: '2018 - 2020',
    description: 'Created responsive and performant user interfaces.',
    achievements: [
      'Developed interactive features increasing user engagement by 60%',
      'Pioneered component-driven development approach',
      'Led migration from legacy framework to modern stack'
    ]
  }
]

export default function Experience() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  return (
    <section id="experience" ref={ref} className="relative py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            My <span className="text-primary">Experience</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full" />
        </motion.div>

        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ translateX: 8 }}
              className="relative group"
            >
              <div className="absolute -left-4 top-0 w-8 h-8 bg-accent rounded-full border-4 border-background shadow-lg flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>

              <div className="ml-8 bg-card/50 backdrop-blur border border-border rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300 group-hover:border-primary/30">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-1">{exp.title}</h3>
                    <p className="text-accent font-semibold">{exp.company}</p>
                  </div>
                  <span className="text-sm text-foreground/60 font-medium">{exp.duration}</span>
                </div>

                <p className="text-foreground/70 mb-6 leading-relaxed">{exp.description}</p>

                <div className="space-y-3">
                  {exp.achievements.map((achievement, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                      transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground/75">{achievement}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {index < experiences.length - 1 && (
                <div className="absolute -left-1 top-16 w-0.5 h-12 bg-gradient-to-b from-accent/50 to-transparent ml-3" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
