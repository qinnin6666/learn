import { useRef, useEffect, useCallback, useMemo } from 'react'

export const useDraw = (onDraw: ({ ctx, currentPoint }: Draw) => void) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const contextRef = useRef<CanvasRenderingContext2D | null>(null)
  const drawingRef = useRef(false)

  useEffect(() => {
    const handleDown = (e: MouseEvent) => {
      drawingRef.current = true
      contextRef.current?.beginPath()
      contextRef.current?.moveTo(e.offsetX, e.offsetY)
      e.preventDefault()
    }
    const handleUp = (e: MouseEvent) => {
      drawingRef.current = false
      contextRef.current?.closePath()
      e.preventDefault()
    }

    const canvas = canvasRef.current
    if (canvas === null) return

    contextRef.current = canvas.getContext('2d')
    canvas.addEventListener('mousedown', handleDown)
    canvas.addEventListener('mouseup', handleUp)

    return () => {
      canvas.removeEventListener('mousedown', handleDown)
      canvas.removeEventListener('mouseup', handleUp)
    }
  }, [])

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!drawingRef.current || !contextRef.current) return
      onDraw({
        ctx: contextRef.current,
        currentPoint: { x: e.offsetX, y: e.offsetY }
      })
      e.preventDefault()
    }
    const canvas = canvasRef.current
    if (canvas === null) return

    canvas.addEventListener('mousemove', handleMove)
    return () => canvas.removeEventListener('mousemove', handleMove)
  }, [onDraw])

  const clear = useCallback(() => {
    const canvas = canvasRef.current
    const ctx = contextRef.current
    if (!canvas || !ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }, [])

  return useMemo(() => ({ canvasRef, clear }), [])
}
