import React, { useEffect, useState } from 'react'
import styles from '../../styles/auth.module.css'


const index = () => {
    const [user, setUser] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [password, setPassword] = useState('');
    function clearStorage(){
        localStorage.setItem('username', null);
        localStorage.setItem('exp', null);
        localStorage.setItem('userToken', null);
        setDisabled(false);
    }
    async function checkAuthenticated() {
        if (localStorage.getItem('username') == 'null' || localStorage.getItem('username') == null) return setDisabled(false);
        if (localStorage.getItem('exp') == null || localStorage.getItem('exp') == 'null' || new Date(localStorage.getItem('exp')) < new Date()) {
            clearStorage()
        }
        await fetch(`/api/auth/check?username=${localStorage.getItem('username')}`, { method: 'POST', body: localStorage.getItem('userToken') })
            .then((res) => res.json())
            .then((json) => {
                if (json['code'] == "CHECK01") { alert(json['message']); return; }
                if (json['code'] == 'CHECK02') { 
                    if(localStorage.getItem('username')!=null || localStorage.getItem('username')!='null')
                    alert(json['message']);
                    clearStorage();
                    alert("⚠ Session expired"); 
                    return; 
                }
                if (json['code'] == "INVALID01") {
                    clearStorage();
                    alert("⚠ Session expired");
                    return;
                }
                location.replace('/home')
            })
    }
    // checkAuthenticated();
    async function submitbruh() {
        setDisabled(true);
        console.log(user, password)
        if (user.toString().split(' ').length > 1 || password.toString().split(' ').length > 1) { alert("Neither username nor password can contain white spaces.");setDisabled(false); return; }
        if (user.length < 4 || password.length < 8) { alert("Username should contain more than 4 characters & Password more than 8 characters.");setDisabled(false); return }
        if (user == null || password == null || user == 'null') return setDisabled(false);
        await fetch(`/api/auth/new?username=${user}&password=${password}`, { method: 'POST' })
            .then((res) => res.json())
            .then((json) => {
                console.log(json);
                if (json['code'] == "AUTH01") { alert(json['message']); setDisabled(false); return; }
                if (json['code'] == 'AUTH02') { alert(json['message']); setDisabled(false); return; }
                localStorage.setItem('username', user);
                localStorage.setItem('userToken', json['accessCode']);
                localStorage.setItem('exp', json['exp'])
                alert(json['message']);
                setDisabled(false);
                location.replace('/home');
            })
    }

    // fetch('http://localhost:3000/api/hello')
    //     .then((res) => res.json())
    //     .then((json) => {
    //         console.log(json)
    //     })
    return (
        <div>
            <div className={styles.center}>
                <div onLoad={useEffect(() => {checkAuthenticated();return;}, [false])}>

                    Username:
                </div>
                <input disabled={disabled} name='Username' placeholder='Username' value={user} maxLength={12} minLength={4} id='username' onChange={(ee) => setUser(ee.target.value)}></input>
                <div>
                    Password:
                </div>
                <input disabled={disabled} name='Password' placeholder='Password' value={password} maxLength={12} minLength={8} id='password' onChange={(ee) => setPassword(ee.target.value)}></input>

                <button disabled={disabled} onClick={submitbruh}>Submit</button>
            </div>
        </div>
    )
}

export default index