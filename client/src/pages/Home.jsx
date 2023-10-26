import React, { useEffect } from 'react'
import Axios from 'axios'
import Files from '../components/Files';
import Upload from '../components/Upload';
export default function Home() {
    return (
        <div className='max-w-5xl mx-auto p-5 flex flex-col gap-10'>
            <Upload/>
            <Files />
        </div>
    )
}
