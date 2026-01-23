'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Code2, Zap, Brain, TrendingUp } from 'lucide-react'

const learningItems = [
  {
    id: 1,
    title: 'Advanced TypeScript Patterns',
    description: 'Deep diving into generics, utility types, and advanced type inference to write more robust and scalable code.',
    progress: 75,
    icon: Code2,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 2,
    title: 'Full-Stack AI Integration',
    description: 'Building AI-powered applications with LLMs, embeddings, and retrieval-augmented generation (RAG) systems.',
    progress: 60,
    icon: Brain,
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 3,
    title: 'Performance Optimization',
    description: 'Mastering Core Web Vitals, bundle optimization, and advanced caching strategies for lightning-fast applications.',
    progress: 70,
    icon: Zap,
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 4,
    title: 'System Design & Architecture',
    description: 'Learning scalable system design principles, microservices, and distributed computing patterns.',
    progress: 55,
    icon: TrendingUp,
    color: 'from-green-500 to-teal-500'
  }
]

export default function CurrentlyLearning() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  return (
    <section id="learning" ref={ref} className="relative py-20 px-6 bg-foreground/2">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Currently <span className="text-accent">Learning</span>
          </h2>
          <p className="text-foreground/60 text-lg max-w-2xl">
            I'm committed to continuous growth. Here's what I'm actively learning to stay ahead in this fast-paced industry.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {learningItems.map((item, index) => {
            const IconComponent = item.icon
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ x: 8 }}
                className="group"
              >
                <div className="bg-card/60 backdrop-blur border border-border rounded-2xl p-8 hover:shadow-lg transition-all duration-300 overflow-hidden relative">
                  {/* Gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                  <div className="relative z-10">
                    {/* Icon and Title */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0 mt-1`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-foreground/70 leading-relaxed mb-6 ml-16">{item.description}</p>

                    {/* Progress Bar */}
                    <div className="ml-16">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-foreground/60">Progress</span>
                        <span className="text-sm font-bold text-primary">{item.progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-foreground/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${item.progress}%` } : { width: 0 }}
                          transition={{ duration: 1, delay: 0.3 + index * 0.1, ease: 'easeOut' }}
                          className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Footer message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 p-8 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl border border-primary/20 text-center"
        >
          <p className="text-foreground/80 text-lg">
            <span className="font-semibold text-primary">Growth mindset</span> is at the core of who I am as a developer. I believe in continuous learning and adapting to new technologies to deliver better solutions.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
