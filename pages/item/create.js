import {useState} from 'react'
import useAuth from '../../utils/useAuth'
import Head from 'next/head'
import ImgInput from '../../components/imgInput'

const CreateItem = () =>{

    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')

    const handleSubmit = async (event) =>{
        event.preventDefault()
        try{
            const response = await fetch('http://localhost:3000/api/item/create', {
                method:'POST',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body:JSON.stringify({
                    title:title,
                    price:price,
                    image:image,
                    description:description
                })
            })
            const jsonData = await response.json()
            alert(jsonData.message)
        }catch(err){
            alert('アイテム作成失敗')
        }
    }

    const loginUser = useAuth()
    
    if(loginUser){
        return (
            <div>
                <Head><title>アイテム作成</title></Head>
                <h1 className='page-title'>アイテム作成</h1>
                <form onSubmit={handleSubmit}> 
                    <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} name='title' placeholder='アイテム名' required/>
                    <input type='text' value={price} onChange={(e) => setPrice(e.target.value)} name='price' placeholder='価格' required/>
                    <input type='text' value={image} onChange={(e) => setImage(e.target.value)} name='image' placeholder='がぞう' required/>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} name='description' rows={15} placeholder='商品説明' required></textarea>
                    <button>作成</button>
                </form>
            </div>
        )
    }
}

export default CreateItem