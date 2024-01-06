import React, { useEffect, useState } from 'react'
import Axios from "axios"
import { CopyIcon, ShareIcon, EyeIcon, Eye, LucideBan } from "lucide-react"
export default function Home({ account, contract, provider }) {
    const [files, setFiles] = useState([]);
    const [file, setFile] = useState(null);
    const [ipfshash, setipfshash] = useState(null);
    const [shareTo, setShareTo] = useState("");
    const [shareHash, setShareHash] = useState(null);
    const handleShare = async () => {
        await contract.allow(shareTo, shareHash);
        document.getElementById('my_modal_1').close();
    }
    const handleRevoke = async () => {
        await contract.disallow(shareTo, shareHash);
        document.getElementById('my_modal_2').close();
    }
    const [temp, setTemp] = useState(null);
    const [access, setAccess] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (file) {
            try {
                const formData = new FormData();
                formData.append("file", file);
                const resFile = await Axios({
                    method: "post",
                    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                    data: formData,
                    headers: {
                        pinata_api_key: "b124ac35cfba198b2157",
                        pinata_secret_api_key: "45339e662e571b0a3cf45eeabd2bb1813022fc52ab2941d8dca24c920b254159",
                        "Content-Type": "multipart/form-data",
                    },
                });
                const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
                console.log(resFile.data.IpfsHash);
                console.log(resFile.data);
                setipfshash(resFile.data.IpfsHash);

                const signer = contract.connect(provider.getSigner());
                signer.add(account, ImgHash);


            } catch (e) {
                console.log(e);
                alert("Can't upload file to Pinata");
            }
        }
        alert(" Image Uploaded Successfully ");

        setFile(null);
    };
    const getHashFromUrl = (url) => {
        const hash = url.split("/")[2];
        return hash;
    }
    const getFiles = async (temp) => {
        let access = await contract.shareAccess()
        setAccess(access)
        let dataArray;
        if (temp)
            dataArray = await contract.display(temp)
        else
            dataArray = await contract.display(account)
        console.log(dataArray);
        setFiles(dataArray)
       
    };
    useEffect(() => {
        if (!contract) return;
        getFiles()
    }, [contract])


    return (
        <div style={{
        backgroundImage: 'url("https://media.istockphoto.com/id/886639266/vector/abstract-light-blur-and-bokeh-effect-background-vector-defocused-sun-shine-or-sparkling.jpg?s=612x612&w=0&k=20&c=9JI3YFsbZctQSw1KE7qWTgC_bQhew7qQZ0AxJ17xXCY=")',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            height: '180vh'
          }}>
        <div className="home">
        <header className="header">
     <nav>
       
      
       <ul>
         <li><a href="/"><b>Home</b></a></li>
         <li><a href="/about"><b>Learn More</b></a></li>
         
         <li><a href="/home"><b>File Upload</b></a></li>
         
       </ul>
     </nav>
   </header>
        <div className='p-4 flex flex-col gap-5'>
            <div className='justify-between flex'>
                <input
                    onChange={(e) => setFile(e.target.files[0])}
                    type="file" className="file-input w-full max-w-xs" />
                <button
                    disabled={!file}
                    onClick={handleSubmit}
                    className="btn">Upload</button>
            </div>
            {/*
            <div className='justify-between flex-grow flex gap-5'>
                <input
                    placeholder='Enter Address To View Images'
                    onChange={(e) =>
                        setTemp(e.target.value)}
                    type="text" className="input w-full " />
                <button
                    disabled={!temp}
                    onClick={() => {
                        getFiles(temp)
                    }}
                    className="btn">Fetch</button>
                </div> */}
            <div className="overflow-x-auto">
                <table className="table border">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>IPFS</th>
                            <th>SHARE</th>
                            <th>REVOKE</th>
                            <th>PREVIEW</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            files.length > 0 && files.filter((item) => item !== '').map((item, i)                             => {
                                return (

                                    <tr>
                                        <td>{item}</td>
                                        <td>
                                            <ShareIcon
                                                onClick={() => {
                                                    setShareHash(item)
                                                    document.getElementById('my_modal_1').showModal()
                                                }}
                                                className='cursor-pointer' />

                                        </td>
                                        <td>



                                            <LucideBan
                                            className='cursor-pointer'
                                                onClick={() => {
                                                    setShareHash(item)
                                                    document.getElementById('my_modal_2').showModal()
                                                }} />

                                        </td>
                                        <td>
                                            <a target='_blank' href={`https://magenta-careful-termite-645.mypinata.cloud/ipfs/${getHashFromUrl(item)}?pinataGatewayToken=oZvK59ho0MysKR_RZVH9oKKaAxLC9JJ48lM2Afb5cjJHw7ySWOmix_RvTeGWNOtO`} >


                                                <EyeIcon />
                                            </a>
                                        </td>
                                    </tr>
                                )
                            })}
                    </tbody>
                </table>
            </div>
            <div className='grid grid-cols-2 gap-2.5'>
               

            </div>
            {access && <div className='flex flex-col gap-5'>
                <h1 className='text-2xl'>Senders Address -  File identifier</h1>
                <div className='flex flex-col gap-5'>
                    {access.length > 0 &&
                        access.map((item, i) => {
                            console.log(item.user, item.access);
                            return (
                                <div key={item} className='flex justify-between'>
                                    <p>{item}</p>

                                    

                                </div>
                            )
                        })
                    }
                </div>
            </div>
            }
            
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>

                    <h3 className="font-bold text-lg">Revoke Access</h3>
                    <p className="py-2">Enter Wallet Address To Be Revoked</p>
                    <div className="py-2">{shareHash}</div>
                    <input type="text"
                        onChange={(e) => setShareTo(e.target.value)}
                        placeholder="0x00....000"
                        className="input w-full max-w" />
                    <button
                        onClick={handleRevoke}
                        className='btn btn-primary mt-3'>Revoke Access</button>
                </div>
            </dialog>
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>

                    <h3 className="font-bold text-lg">Share Access</h3>
                    <p className="py-2">Enter Wallet Address Of Reciever</p>
                    <p className='py-2'>{shareHash}</p>
                    <input type="text"
                        onChange={(e) => setShareTo(e.target.value)}
                        placeholder="0x00....000"
                        className="input w-full max-w" />
                    <button
                        onClick={handleShare}
                        className='btn btn-primary mt-3'>Share Access</button>
                </div>
            </dialog>

        </div>
        </div>
        </div>
        
    )
}
