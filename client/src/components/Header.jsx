import React, { useState } from 'react'

export default function Header({ account, contract }) {
    console.log(account);
    const [address, setAddress] = useState("");
    const handleShare = async () => {
        await contract.allow(address);
        document.getElementById('my_modal_1').close();
    }
    const handleRevoke = async () => {
        await contract.disallow(address);
        document.getElementById('my_modal_2').close();
    }

    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a className="btn btn-ghost normal-case text-xl">BlockDrive</a>
            </div>
            <div className="flex-none">
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img src="https://api.dicebear.com/7.x/pixel-art/svg" className='w-10 h-10' />
                        </div>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box ">
                        <li>
                            {account ? (
                                <a>{account}</a>
                            ) : (
                                <a>Connect Wallet</a>
                            )}

                        </li>
                        <li><button onClick={() => document.getElementById('my_modal_1').showModal()}>Share Access</button></li>
                        <li><button onClick={() => document.getElementById('my_modal_2').showModal()}>Revoke Access</button></li>
                    </ul>
                </div>
            </div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            {/* <button className="btn" >open modal</button> */}
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>

                    <h3 className="font-bold text-lg">Share Access</h3>
                    <p className="py-4">Enter Wallet Address Of Reciever</p>
                    <input type="text"
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="0x00....000"
                        className="input w-full max-w" />
                    <button
                        onClick={handleShare}
                        className='btn btn-primary mt-3'>Share Access</button>
                </div>
            </dialog>
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>

                    <h3 className="font-bold text-lg">Revoke Access</h3>
                    <p className="py-4">Enter Wallet Address To Be Revoked</p>
                    <input type="text"
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="0x00....000"
                        className="input w-full max-w" />
                    <button
                        onClick={handleRevoke}
                        className='btn btn-primary mt-3'>Revoke Access</button>
                </div>
            </dialog>
        </div>
    )
}
