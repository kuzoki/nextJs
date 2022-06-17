import Link from 'next/link';
import Image from 'next/dist/client/image';
import {  useContext } from 'react'
import {  CountriesContext } from '../context'
export default function Nav() {
    
 const { srcNav } = useContext(CountriesContext);
  return (
    <div className="top-bar">
        <div className='container'>
            <h2  className='heading-2'>Where in the world?</h2>
            <Image src={`/images/${srcNav}`} width='60' height='60' alt="icon" />
        </div>
    </div>
  )
}
