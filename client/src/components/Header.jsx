import { useAuth, useUser } from '@clerk/clerk-react';
import React from 'react'

export default function Header() {
    const { user } = useUser()
    const { signOut } = useAuth()
    const shortenAddress = (address, startLength = 8, endLength = 4) => address.length <= startLength + endLength ? address : `${address.substring(0, startLength)}...${address.substring(address.length - endLength)}`;
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a className="btn btn-ghost normal-case text-xl">Blockdrive</a>
            </div>
            <div className="flex-none">
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img src={user.imageUrl} />
                        </div>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {/* <li>
                    <a className="justify-between">
                        Profile
                        <span className="badge">New</span>
                    </a>
                </li>
                <li><a>Settings</a></li> */}
                        <li>
                            <a href="">
                                {shortenAddress(user.primaryWeb3Wallet.web3Wallet)}
                            </a>
                        </li>
                        <li><button
                            onClick={() => signOut()}
                        >Logout</button></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
