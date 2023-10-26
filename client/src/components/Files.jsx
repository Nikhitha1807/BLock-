import React from 'react'
import { DownloadIcon, FileTextIcon, ImageIcon, FileIcon, VideoIcon } from "lucide-react"
import moment from 'moment/moment'
import { useData } from '../contexts/DataContext'
const iconMap = {
    "pdf": <FileTextIcon size={24} />,
    "png": <ImageIcon size={24} />,
    "jpg": <ImageIcon size={24} />,
    "jpeg": <ImageIcon size={24} />,
    "gif": <ImageIcon size={24} />,
    "txt": <FileTextIcon size={24} />,
    "mp4": <VideoIcon size={24} />,
    "*": <FileIcon size={24} />

}
export default function Files() {
    const { files } = useData()
    return (
        <div className='border rounded'>

            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Date</th>
                            <th>File Size</th>
                            <th>Download</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            files.map(file => {
                                return (

                                    <tr key={file.id}>
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div className="avatar">
                                                    {
                                                        iconMap[file.metadata.name.split('.').pop() in iconMap ? file.metadata.name.split('.').pop() : "*"]
                                                    }
                                                </div>
                                                <div>
                                                    <div className="font-bold">{file.metadata.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {moment(file.date_pinned).format('MMMM Do YYYY, h:mm:ss a')}
                                        </td>
                                        <td>{Math.round(file.size / (1024))} KB</td>
                                        <th>
                                            <DownloadIcon size={24} />
                                        </th>
                                    </tr>)
                            })
                        }
                    </tbody>

                </table>
            </div>
        </div>
    )
}
