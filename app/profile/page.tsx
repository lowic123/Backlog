import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import SectionTabs from "./sectionTab"
import { Button } from "@/components/ui/button"
import { signOut } from "@/actions/auth"  
 
const sections = ["Favourites", "Lists", "Reviews"]


export default async function ProfilePage() { 
    const supabase = await createClient();

    const {data :{user},} = await supabase.auth.getUser();

    if(!user)
        redirect('/auth/sign-in')

    const username: string = user.user_metadata.username ;
    return (
        <div className='bg-gray-200'>
            <div className='relative w-5/6 mx-auto z-[1] pt-16'>
                <h1 className="mt-8 text-balance text-5xl font-semibold tracking-tight text-primary sm:text-7xl">
                    Welcome, {username}
                </h1>
                <div className='flex flex-col px-6  gap-2'>
                    <p className="font-bold">{user.email}</p>
                    <Button className='w-1/8 mx-left' variant='destructive' onClick={await signOut}>
                        Sign Out
                    </Button>
                </div>
                <SectionTabs sections={sections}/>
            </div>
        </div>
    ) 
}


