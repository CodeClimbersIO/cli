import { useState, useEffect, useRef } from 'react'
import { useTheme } from '@mui/material'

const THEME_LOGO = {
  dark: 'logo-white.svg',
  light: 'logo.svg',
}

const getRandomDirection = () => {
  const angle = Math.random() * 2 * Math.PI
  return {
    x: Math.cos(angle),
    y: Math.sin(angle),
  }
}

const FRAME_RATE = 30 // frames per second
const INTERVAL = 1000 / FRAME_RATE // milliseconds

const initialDirection = getRandomDirection()

export const AnimatedLogo = () => {
  const theme = useTheme()
  const logo = `/images/${THEME_LOGO[theme.palette.mode]}`
  const [position, setPosition] = useState({ x: 50, y: 500 })
  const [direction, setDirection] = useState(initialDirection)
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const updateContainerSize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect()
        setContainerSize({ width, height })
      }
    }

    updateContainerSize()
    window.addEventListener('resize', updateContainerSize)

    return () => window.removeEventListener('resize', updateContainerSize)
  }, [])

  useEffect(() => {
    const container = containerRef.current
    const logoElement = logoRef.current
    if (!container || !logoElement) return

    const updatePosition = () => {
      const logoRect = logoElement.getBoundingClientRect()

      setPosition((prevPosition) => {
        const newX = prevPosition.x + direction.x * 6
        const newY = prevPosition.y + direction.y * 6
        const newDirection = { ...direction }

        if (newX <= -20 || newX + logoRect.width - 20 >= containerSize.width) {
          newDirection.x = -newDirection.x
        }
        if (
          newY <= -20 ||
          newY + logoRect.height - 20 >= containerSize.height
        ) {
          newDirection.y = -newDirection.y
        }

        if (newDirection.x !== direction.x || newDirection.y !== direction.y) {
          setDirection(newDirection)
        }

        return { x: newX, y: newY }
      })
    }

    const intervalId = setInterval(updatePosition, INTERVAL)

    return () => clearInterval(intervalId)
  }, [direction])

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: `${position.x}px`,
          top: `${position.y}px`,
          transition: 'left 0.1s linear, top 0.1s linear',
        }}
      >
        <img
          ref={logoRef}
          src={logo}
          style={{
            height: '75px',
          }}
        />
      </div>
    </div>
  )
}
