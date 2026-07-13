'use client'

import { useState } from 'react';
import { SectionTabLabel } from './SectionTabLabel'

interface SectionTabProps{
    sections: string[]
}

export default function SectionTabs({sections} : SectionTabProps){
    const [activeSection, setActiveSection] = useState(sections[0]);

    return (
        <div className='flex flex-row pt-12 w-full'>
                    {sections.map((section) =>{ 
                        return (
                            <SectionTabLabel key={section} section={section} isActive={activeSection === section} onClick={() => {setActiveSection(section)}}/>
                        )
                    })}
                </div>
    )
}