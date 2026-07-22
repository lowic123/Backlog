'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function SectionTabs({sections} : {sections: string[]}){
    const searchParams = useSearchParams();
    const activeSection = searchParams.get('tab') || sections[0];
    return (
        <div className='flex flex-row pt-12 w-full'>
                    {sections.map((section) => (
                        <Link
                            key={section}
                            href={`?tab=${section}`}
                            scroll={false}
                            className={`w-1/3 p-2 text-center ${activeSection === section? 'border-b-2 bordedr-primary font-bold' : ''}`}
                        >
                            {section}
                        </Link>
                    ))}
                </div>
    )
}