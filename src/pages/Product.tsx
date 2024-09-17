import React, { useEffect, useMemo, useState } from 'react'
import Navbar from '../components/Navbar'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getCoreRowModel, useReactTable, flexRender } from '@tanstack/react-table';
import axios from 'axios';
import { toast } from 'react-toastify';
import Modal from '../components/Modal';


const Product = () => {
    const { data, error, refetch, isPending } = useQuery({
        queryKey: ['productData'],
        meta: {},
        queryFn: () =>
            fetch('http://localhost:3000/product')
                .then((res) =>
                    res.json(),
                )

    })

    const handleDelete = useMutation({
        mutationFn: (id) => {
            return axios.delete(`http://localhost:3000/product/${id}`)
        },
        onSuccess: () => {
            toast.success(`Deleted product successfully!`)
            refetch()

        }
    })

    const [isModalAddOpen, setModalAddOpen] = useState(false)

    const openAddModal = () => setModalAddOpen(true)
    const closeAddModal = () => setModalAddOpen(false)

    const [isModalEditOpen, setModalEditOpen] = useState(false)

    const openEditModal = () => setModalEditOpen(true)
    const closeEditModal = () => setModalEditOpen(false)


    console.log(data)

    if (isPending) return 'Loading...'

    if (error) return 'Error occrred' + error.message

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <Navbar />
            {/* Main Content */}
            <div className="flex-1 md:ml-56 p-4 pt-20">
                {/* <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-4 bg-white shadow-md rounded-lg">
        <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700">
          Upload file
        </label>
        <input
          id="file-upload"
          type="file"
          className="mt-2 block w-full text-sm text-gray-500 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-lg file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>
    </div> */}
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
                        <p>This is a basic modal using Tailwind CSS with React and TypeScript.</p>
                    </Modal>
                </div>
                {/* Add Product Modal End */}
                <div className='overflow-x-auto'>
                    <table className="table-auto min-w-full">
                        <thead>
                            <tr>
                                <th className='p-4 border-b border-blue-gray-100 bg-blue-gray-50'>Product</th>
                                <th className='p-4 border-b border-blue-gray-100 bg-blue-gray-50'>Image</th>
                                <th className='p-4 border-b border-blue-gray-100 bg-blue-gray-50'>Description</th>
                                <th className='p-4 border-b border-blue-gray-100 bg-blue-gray-50'>Category</th>
                                <th className='p-4 border-b border-blue-gray-100 bg-blue-gray-50'>Price</th>
                                <th className='p-4 border-b border-blue-gray-100 bg-blue-gray-50'>Quantity</th>
                                <th className='p-4 border-b border-blue-gray-100 bg-blue-gray-50'>Action</th>
                            </tr>
                        </thead>
                        {data.map((product: any) =>
                            <tbody key={product.id}>
                                <tr>
                                    <td className='p-4 border-b border-blue-gray-50 text-center'>{product?.name}</td>
                                    <td className='p-4 border-b border-blue-gray-50 text-center'>{product?.imgUrl}</td>
                                    <td className='p-4 border-b border-blue-gray-50 text-center'>{product?.description}</td>
                                    <td className='p-4 border-b border-blue-gray-50 text-center'>{product?.Category?.name}</td>
                                    <td className='p-4 border-b border-blue-gray-50 text-center'>{product?.price}</td>
                                    <td className='p-4 border-b border-blue-gray-50 text-center'>{product?.quantity}</td>
                                    <td className='p-4 border-b border-blue-gray-50 text-center'>
                                        <button className='mr-5' onClick={openEditModal}>Edit</button>
                                        <Modal isOpen={isModalEditOpen} onClose={closeEditModal}>
                                            <h2 className="text-xl font-semibold mb-4">Edit</h2>
                                            <p>This is a basic modal using Tailwind CSS with React and TypeScript.</p>
                                        </Modal>
                                        <button onClick={() => { handleDelete.mutate(product.id) }} >Delete</button>
                                    </td>
                                </tr>
                            </tbody>
                        )}
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Product