import axios from 'axios';
import { React, useEffect, useState } from 'react'
import styles from '../../styles/itemlist.module.css';

function RenderingArrayOfObjects() {
    axios.get(`http://localhost:3000/api/fetchItems`)
        .then((res) => {
            const listItems = res.data.map(
                (element) => {
                    console.log(element);
                    return (
                        <div className={styles.card} key={element['item_code']}>
                            <img src={element['imageUrl']} alt={element['item_name']} style={{ width: 240, height: 200 }} />
                            <div className={styles.container}>
                                <h4><b>{element['item_name']}</b></h4>
                                <p>₹{element['price']}</p>
                            </div>
                        </div>
                    )
                }
            )
            return (
                <>
                    {listItems}
                </>
            )
        })
}


const ListItems = () => {
    // var [check, setCheck] = useState([false, false, false, false]);
    const Carda = ({ imageUrl, item_name, price, check }) => (
        <>
            <div className={styles.card}>
                <img src={imageUrl} alt={item_name} style={{ width: 240, height: 200 }} />
                <div className={styles.container}>
                    <h4><b>{item_name}</b></h4>
                    <p>₹{price}</p>
                    <button className={styles.button__on} onClick={() => {
                        location.replace(`/bill?item_name=${item_name}`)
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

    return (
        <div className={styles.item__main}>
            <div className={styles.items__main_links}>
                <div className={styles.items__main_links_container}>
                    <Carda imageUrl={"https://cdn.discordapp.com/attachments/1052207477288095774/1052207673862529064/Z.png"} item_name={"Cheese Sandwich"} price={"70"} check={0} />
                    <Carda imageUrl={"https://media.discordapp.net/attachments/1052207477288095774/1052600545707294760/3831dbe2-352e-4409-a2e2-fc87d11cab0a.png"} item_name={"Cheese Burger"} price={"70"} check={1} />
                    <Carda imageUrl={"https://media.discordapp.net/attachments/1052207477288095774/1052987573137592370/1576855328048.png"} item_name={"Chicken Cutlet"} price={"90"} check={2} />
                    <Carda imageUrl={"https://cdn.discordapp.com/attachments/1052207477288095774/1052207673862529064/Z.png"} item_name={"Cheese Sandwich"} price={"90"} check={3} />
                </div>
            </div>
        </div>
    )
}

export default ListItems