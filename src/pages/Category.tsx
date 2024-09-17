import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Modal from '../components/Modal'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'react-toastify'
import { SubmitHandler, useForm } from 'react-hook-form'
import ICategory from '../interfaces/FormCategory'

const Category = () => {
    const [modalData, setModalData] = useState<ICategory | null>(null)
    const [isModalAddOpen, setModalAddOpen] = useState(false)
    const [isModalEditOpen, setModalEditOpen] = useState(false)

    const { register, handleSubmit, reset, formState: { errors } } = useForm<ICategory>()

    const { data, refetch, isPending, error } = useQuery({
        queryKey: ['categoryData'],
        queryFn: () =>
            fetch('http://localhost:3000/category')
                .then(res => res.json())
    })

    const handleDelete = useMutation({
        mutationFn: (id: number) => axios.delete(`http://localhost:3000/category/${id}`),
        onSuccess: () => {
            toast.success('Deleted category successfully!')
            refetch()
        }
    })

    const addMutation = useMutation({
        mutationFn: (data: ICategory) => axios.post('http://localhost:3000/category', data),
        onSuccess: () => {
            toast.success('Added category successfully!')
            refetch()
            closeAddModal()
        }
    })

    const updateMutation = useMutation({
        mutationFn: (params: { data: ICategory; id: number }) => {
            return axios.put(`http://localhost:3000/category/${params.id}`, params.data)
        },
        onSuccess: () => {
            toast.success('Updated category successfully!')
            refetch()
            closeEditModal()
        }
    })

    const handleAdd: SubmitHandler<ICategory> = (values) => {
        addMutation.mutate(values)
    }

    const handleUpdate: SubmitHandler<ICategory> = (values) => {
        if (modalData?.id) {
            updateMutation.mutate({ data: values, id: modalData.id })
        }
    }

    const openAddModal = () => {
        reset()
        setModalAddOpen(true)
    }
    const closeAddModal = () => setModalAddOpen(false)

    const openEditModal = (category: ICategory) => {
        setModalData(category)
        reset({ name: category.name })
        setModalEditOpen(true)
    }

    const closeEditModal = () => {
        setModalData(null)
        setModalEditOpen(false)
    }

    if (isPending) return 'Loading...'

    if (error) return 'Error occurred: ' + error.message

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <Navbar />
            <div className="flex-1 md:ml-56 p-4 pt-20">
                {/* Add Product Modal Start */}
                <div className="flex items-center justify-end bg-gray-100 mr-14 mb-5">
                    <button
                        onClick={openAddModal}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Add Product
                    </button>

                    <Modal isOpen={isModalAddOpen} onClose={closeAddModal}>
                        <h2 className="text-xl font-semibold mb-4">Add</h2>
                        <form onSubmit={handleSubmit(handleAdd)}>
                            <div className="mb-4">
                                <label className="text-left block mb-2 text-sm font-medium text-gray-600">
                                    Category
                                </label>
                                <input
                                    {...register('name', { required: 'Category name is required' })}
                                    className="w-full px-4 py-2 text-gray-700 bg-gray-200 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                                    placeholder="Category"
                                />
                                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                            </div>
                            <button
                                type="submit"
                                className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300"
                            >
                                Create
                            </button>
                        </form>
                    </Modal>
                </div>
                {/* Add Product Modal End */}
                <div className='overflow-x-auto'>
                    <table className="table-auto min-w-full">
                        <thead>
                            <tr>
                                <th className='p-4 border-b border-blue-gray-100 bg-blue-gray-50'>Name</th>
                                <th className='p-4 border-b border-blue-gray-100 bg-blue-gray-50'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((category: ICategory) =>
                                <tr key={category.id}>
                                    <td className='p-4 border-b border-blue-gray-50 text-center'>{category.name}</td>
                                    <td className='p-4 border-b border-blue-gray-50 text-center'>
                                        <button className='mr-5' onClick={() => openEditModal(category)}>Edit</button>
                                        <button onClick={() => handleDelete.mutate(category.id)}>Delete</button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                
                {/* Edit Product Modal */}
                <Modal isOpen={isModalEditOpen} onClose={closeEditModal}>
                    <h2 className="text-xl font-semibold mb-4">Edit</h2>
                    {modalData && (
                        <form onSubmit={handleSubmit(handleUpdate)}>
                            <div className="mb-4">
                                <label className="text-left block mb-2 text-sm font-medium text-gray-600">
                                    Category
                                </label>
                                <input
                                    {...register('name', { required: 'Category name is required' })}
                                    className="w-full px-4 py-2 text-gray-700 bg-gray-200 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                                    placeholder="Category"
                                />
                                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                            </div>
                            <button
                                type="submit"
                                className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300"
                            >
                                Update
                            </button>
                        </form>
                    )}
                </Modal>
            </div>
        </div>
    )
}

export default Category
