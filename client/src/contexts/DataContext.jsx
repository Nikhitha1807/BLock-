import React, { useContext, useState, useEffect } from "react";
import Axios from "axios";
import { toast } from "sonner";
const DataContext = React.createContext();
export function useData() {
    return useContext(DataContext);
}

export function DataProvider({ children }) {
    const [files, setFiles] = useState([])
    const getFiles = () => {
        console.log("called me");
        const url = `https://api.pinata.cloud/data/pinList`;
        Axios
            .get(url, {
                headers: {
                    'pinata_api_key': String(import.meta.env.VITE_PINATA_API_KEY),
                    'pinata_secret_api_key': String(import.meta.env.VITE_PINATA_SECRET_API_KEY)
                }
            })
            .then(function (response) {
                setFiles(response.data.rows)
            })
    }
    const uploadToPinata = (file, contract, account, provider) => {
        if (file) {
            const formData = new FormData()
            formData.append('file', file)
            Axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS",
                formData,
                {
                    headers: {
                        'pinata_api_key': String(import.meta.env.VITE_PINATA_API_KEY),
                        'pinata_secret_api_key': String(import.meta.env.VITE_PINATA_SECRET_API_KEY)
                    }
                }
            ).then(res => {
                getFiles()
                const ImgHash = `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
                contract.add(account, ImgHash)
                toast.success('File Uploaded Successfully')
            })
        }

    }
    useEffect(() => {
        getFiles()
    }
        , [])


    const value = {
        files,
        uploadToPinata

    };


    return (
        <DataContext.Provider value={value}>{children}</DataContext.Provider>
    );
}
