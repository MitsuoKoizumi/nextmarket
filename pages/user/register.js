import { NextFetchEvent } from "next/server"
import {useState} from 'react'
import Head from 'next/head'

const Register = () => { 

    const [newUser, setNewUser] = useState({
        name:'',
        email:'',
        password:'',
    })
    
    
    const handleChange = (event) => {
        setNewUser({
            ...newUser,
            [event.target.name]:event.target.value,
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault() //submit時に画面をリロードさせない
        try{
            //fetchはデータの送信にも使える
            const response = await fetch('http://localhost:3000/api/user/register',{
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(newUser)
        })

        const jsonData = await response.json() //レスポンスをjsonデータに変換する
        console.log(jsonData)
        alert(jsonData.message)
        }catch(e){
            alert('ユーザ登録失敗')
        }
    }
    return (
        <div>
            <Head><title>ユーザ登録</title></Head>
            <h1 className='page-title'>ユーザ登録</h1>
            <form onSubmit={handleSubmit}>
                <input value={newUser.name} type="text" name="name" placeholder="名前" 
                    onChange={handleChange} required/>
                <input value={newUser.email} type="text" name="email" placeholder="メールアドレス" 
                    onChange={handleChange} required/>
                <input value={newUser.password}type="text" name="password" placeholder="パスワード"
                    onChange={handleChange} required/>
                <button>登録</button>
            </form>
        </div>
    )
}
export default Register