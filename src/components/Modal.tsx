import React from 'react'
import ModalProps from '../interfaces/ModalProps'

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
    if (!isOpen) return null
    return (
        <div
            className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex items-center justify-center"
            onClick={onClose}
        >
            <div
                className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm mx-4"
                onClick={(e) => e.stopPropagation()} // Prevents the modal from closing when clicking inside it
            >
                {children}
                <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mt-4"
                    onClick={onClose}
                >
                    Close Modal
                </button>
            </div>
        </div>
    )
}

export default Modal