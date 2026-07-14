'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from "next/navigation"



export async function signUpNewUser(username: string, email: string, password: string){
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signUp({
        email: email, 
        password: password,
        options:{
            data:{
                username: username
            } 
        }
    })
    if(error)
        console.error('sb auth error: ', error.message)
    else{
        console.log('user successfully signed up! ', data)
        redirect('/profile')
    }
}

export async function signInWithEmail(email : string, password: string){
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    })
    if(error)
        console.error('sb auth error: ', error.message)
    else{
        console.log('user successfully signed in! ', data)
        redirect('/profile')
    }
}

export async function signOut(){
    const supabase = await createClient();
    await supabase.auth.signOut();
}