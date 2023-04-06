import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function EmptyData({title}) {
    const nav = useNavigate()
    return (
        <div className='text-center'>
            <img width={150} src='https://cdn-icons-png.flaticon.com/512/6330/6330163.png' />
            <h5 className='my-2'>{title}</h5>
            <Button variant="outlined" className='btn-dark text-white' onClick={() => nav('/')}>Continue Shopping</Button>
        </div>
    )
}

export default EmptyData