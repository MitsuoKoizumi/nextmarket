import { Types } from "mongoose"
import { NextApiRequest } from "next"

//SchemaModels.ts
export interface ItemDataType{
    title:String
    image:String
    price:String
    description:String
    email:String
}

export interface UserDataType{
    name:String
    email:String
    password:String
}

//auth.ts
export interface DecodedType{
    email:string
}

export interface ExtendedNextApiRequest extends NextApiRequest{
    headers:{
        authorization:string
    }
    body:{
        name:string
        email:string
        password:string
    }
}

//Common
export interface ResMessageType{
    message:string
    token?:string
}

export interface ExtendedNextApiRequestUser extends NextApiRequest{
    body:UserDataType
}

export interface savedUserDataType extends UserDataType{
    _id:Types.ObjectId
}

export interface SavedItemDataType extends ItemDataType{
    _id:Types.ObjectId
}

export interface ResReadAllType{
    message:string
    allItems?:SavedItemDataType[]
}

export interface ExtendedNextApiRequestItem extends NextApiRequest{
    body:ItemDataType
}

export interface ResReadSingleType{
    message:string
    singleItem?:SavedItemDataType
}
