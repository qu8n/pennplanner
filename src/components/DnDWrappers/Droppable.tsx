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
      className={`${
        isOver
          ? 'border-2 border-blue-500 rounded-lg border-dashed'
          : 'border-2 border-transparent'
      }`}
    >
      {children}
    </div>
  )
}
