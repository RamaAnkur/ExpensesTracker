import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { ResponsiveContainer } from 'recharts'

export function Chart({ data }) {
  const chartRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const chart = chartRef.current
    const resizeObserver = new ResizeObserver(() => {
      if (chart) {
        chart.resize()
      }
    })

    resizeObserver.observe(containerRef.current)
    return () => resizeObserver.disconnect()
  }, [])

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        style={{ position: 'relative' }}
        key={JSON.stringify(data)}
        className="h-[350px] w-full"
      >
        <ResponsiveContainer width="100%" height="100%">
          {/* Your actual chart implementation */}
        </ResponsiveContainer>
      </motion.div>
    </AnimatePresence>
  )
} 