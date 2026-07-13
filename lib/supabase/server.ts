'use server'
import {createClient} from "@supabase/supabase-js"

const supabase = createClient("https://cwrkkhexgvydpafaxals.supabase.co", process.env.NEXT_PUBLIC_SB_PUBLISHABLE || "")

export async function signUpNewUser(){
    const { data, error } = await supabase.auth.signUp({
        email: 'valid.email@supabase.co', 
        password: 'example-password',
    })
    if(error)
        console.error('sb auth error: ', error.message)
    else
        console.log('user successfully signed up! ', data)
}

export async function signInWithEmail(){
    const { data, error } = await supabase.auth.signInWithPassword({
        email: 'valid.email@supabase.co',
        password: 'example-password'
    })
    if(error)
        console.error('sb auth error: ', error.message)
    else
        console.log('user successfully signed in! ', data)
}