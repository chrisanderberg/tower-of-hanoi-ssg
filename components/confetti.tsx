'use client'

import { useEffect, useState } from 'react'

interface ConfettiProps {
  isActive: boolean
}

export default function Confetti({ isActive }: ConfettiProps) {
  const [particles, setParticles] = useState<Array<{
    id: number
    x: number
    y: number
    vx: number
    vy: number
    color: string
    size: number
  }>>([])

  useEffect(() => {
    if (!isActive) {
      setParticles([])
      return
    }

    // Create confetti particles
    const newParticles = Array.from({ length: 150 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: -10,
      vx: (Math.random() - 0.5) * 8,
      vy: Math.random() * 3 + 2,
      color: ['#ef4444', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899'][Math.floor(Math.random() * 6)],
      size: Math.random() * 4 + 2
    }))

    setParticles(newParticles)

    // Animation loop
    const interval = setInterval(() => {
      setParticles(prev => 
        prev.map(particle => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          vy: particle.vy + 0.1 // gravity
        })).filter(particle => particle.y < window.innerHeight + 50)
      )
    }, 16) // ~60fps

    // Stop confetti after 3 seconds
    const timeout = setTimeout(() => {
      setParticles([])
    }, 3000)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [isActive])

  if (!isActive || particles.length === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-sm"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            transform: `rotate(${particle.x * 0.1}deg)`
          }}
        />
      ))}
    </div>
  )
} 