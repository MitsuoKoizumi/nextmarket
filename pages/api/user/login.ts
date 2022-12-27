import jwt from 'jsonwebtoken'
import {NextApiResponse} from 'next'
import connectDB from '../../../utils/database'
import { UserModel } from '../../../utils/schemaModels'
import { ExtendedNextApiRequest, ResMessageType, savedUserDataType } from '../../../utils/types'

const secret_key = 'nextmarket'

const loginUser = async (req:ExtendedNextApiRequest,res:NextApiResponse<ResMessageType>) => {
    try{
        await connectDB()
        const savedUserData:savedUserDataType | null = await UserModel.findOne({email:req.body.email})
        if (savedUserData){
            if(req.body.password == savedUserData.password){
                const payload = {
                    email:req.body.email
                }            
                const token = jwt.sign(payload, secret_key, {expiresIn:'23h'})
                return res.status(200).json({message:"ログイン成功", token:token})
            }else{
                return res.status(400).json({message:"ログイン失敗：パスワードが間違っています"})
            }
        }else{
            return res.status(400).json({message:"ログイン失敗:ユーザが存在しません"})
        }
    }catch(err){
        return res.status(400).json({message:'ログイン失敗'})
    }
}
export default loginUser
