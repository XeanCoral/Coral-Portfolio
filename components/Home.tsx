'use client'

import React from "react"

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Upload, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Home() {
  const [userName, setUserName] = useState('Xean Coral')
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [tempName, setTempName] = useState(userName)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Load profile data from localStorage on mount
  useEffect(() => {
    const savedName = localStorage.getItem('portfolioUserName')
    const savedImage = localStorage.getItem('portfolioProfileImage')
    
    if (savedName) setUserName(savedName)
    if (savedImage) setProfileImage(savedImage)
    if (savedName) setTempName(savedName)
  }, [])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const imageData = event.target?.result as string
        setProfileImage(imageData)
        localStorage.setItem('portfolioProfileImage', imageData)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleNameSave = () => {
    if (tempName.trim()) {
      setUserName(tempName)
      localStorage.setItem('portfolioUserName', tempName)
      setIsEditing(false)
    }
  }

  const handleRemoveImage = () => {
    setProfileImage(null)
    localStorage.removeItem('portfolioProfileImage')
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 px-4 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-accent/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10 max-w-2xl w-full"
      >
        <div className="text-center mb-12">
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Welcome
            </span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-muted-foreground"
          >
            Personalize your profile
          </motion.p>
        </div>

        {/* Profile Card */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-card rounded-2xl p-8 md:p-12 shadow-lg dark:shadow-xl border border-border/50 backdrop-blur-sm"
        >
          <div className="flex flex-col items-center gap-8">
            {/* Profile Picture Section */}
            <div className="relative group">
              <div className="relative w-32 h-32 md:w-40 md:h-40">
                {profileImage ? (
                  <>
                    <motion.img
                      src={profileImage}
                      alt={userName}
                      className="w-full h-full object-cover rounded-full border-4 border-accent shadow-lg"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.4 }}
                    />
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 bg-destructive text-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Remove image"
                    >
                      <X size={16} />
                    </motion.button>
                  </>
                ) : (
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border-4 border-dashed border-accent">
                    <Upload className="text-accent/60" size={40} />
                  </div>
                )}
              </div>

              {/* Upload Button */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 bg-accent text-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all"
                title="Change profile picture"
              >
                <Upload size={20} />
              </motion.button>
            </div>

            {/* Name Section */}
            <div className="w-full max-w-md">
              {isEditing ? (
                <div className="flex flex-col gap-3">
                  <input
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    className="w-full px-4 py-3 text-center text-2xl font-bold rounded-lg border-2 border-accent bg-background text-foreground focus:outline-none focus:border-primary transition-colors"
                    placeholder="Enter your name"
                    autoFocus
                  />
                  <div className="flex gap-2 justify-center">
                    <Button
                      onClick={handleNameSave}
                      className="bg-accent hover:bg-accent/90 text-white px-6"
                    >
                      Save
                    </Button>
                    <Button
                      onClick={() => {
                        setIsEditing(false)
                        setTempName(userName)
                      }}
                      variant="outline"
                      className="px-6"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => setIsEditing(true)}
                  className="cursor-pointer group"
                >
                  <h3 className="text-3xl md:text-4xl font-bold text-center text-foreground group-hover:text-accent transition-colors">
                    {userName}
                  </h3>
                  <p className="text-center text-sm text-muted-foreground mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    Click to edit name
                  </p>
                </div>
              )}
            </div>

            {/* Stats or Quick Info */}
            <div className="w-full grid grid-cols-3 gap-4 pt-8 border-t border-border">
              <motion.div
                variants={itemVariants}
                className="text-center"
              >
                <p className="text-2xl font-bold text-accent">5+</p>
                <p className="text-sm text-muted-foreground">Projects</p>
              </motion.div>
              <motion.div
                variants={itemVariants}
                className="text-center"
              >
                <p className="text-2xl font-bold text-accent">3+</p>
                <p className="text-sm text-muted-foreground">Years XP</p>
              </motion.div>
              <motion.div
                variants={itemVariants}
                className="text-center"
              >
                <p className="text-2xl font-bold text-accent">10+</p>
                <p className="text-sm text-muted-foreground">Clients</p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
