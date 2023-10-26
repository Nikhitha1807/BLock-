import React, { useState } from 'react'
import { toast } from 'sonner'
import { useData } from '../contexts/DataContext'

export default function Upload({ contract, account, provider }) {
    const [file, setFile] = useState(null)
    const { uploadToPinata, files } = useData()

    return (
        <div className='flex items-center justify-between'>
            <input
                onChange={(e) => {
                    //check if already exists in file
                    if (files.find(f => f.metadata.name === e.target.files[0].name)) {
                        toast.error('File Already Exists')
                        e.target.value = null
                        return
                    }

                    setFile(e.target.files[0])
                }}
                type="file"
                className="file-input w-full max-w-xs" />
            <button
                disabled={!file}
                onClick={() => {
                    uploadToPinata(file, contract, account, provider)
                }}
                className="btn btn-primary"
            >
                Upload
            </button>
        </div>
    )
}
