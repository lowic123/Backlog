'use client'
import { useState } from 'react'
import {signInWithEmail } from '@/actions/auth'
import { Button } from "@/components/ui/button"
import  Link  from 'next/link'


export default function SignInPage() { 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e : React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        const res = await signInWithEmail(email, password);
    }
    
    return (
        <div>
            <h1 className='mt-8 text-balance text-5xl font-semibold tracking-tight text-primary sm:text-7xl text-center'>
                Sign In
            </h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-6 p-8 mt-16 w-1/2 mx-auto bg-secondary rounded-2xl' >
                <div className="w-5/6 mx-auto">
                    <label htmlFor='user-email'>Email Address</label><br />
                    <input type='email' id='user-email' placeholder='valid.email@backlog.com' onChange={(e)=>setEmail(e.target.value)} className='border rounded-md pl-2 w-full  '></input>
                </div>
                <div className='w-5/6 mx-auto'>
                    <label htmlFor='user-pw'>Password</label><br />
                    <input type='password' id='user-pw' placeholder='Password123' onChange={(e) => setPassword(e.target.value)} className='border rounded-md pl-2 w-full'></input>
                </div>
                <div className=' flex flex-col w-5/6 mx-auto text-center'>
                    <Button type='submit'>
                        Sign In
                    </Button>
                    <Button variant='link'>
                        <Link href='/auth/sign-up'>
                            No Account? Sign Up
                        </Link>
                    </Button>
                </div>
            </form>
        </div>
    )
}
