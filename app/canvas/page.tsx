'use client'

import { useDraw } from '@/hook/useDraw'
import { useCallback } from 'react'

const Page = () => {
  const drawLine = useCallback(({ ctx, currentPoint }: Draw) => {
    ctx.lineTo(currentPoint.x, currentPoint.y)
    ctx.strokeStyle = 'black'
    ctx.lineWidth = 2
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.stroke()
  }, [])

  const canvasRef = useDraw(drawLine)

  return (
    <div className="w-screen h-screen bg-white flex justify-center items-center">
      <canvas ref={canvasRef} width={750} height={750} className="border border-black rounded-md" />
    </div>
  )
}

export default Page
