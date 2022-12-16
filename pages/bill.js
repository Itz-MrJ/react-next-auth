import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar/Navbar';
import styles from '../styles/navbar.module.css';
import io from 'Socket.IO-client';
import stylesa from '../styles/bill.module.css';
let socket;

const bill = () => {
    const [message, setMessage] = useState("");
    const [username, setUsername] = useState("");
    const [orderNumber, setOrdern] = useState("");
    const [itemName, setItemName] = useState("");
    const [code, setCode] = useState("");
    // fetch('/api/kitchen');
    // socket = io();
    // socket.on('connect', () => {
    // })
    // socket.on('RECEIVED', msg => {
    //     console.log(msg);
    // })
    // socket.emit('ORDER', router.query);

    async function checkStorage() {
        axios.post(`http://localhost:3000/api/getInfo?username=${localStorage.getItem("username")}`)
            .then((res) => {

                if (localStorage.getItem('exp') == null || localStorage.getItem('exp') == 'null' || new Date(localStorage.getItem('exp')) < new Date() || localStorage.getItem('userToken') != res.data['accessCode']) {
                    return location.replace('/authentication');
                }
                axios.post(`http://localhost:3000/api/newOrder?username=${localStorage.getItem("username")}&item_name=${localStorage.getItem('item_name')}`)
                    .then(res =>{
                        if(res.data){
                            console.log(res.data);
                            alert("✅ Successfully placed your order!");
                            setMessage("Successfully placed your order");
                                setUsername(res.data['username']);
                                setOrdern(res.data['orderNumber']);
                                setItemName(res.data['item_name']);
                                setCode(res.data['code']);
                        }
                        else location.replace('/home');
                        // setUsername("aarya");
                        // setOrdern(18);
                        // setItemName("Cheese Sandwich");
                        // setCode(999999);
                        localStorage.setItem('item_name', null);
                    })
            })
    }
    return (
        <div>
            <div className={styles.gradient__bg} onLoad={useEffect(() => { 
                    checkStorage();
                }, [false])}>
                <Navbar />
                <div className={stylesa.bill__main}>
                    <div className={stylesa.bill__container}>
                        <span>Username:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{username}</span>
                        <p>Order Number:&nbsp;&nbsp;{orderNumber}</p>
                        <p>Item&nbsp;Name:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{itemName.replace(/ /g, '\u00a0')}</p>
                        <p>Code:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{code}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default bill