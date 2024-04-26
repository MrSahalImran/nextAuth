import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import {NextResponse,NextRequest} from 'next/server'
import bcryptjs from 'bcryptjs'
import { sendEmail } from '@/helpers/mailer'

connect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {username,email,password} = reqBody;
        // validation
        console.log(reqBody)
        
        const exitingUser = await User.findOne({username})
        if(exitingUser){
            return NextResponse.json({message:'user already exists'},{status:400})
        }
        const exitingEmail = await User.findOne({email})
        if(exitingEmail){
            return NextResponse.json({message:'email already exists'},{status:400})
        }
        
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password,salt);

        const newUser = new User({
            username,
            email,
            password:hashedPassword
        })

        const savedUser = await newUser.save()
        console.log(savedUser)

        // send verification email
        
        await sendEmail({email,emaiType:"VERIFY",userId:savedUser._id})

        return NextResponse.json({
            message:'user registered successfully',
            success:true,
            savedUser
        })

    } catch (error:any) {
        return NextResponse.json({ error: error.message},{status:500})
    }
}