import React from 'react'
import { RoughNotationGroup, RoughNotation } from "react-rough-notation"
import { Link } from 'react-router-dom'
export default function Landing() {
    return (
        <div className='flex items-center justify-center flex-col gap-5'>
            <h1 className='text-8xl font-black uppercase'>Block Drive</h1>
            <h2 className='font-black text-2xl'>Gain Control Over Your Data, Avoid
            <RoughNotation type='crossed-off' show className="mx-2">
                    Data Breaches
            </RoughNotation>
            </h2>
            <RoughNotationGroup show>
                <div className='flex flex-wrap gap-2'>

                    WEB3 Cloud Storage Platform on Ethereum, Built with
                    <RoughNotation>
                        Pinata
                    </RoughNotation>
                    for
                    <RoughNotation type='box'>
                        Inter Planetary File System
                    </RoughNotation>
                    file storage,
                    <RoughNotation type='underline'>
                        Solidity
                    </RoughNotation>
                    for Smart Contracts,
                    <RoughNotation type='underline'>
                        React
                    </RoughNotation>
                    for Frontend and
                    <RoughNotation type='underline'>
                        HardHat
                    </RoughNotation>
                    for Backend, Deployed on the
                    <RoughNotation type='underline'>
                        Sepolia Test Network
                    </RoughNotation>
                    Using
                    <RoughNotation type='box'>
                        Alchemy
                    </RoughNotation>

                </div>
            </RoughNotationGroup>
            <Link to='/cloud' className='btn btn-primary'>Get Started</Link>

        </div>
    )
}
