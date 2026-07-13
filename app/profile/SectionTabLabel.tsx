export function SectionTabLabel({ section, isActive, onClick }: { section: string; isActive: boolean; onClick: React.MouseEventHandler<HTMLButtonElement>; }) {
    return (
        <button className='w-1/3' type='button' onClick={onClick}>
            <h2 className={`px-12 pb-6 border-b hover:border-gray-500 transition-colors duration-200 ${isActive ? 'border-gray-500' : 'border-0'}`}>{section}</h2>
        </button>
    );
}
