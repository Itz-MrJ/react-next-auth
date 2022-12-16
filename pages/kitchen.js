import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar/Navbar';
import styles from '../styles/navbar.module.css';
import stylesa from '../styles/kitchen.module.css';

import io from 'Socket.IO-client';
import stylesb from '../styles/bill.module.css';
let socket;

const kitchen = () => {
    const [arr, setArr] = useState([]);
    const [result, setResult] = useState([]);
    // var [check, setCheck] = useState([false, false, false, false]);
    function del_all(billNumber){
        axios.post(`http://localhost:3000/api/delOrder?billNumber=${billNumber}&accessToken=${localStorage.getItem('accessToken')}`)
        .then(res => {
            console.log(res);
        })
    }
    const Carda = ({ code, item_name, price, check, username, billNumber}) => (
        <>
            <div className={stylesa.card}>
                <span>#{billNumber}&nbsp;&nbsp;{username}</span>
                <div className={stylesa.container}>
                    <h4><b>{item_name}</b></h4>
                    <p>{code}</p>
                    <button className={stylesa.button__on} onClick={() => {
                        del_all(billNumber);
                    }}>Done</button>
                </div>
            </div>
        </>
    )
    useEffect(() => {
        fetch(`http://localhost:3000/api/getOrders?accessToken=${localStorage.getItem('userToken')}`, {method: "POST"})
            .then(res => res.json())
            .then(json => {
                console.log(json);
                setArr(json)
            })
    }, [false])

    return (
        <div onLoad={useEffect(() => {
            axios.post(`http://localhost:3000/api/getInfo?username=${localStorage.getItem("username")}`)
                .then((res) => {
                    if (localStorage.getItem('userToken') != res.data['accessCode'] && localStorage.getItem('user') != 'kitchen') {
                        location.replace('/authentication');
                    }
                })
        })}>
            <Navbar />
            <div className={stylesa.item__main}>
                <div className={stylesa.items__main_links}>
                    <div className={stylesa.items__main_links_container}>
                        {arr.map(item => {
                            return <Carda imageUrl={item['imageUrl']} item_name={item['item_name']} username={item['username']} code={item['code']} billNumber={item['orderNumber']}/>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default kitchen