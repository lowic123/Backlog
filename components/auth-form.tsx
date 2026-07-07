import { signUpNewUser, signInWithEmail } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'

interface AuthFormProps{
    isSignIn : boolean
}

export default function AuthForm({isSignIn} : AuthFormProps){
    return(
        <div className='flex flex-col gap-6 p-8 mt-16 w-1/2 mx-auto bg-secondary rounded-2xl' >
            <div className="w-5/6 mx-auto">
                <label htmlFor='user-email'>Email Address</label><br />
                <input type='email' id='user-email' placeholder='valid.email@backlog.com' className='border rounded-md pl-2 w-full  '></input>
            </div>
            <div className='w-5/6 mx-auto'>
                <label htmlFor='user-pw'>Password</label><br />
                <input type='password' id='user-pw' placeholder='Password123' className='border rounded-md pl-2 w-full'></input>
            </div>
            <div className='text-center'>
                <Button className='content-center' onClick={()=>{
                        if(!isSignIn)
                            signUpNewUser()
                        else
                            signInWithEmail()
                    }}>
                    {isSignIn? 'Sign In': 'Sign Up'}
                </Button>
            </div>
        </div>
    )
}