import React, { useEffect } from 'react';
import { Navbar, ListItems } from '../../components';
import styles from '../../styles/navbar.module.css';
import io from 'Socket.IO-client';
let socket;

const index = () => {
    {// useEffect(() => {
    //     console.log("heeree")
    //     fetch('/api/socket');
    //     socket = io();

    //     socket.on('connect', () => {
    //         console.log('connected')
    //     })
    //     socket.on('RECEIVED', msg =>{
    //         console.log(msg);
    //     })
    //     socket.emit('check','amazing');
    // }
    // , [false])
    }
    async function checkStorage() {
        if (localStorage.getItem('exp') == null || localStorage.getItem('exp') == 'null' || new Date(localStorage.getItem('exp')) < new Date()) {
            location.replace('/authentication');
        }
    }
    return (
        <div>
            <div className={styles.gradient__bg}>
                <Navbar />
                <div onLoad={useEffect(() => {checkStorage()}, [false])}></div>
                <ListItems />
                angrytools.com/gradient
                animista.net
            </div>
        </div>
    )
}

export default index