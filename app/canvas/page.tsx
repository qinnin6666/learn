'use client'

import { useDraw } from '@/hook/useDraw'
import { useCallback, useState } from 'react'
import { ChromePicker } from 'react-color'

const Page = () => {
  const [color, setColor] = useState<string>('#000')

  const drawLine = useCallback(
    ({ ctx, currentPoint }: Draw) => {
      ctx.lineTo(currentPoint.x, currentPoint.y)
      ctx.strokeStyle = color
      ctx.lineWidth = 2
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.stroke()
    },
    [color]
  )

  const { canvasRef, clear } = useDraw(drawLine)

  return (
    <div className="w-screen h-screen bg-white flex justify-center items-center">
      <div className="flex flex-col gap-10 pr-10">
        <ChromePicker color={color} onChange={e => setColor(e.hex)} />
        <button type="button" className="p-2 rounded-md border border-black text-black" onClick={clear}>
          Clear canvas
        </button>
      </div>
      <canvas ref={canvasRef} width={750} height={750} className="border border-black rounded-md" />
    </div>
  )
}

export default Page
