import Link from "next/link";


const navElems = ['Home', 'Trending', 'Favorites','Reviews', 'Profile']

export default function Navbar() {
  return (
    <div className='flex w-full'>
      {navElems.map((e) => (
        <Link className='w-1/4 p-4 text-center border-b font-bold hover:border-gray-500 transition-colors duration-200' key={e} href={e === 'Home'? '/' : `/${e.toLowerCase()}`}>
            {e}
        </Link>
      ))}
    </div>
  );
}