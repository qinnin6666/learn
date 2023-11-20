import { useRef, useEffect, useCallback, useMemo } from 'react'

export const useDraw = (onDraw: ({ ctx, currentPoint }: Draw) => void) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const contextRef = useRef<CanvasRenderingContext2D | null>(null)
  const drawingRef = useRef(false)

  useEffect(() => {
    const mouseDownHandle = (e: MouseEvent) => {
      drawingRef.current = true
      contextRef.current?.beginPath()
      contextRef.current?.moveTo(e.offsetX, e.offsetY)
      e.preventDefault()
    }
    const mouseUpHandle = (e: MouseEvent) => {
      if (drawingRef.current) {
        drawingRef.current = false
        contextRef.current?.closePath()
        e.preventDefault()
      }
    }

    const canvas = canvasRef.current
    if (canvas === null) return

    contextRef.current = canvas.getContext('2d')
    canvas.addEventListener('mousedown', mouseDownHandle)
    window.addEventListener('mouseup', mouseUpHandle)

    return () => {
      canvas.removeEventListener('mousedown', mouseDownHandle)
      window.removeEventListener('mouseup', mouseUpHandle)
    }
  }, [])

  useEffect(() => {
    const mouseMoveHandle = (e: MouseEvent) => {
      if (!drawingRef.current || !contextRef.current) return
      onDraw({
        ctx: contextRef.current,
        currentPoint: { x: e.offsetX, y: e.offsetY }
      })
      e.preventDefault()
    }
    const canvas = canvasRef.current
    if (canvas === null) return

    canvas.addEventListener('mousemove', mouseMoveHandle)
    return () => canvas.removeEventListener('mousemove', mouseMoveHandle)
  }, [onDraw])

  const clear = useCallback(() => {
    const canvas = canvasRef.current
    const ctx = contextRef.current
    if (!canvas || !ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }, [])

  return useMemo(() => ({ canvasRef, clear }), [])
}
