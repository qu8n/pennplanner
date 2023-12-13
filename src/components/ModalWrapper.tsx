import {
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react'

export function ModalWrapper({
  isOpen,
  onOpenChange,
  header,
  body,
  footer,
  baseCustomClasses,
}: {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  header: string | JSX.Element | null
  body: JSX.Element | null
  footer?: JSX.Element | null
  baseCustomClasses?: string
}) {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      classNames={{
        base: `rounded-md ${baseCustomClasses}`,
        closeButton: 'scale-150 mt-2 mr-2 text-bold text-neutral-500 p-1',
      }}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col text-lg font-semibold text-blue-900 lg:text-xl">
              {header}
            </ModalHeader>

            <Divider />

            <ModalBody className="mt-4 text-xs lg:text-base">{body}</ModalBody>

            <ModalFooter>{footer}</ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
