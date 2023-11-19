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
          ? 'rounded-md border-3 border-dashed border-blue-500'
          : 'border-3 border-transparent'
      }`}
    >
      {children}
    </div>
  )
}
