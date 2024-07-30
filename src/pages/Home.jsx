import React from 'react'
import Account from '../components/Account'
import User from '../components/User'
import Location from '../components/Location'
import Testing from '../components/testing'

export default function Home() {
    return (
        <div className="w-screen h-screen flex">
            <Account />
            <User />
            <Location />
            <Testing />
        </div>
    )
}