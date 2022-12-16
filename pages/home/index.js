import React, { useEffect } from 'react';
import { Navbar, ListItems } from '../../components';
import styles from '../../styles/navbar.module.css';
import io from 'Socket.IO-client';
import axios from 'axios';

let socket;

const index = () => {
    
    async function checkStorage() {
        axios.post(`http://localhost:3000/api/getInfo?username=${localStorage.getItem("username")}`)
            .then((res) => {
                if (localStorage.getItem('exp') == null || localStorage.getItem('exp') == 'null' || new Date(localStorage.getItem('exp')) < new Date() || localStorage.getItem('userToken') != res.data['accessCode']) {
                    location.replace('/authentication');
                }
            })
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