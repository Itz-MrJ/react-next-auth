import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar/Navbar';
import styles from '../styles/navbar.module.css';
import io from 'Socket.IO-client';
import stylesa from '../styles/bill.module.css';
let socket;

const kitchen = () => {
    const [arr, setArr] = useState([]);
    const [result, setResult] = useState([]);
    // var [check, setCheck] = useState([false, false, false, false]);
    const Carda = ({ imageUrl, item_name, price, check }) => (
        <>
            <div className={styles.card}>
                <img src={imageUrl} alt={item_name} style={{ width: 240, height: 200 }} />
                <div className={styles.container}>
                    <h4><b>{item_name}</b></h4>
                    <p>₹{price}</p>
                    <button className={styles.button__on} onClick={() => {
                        console.log(item_name);
                        localStorage.setItem('item_name', item_name);
                        location.replace(`/bill`);
                    }}>Place Order</button>
                    {/* <div className={false ? styles.quantity__off : styles.quantity__on}>
                            <a href="#" className={styles.quantity__minus} onClick={() => {
                                products[check]--;
                                console.log(products);
                            }}><span>-</span></a>
                            <input name="quantity" type="text" className={styles.quantity__input} value={products[check]} />
                            <a href="#" className={styles.quantity__plus} onClick={() => {
                                if (products[check] >= 5) alert("Too many items added!")
                                else {
                                    products[check]++;
                                    console.log(products);
                                }
                            }}><span>+</span></a>
                        </div> */}
                </div>
            </div>
        </>
    )
    // axios.get(`http://localhost:3000/api/fetchItems`)
    //     // .then(res =>{
    //     //     console.log(res.data)
    //     //     res.data.forEach(ele => {

    //     //             arr.push(<Carda imageUrl={"https://cdn.discordapp.com/attachments/1052207477288095774/1052207673862529064/Z.png"} item_name={"Cheese Sandwich"} price={"70"} check={0} />);
    //     //             // arr.push(<Carda imageUrl={ele['imageUrl']} item_name={ele['item_name']} price={ele['prddfice']}/>)
    //     //     })
    //     // })
    //     .then(data => {
    //         return data
    //     })

    useEffect(() => {
        fetch(`http://localhost:3000/api/fetchItems`)
            .then(res => res.json())
            .then(json => setArr(json))
    }, [false])

    return (
        <div onLoad={useEffect(() => {
                axios.post(`http://localhost:3000/api/getInfo?username=${localStorage.getItem("username")}`)
                .then((res) => {
                    console.log(localStorage.getItem('userToken') != res.data['accessCode'], localStorage.getItem('user')!='kitchen')
                    if (localStorage.getItem('userToken') != res.data['accessCode'] || localStorage.getItem('user')!='kitchen') {
                        location.replace('/authentication');
                    }
                })
        })}>
            <div className={styles.item__main}>
                <div className={styles.items__main_links}>
                    <div className={styles.items__main_links_container}>
                        {arr.map(item => {
                            return <Carda imageUrl={item['imageUrl']} item_name={item['item_name']} price={item['price']} />
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default kitchen