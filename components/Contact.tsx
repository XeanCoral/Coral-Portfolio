'use client'

import React, { useRef, useState, useEffect } from "react"

import { motion } from 'framer-motion'
import { Mail, Facebook, Github, Instagram } from 'lucide-react'

export default function Contact() {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
    setFormData({ name: '', email: '', message: '' })
  }

  const socialLinks = [
    { icon: Mail, href: 'https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox', label: 'Email', color: 'from-red-500 to-pink-500' },
    { icon: Facebook, href: 'https://www.facebook.com/profile.php?id=100045741675556', label: 'Facebook', color: 'from-blue-500 to-blue-700' },
    { icon: Github, href: 'https://github.com/XeanCoral?tab=repositories', label: 'GitHub', color: 'from-gray-700 to-gray-900' },
    { icon: Instagram, href: 'https://www.instagram.com/xean_nelson16/', label: 'Instagram', color: 'from-pink-500 to-orange-500' }
  ]

  return (
    <section id="contact" ref={ref} className="relative py-20 px-6 bg-foreground/2">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Let's <span className="text-primary">Connect</span>
          </h2>
          <p className="text-foreground/70 text-lg">
            I'm always open to new opportunities and collaborations. Feel free to reach out!
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6 }}
            className="bg-card/50 backdrop-blur border border-border rounded-2xl p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:border-primary transition-colors text-foreground placeholder:text-foreground/50"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:border-primary transition-colors text-foreground placeholder:text-foreground/50"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Your message here..."
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:border-primary transition-colors text-foreground placeholder:text-foreground/50 resize-none"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-semibold hover:shadow-lg transition-shadow"
              >
                {submitted ? '✓ Message Sent!' : 'Send Message'}
              </motion.button>
            </form>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Get In Touch</h3>
                <p className="text-foreground/70 leading-relaxed mb-8">
                  Whether you have a project in mind, want to discuss opportunities, or just want to say hi – don't hesitate to reach out. I'd love to hear from you!
                </p>
              </div>

              <div className="space-y-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-4 group"
                  >
                    <div className={`p-4 rounded-lg bg-gradient-to-br ${social.color} text-white group-hover:shadow-lg transition-shadow`}>
                      <social.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{social.label}</p>
                      <p className="text-sm text-foreground/60">
                        {social.label === 'Email' && 'Gmail'}
                        {social.label === 'Facebook' && 'facebook.com/xean'}
                        {social.label === 'GitHub' && 'github.com/XeanCoral'}
                        {social.label === 'Instagram' && '@xean_nelson16'}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-20 pt-12 border-t border-border text-center"
      >
        <p className="text-foreground/60 text-sm">
          © 2024 Your Name. All rights reserved. Crafted with passion and code.
        </p>
      </motion.div>
    </section>
  )
}
