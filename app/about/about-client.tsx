'use client'
import {useTina, tinaField} from 'tinacms/dist/react'
import { AboutPageQuery, AboutPageQueryVariables} from '@/tina/__generated__/types'

type Props ={
    data: AboutPageQuery,
    variables: AboutPageQueryVariables,
    query: string,
}

export default function AboutPage({data, variables, query} : Props){
    const {data: tinaData} = useTina({data, variables, query});
    console.log(data)
    console.log(tinaData)
    const page = tinaData?.aboutPage;
    return (
        <h1 data-tina-field={tinaField(page, 'title')}>
            {page?.title}
        </h1>
    )
}