// components/DeleteConfirmationModal.tsx

import React from 'react'

interface DeleteConfirmationModalProps {
  isOpen: boolean
  onConfirm: () => void
  onCancel: () => void
  message: string
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onConfirm,
  onCancel,
  message,
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
        <h2 className="text-xl font-semibold text-gray-800">Are you sure?</h2>
        <p className="mt-2 text-gray-600">{message}</p>
        <div className="flex justify-end mt-4">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
            onClick={onConfirm}
          >
            Yes, Delete
          </button>
          <button
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteConfirmationModal
