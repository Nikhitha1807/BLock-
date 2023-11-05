import React, { useEffect, useState } from 'react'
import Axios from "axios"
import { CopyIcon, ShareIcon, EyeIcon, Eye } from "lucide-react"
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
                        pinata_api_key: "57f2e5b4c0f34b9a104a",
                        pinata_secret_api_key: "a954679ff0d7e0a490404e44323573e5c6c118d957eb1cdf123afcd769806b96",
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
        // if (address) {
        //     dataArray = await contract.display(address);
        // }
        // else {
        //     dataArray = await contract.display(account);
        // }
        // const Otheraddress = document.querySelector(".address").value;
        // try {
        //   if (Otheraddress) {
        //     dataArray = await contract.getURLs(Otheraddress);
        //   } else {
        //     dataArray = await contract.getURLs(account);
        //   }
        // } catch (e) {
        //   alert("You don't have access");
        // }
        // const isEmpty = Object.keys(dataArray).length === 0;
        // if (!isEmpty) {
        //     const str = dataArray.toString();
        //     const str_array = str.split(",");

        //     const images = str_array.map((item, i) => {
        //         return (
        //             <a href={item} key={i} target="_blank">
        //                 <img
        //                     key={i}
        //                     src={`https://yellow-explicit-minnow-290.mypinata.cloud/ipfs/${getHashFromUrl(item)}?pinataGatewayToken=fsSFXEoDsWvTQ6js7XX32o4N3rAqPfv9Ky4xMuYKSI-eWG2IMduKDmVAPxwbuOqs`}
        //                     alt="new"
        //                     className="image-list"
        //                 ></img>
        //             </a>
        //         );
        //     });
        //     setData(images);
        // } else {
        //     alert("No image to display");
        // }
    };
    useEffect(() => {
        if (!contract) return;
        getFiles()
    }, [contract])


    return (
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
            </div>
            <div className="overflow-x-auto">
                <table className="table border">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>IPFS</th>
                            <th>SHARE</th>
                            <th>PREVIEW</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            files.length > 0 && files.map((item, i) => {
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
                                            <a target='_blank' href={`https://yellow-explicit-minnow-290.mypinata.cloud/ipfs/${getHashFromUrl(item)}?pinataGatewayToken=fsSFXEoDsWvTQ6js7XX32o4N3rAqPfv9Ky4xMuYKSI-eWG2IMduKDmVAPxwbuOqs`} >


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
                {/* {files.length > 0 &&
                    files.map((item, i) => {
                        return (
                            <a href={item}
                                target='_blank'
                                key={item}>

                                <img

                                    src={`https://yellow-explicit-minnow-290.mypinata.cloud/ipfs/${getHashFromUrl(item)}?pinataGatewayToken=fsSFXEoDsWvTQ6js7XX32o4N3rAqPfv9Ky4xMuYKSI-eWG2IMduKDmVAPxwbuOqs`}
                                    alt="" />
                            </a>
                        )
                    })
                } */}


            </div>

            {/* {access && <div className='flex flex-col gap-5'>
                <h1 className='text-2xl'>Shared Access</h1>
                <div className='flex flex-col gap-5'>
                    {access.length > 0 &&
                        access.map((item, i) => {
                            console.log(item.user, item.access);
                            return (
                                <div key={item} className='flex justify-between'>
                                    <p>{item}</p>

                                    <button disabled={!item.access} className='btn btn-primary'>Revoke</button>

                                </div>
                            )
                        })
                    }
                </div>
            </div>
            } */}
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
    )
}
