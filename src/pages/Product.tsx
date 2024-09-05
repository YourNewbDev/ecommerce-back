import React, { useEffect, useMemo, useState } from 'react'
import Navbar from '../components/Navbar'
import { useQuery } from '@tanstack/react-query'
import { getCoreRowModel, useReactTable, flexRender } from '@tanstack/react-table';


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


    console.log(data)

    if (isPending) return 'Loading...'

    if (error) return 'Error occrred' + error.message

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <Navbar />
            {/* Main Content */}
            <div className="flex-1 md:ml-56 p-4 pt-20">
          
            </div>
        </div>
    )
}

export default Product