import React, { useEffect } from 'react';
import { Navbar } from '../../components';
import styles from '../../styles/navbar.module.css';

const index = () => {
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
                angrytools.com/gradient
                animista.net
            </div>
        </div>
    )
}

export default index