'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const skills = [
  { name: 'React/Next.js', level: 95 },
  { name: 'TypeScript', level: 90 },
  { name: 'Tailwind CSS', level: 92 },
  { name: 'UI/UX Design', level: 88 },
  { name: 'Framer Motion', level: 85 },
  { name: 'Web Performance', level: 87 }
]

export default function About() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  }

  return (
    <section id="about" ref={ref} className="relative py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            About <span className="text-primary">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <p className="text-lg text-foreground/80 leading-relaxed">
              I'm a passionate developer and designer with a keen eye for creating beautiful, intuitive digital experiences. With over 5 years of experience in web development, I've worked with startups and established companies to bring their visions to life.
            </p>
            <p className="text-lg text-foreground/80 leading-relaxed">
              My approach combines modern design principles with clean, maintainable code. I believe in building products that not only look great but also provide exceptional user experiences.
            </p>
            <p className="text-lg text-foreground/80 leading-relaxed">
              When I'm not coding, you can find me exploring new design trends, contributing to open source, or enjoying the outdoors.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="space-y-4"
          >
            {skills.map((skill) => (
              <motion.div key={skill.name} variants={itemVariants} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-foreground">{skill.name}</span>
                  <span className="text-accent">{skill.level}%</span>
                </div>
                <div className="w-full bg-foreground/10 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
