'use client'
import {useTina, tinaField} from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { AboutPageQuery, AboutPageQueryVariables} from '@/tina/__generated__/types';

type Props ={
    data: AboutPageQuery,
    variables: AboutPageQueryVariables,
    query: string,
}

export default function AboutClient({data, variables, query} : Props){
    const {data: tinaData} = useTina({data, variables, query});
    const page = tinaData?.aboutPage;
    return (
        <div>
            <h1 data-tina-field={tinaField(page, 'title')} className='mt-8 text-center font-semibold tracking-tight text-primary sm:text-7xl'>
                {page.title}
            </h1>
            <h2 data-tina-field={tinaField(page, 'subtitle')} className='text-center text-2xl  font-semibold tracking-tight text-primary'>
                {page.subtitle}
            </h2>
            <div data-tina-field={tinaField(page, 'body')} className='w-2/3 mx-auto mt-8'>
                <TinaMarkdown content={page.body} />
            </div>
        </div>
    )
}