import {useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import jwt from 'jsonwebtoken'

const secret_key = 'nextmarket'

const useAuth = () => {
    const [loginUser, setLoginUser] = useState('')
    const router = useRouter()
    
    //ページが読み込まれる前に行いたい処理はuseEffectを使用する
    //編集や削除が行われる前にトークンを調べてログイン状態の確認を行うため
    //useEffectにトークンを確認する処理を書く
    useEffect(()=>{
        const token = localStorage.getItem('token')

        if(!token){
            router.push('/user/login')
        }
        try{
            const decoded = jwt.verify(token,secret_key)
            setLoginUser(decoded.email)
        }catch(error){
            router.push('/user/login')
        }
    },[router])

    return loginUser
}

export default useAuth