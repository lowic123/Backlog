'use client'
import { useState } from 'react'
import { signUpNewUser} from '@/actions/auth'
import { Button } from '@/components/ui/button'
import Link from "next/link"


export default function SignUpPage() { 
    const [displayName, setDisplayName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e : React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        const res = await signUpNewUser(username, email, password);
    }
    
    return (
        <div>
            <h1 className='mt-8 text-balance text-5xl font-semibold tracking-tight text-primary sm:text-7xl text-center'>
                    Sign Up
                </h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-6 p-8 mt-16 w-1/2 mx-auto bg-secondary rounded-2xl' >
                <div className='w-5/6 mx-auto'>
                    <label htmlFor='username'>Username</label><br />
                    <input type='text' id='username' placeholder='Username' onChange={(e)=>setUsername(e.target.value)} className='border rounded-md pl-2 w-full'></input>
                </div>
                <div className="w-5/6 mx-auto">
                    <label htmlFor='user-email'>Email Address</label><br />
                    <input type='email' id='user-email' placeholder='valid.email@backlog.com' onChange={(e)=>setEmail(e.target.value)} className='border rounded-md pl-2 w-full  '></input>
                </div>
                <div className='w-5/6 mx-auto'>
                    <label htmlFor='user-pw'>Password</label><br />
                    <input type='password' id='user-pw' placeholder='Password123' onChange={(e) => setPassword(e.target.value)} className='border rounded-md pl-2 w-full'></input>
                </div>
                <div className=' flex flex-col text-center w-5/6 mx-auto'>
                    <Button type='submit'>
                        Sign Up
                    </Button>
                    <Button variant='link'>
                        <Link href='/auth/sign-in'>
                            Already have an account? Sign In
                        </Link>
                    </Button>
                </div>
            </form>
        </div>
    )
}
