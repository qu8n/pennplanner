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
  const style = {
    backgroundColor: isOver ? 'green' : undefined,
  }

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  )
}
