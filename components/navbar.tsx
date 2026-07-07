import Link from "next/link";


const navElems = ['Home', 'Trending', 'Favorites', 'Profile']

export default function Navbar() {
  return (
    <div className='flex w-full'>
      {navElems.map((e) => (
        <Link className='w-1/4 p-4 text-center border-1' key={e} href={e === 'Home'? '/' : `/${e.toLowerCase()}`}>
            {e}
        </Link>
      ))}
    </div>
  );
}