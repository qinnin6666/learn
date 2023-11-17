import { useRef, useEffect, useState } from 'react';

export const useDraw = (onDraw: ({ ctx, currentPoint }: Draw) => void) => {
    const [isDrawing, setIsDrawing] = useState(false)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const contextRef = useRef<CanvasRenderingContext2D | null>(null)

    useEffect(() => {
        const handleDown = (e: MouseEvent) => {
            setIsDrawing(true)
            contextRef.current?.beginPath()
            contextRef.current?.moveTo(e.offsetX, e.offsetY)
            e.preventDefault()
        }
        const handleUp = (e: MouseEvent) => {
            setIsDrawing(false)
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
            if (!isDrawing || !contextRef.current) return
            onDraw({ ctx: contextRef.current, currentPoint: { x: e.offsetX, y: e.offsetY } })
            e.preventDefault()
        }
        const canvas = canvasRef.current
        if (canvas === null) return

        canvas.addEventListener('mousemove', handleMove)
        return () => canvas.removeEventListener('mousemove', handleMove)
    }, [isDrawing, onDraw])

    return canvasRef
}