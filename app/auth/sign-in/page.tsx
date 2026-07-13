'use client'
import { useState } from 'react'
import {signInWithEmail } from '@/actions/auth'
import { Button } from "@/components/ui/button"


export default function SignInPage() { 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e : React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        const res = await signInWithEmail(email, password);
    }
    
    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-6 p-8 mt-16 w-1/2 mx-auto bg-secondary rounded-2xl' >
            <div className="w-5/6 mx-auto">
                <label htmlFor='user-email'>Email Address</label><br />
                <input type='email' id='user-email' placeholder='valid.email@backlog.com' onChange={(e)=>setEmail(e.target.value)} className='border rounded-md pl-2 w-full  '></input>
            </div>
            <div className='w-5/6 mx-auto'>
                <label htmlFor='user-pw'>Password</label><br />
                <input type='password' id='user-pw' placeholder='Password123' onChange={(e) => setPassword(e.target.value)} className='border rounded-md pl-2 w-full'></input>
            </div>
            <div className='text-center'>
                <button type="submit" className='content-center'>
                    Sign In
                </button>
            </div>
        </form>
    )
}
