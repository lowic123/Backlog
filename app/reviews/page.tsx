'use client'
import { useState } from 'react';
import { Button } from '@/components/ui/button' 
import { createReview } from '@/actions/reviews'


export default function ReviewPage(){
    const [review, setReview] = useState("");
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        await createReview(1, 5, review);
    }

    return (
        <div>
            <h1 className="mt-8 text-center text-5xl font-semibold tracking-tight text-primary sm:text-7xl">
                Reviews
            </h1>
            <form onSubmit={handleSubmit} className ='flex flex-col gap-6 p-8 mt-16 w-1/2 mx-auto bg-secondary rounded-2xl'>
                <label className='flex flex-col gap-6 font-bold' htmlFor="review-text"> Write your review: <textarea id='review-text' rows={5} className='p-4 font-normal border rounded' onChange={(e) => setReview(e.target.value)}></textarea></label>
                <Button type='submit'>Submit Review</Button> 
            </form>
        </div>  
    )
}