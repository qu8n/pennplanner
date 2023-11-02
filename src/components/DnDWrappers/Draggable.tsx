import { useDraggable } from '@dnd-kit/core'

export function Draggable({
  children,
  id,
}: {
  children: React.ReactNode
  id: string
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
  })

  return (
    <div
      className={`${isDragging && 'opacity-50'}`}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    >
      {children}
    </div>
  )
}
