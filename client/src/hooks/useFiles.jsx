import { useEffect, useState } from "react"
import Axios from "axios"
const useFiles = () => {
    const [files, setFiles] = useState([])

    useEffect(() => {
        getFiles()
    }, [])
    return { files, getFiles }
}
export default useFiles
