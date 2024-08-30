import React from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const useLogout = () => {
    const navigate = useNavigate()
    const [, removeCookie] = useCookies(['token'])

    const handleLogout = () => {
        removeCookie('token', { path: '/' })
        toast.success('You have successfully signed out.')

        setTimeout(() => {
            navigate('/signin')
            location.reload()
        },
            2000)


    }

    return { handleLogout }
}

export default useLogout