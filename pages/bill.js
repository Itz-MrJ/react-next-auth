import axios from 'axios';
import React, { useEffect } from 'react'
import Navbar from '../components/navbar/Navbar'
import styles from '../styles/navbar.module.css';

const bill = () => {
    async function checkStorage() {
        axios.post(`http://localhost:3000/api/getInfo?username=${localStorage.getItem("username")}`)
        .then((res) => {
            if (localStorage.getItem('exp') == null || localStorage.getItem('exp') == 'null' || new Date(localStorage.getItem('exp')) < new Date() || localStorage.getItem('userToken')!=res.data['accessCode']) {
                location.replace('/authentication');
            }
        })
    }
  return (
    <div>
        <div className={styles.gradient__bg} onLoad={useEffect(() => {checkStorage()}, [false])}>
            <Navbar />
            <div className={styles.white__text}>Order has been placed! Pick your order up at the Food Truck in 10 mins!</div>
        </div>
    </div>
  )
}

export default bill