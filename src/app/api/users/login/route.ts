import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import {NextResponse,NextRequest} from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
connect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {email,password} = reqBody
        // validate
        console.log(reqBody)

        const user = await User.findOne({ email })

        if(!user){
            return NextResponse.json({message:'user does not exist'},{status:400})
        }

        console.log("user found")

        const validPassword = bcrypt.compare(password,user.password)

        if(!validPassword){
            return NextResponse.json({message:'invalid password'},{status:400})
        }

        const tokenData = {
            id:user._id,
            username:user.username,
            email:user.email
        }

        const token = jwt.sign(tokenData,process.env.JWT_SECRET!,{expiresIn:'1d'})

        const response = NextResponse.json({
          message:"Logged In successfully",
          success:true,

        })
        response.cookies.set("token",token,{
            httpOnly:true,
        })
        return response




    } catch (error:any) {
        return NextResponse.json({ error: error.message},{status:500})
    }
}