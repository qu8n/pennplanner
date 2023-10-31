import { useDroppable } from '@dnd-kit/core'
import React from 'react'

export function Droppable({
  children,
  id,
}: {
  children: React.ReactNode
  id: string
}) {
  const { isOver, setNodeRef } = useDroppable({
    id,
  })

  return (
    <div
      ref={setNodeRef}
      className={`${isOver ? 'ring-2 ring-blue-500 rounded-lg' : null}`}
    >
      {children}
    </div>
  )
}
