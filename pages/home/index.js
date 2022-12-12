
import React, { useEffect } from 'react'
import { Navbar } from '../../components';

const index = () => {
    async function checkStorage() {
        if (localStorage.getItem('exp') == null || localStorage.getItem('exp') == 'null' || new Date(localStorage.getItem('exp')) < new Date()) {
            location.replace('/authentication');
        }
    }
    return (
        <div>
            <Navbar />
            <div onLoad={useEffect(() => {checkStorage()}, [false])}></div>
            home page
        </div>
    )
}

export default index