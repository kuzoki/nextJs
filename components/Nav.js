import Link from 'next/link';
import Image from 'next/dist/client/image';
import {  useContext } from 'react';
import {  CountriesContext } from '../context';
import RandomCountry from '../components/randomCountry'
export default function Nav() {
    
 const { srcNav } = useContext(CountriesContext);
  return (
    <div className="bg-white py-4 mb-12">
        <div className='container mx-auto flex flex-row justify-between items-center'>
            <h2  className='text-black font-semibold text-lg'>Know About The World</h2>
            <div className='flex items-center'>
              <RandomCountry />
              <Link href='/quiz' ><div className='nav-link'>Flag Quiz</div></Link>
              <Image src={`/images/${srcNav}`} className='w-12' width='60' height='60' alt="icon" />
            </div>        
        </div>
    </div>
  )
}
