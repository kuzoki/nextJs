
import {useRouter} from 'next/router'  
import {  useContext, useState } from 'react';
import {  CountriesContext } from '../context'
export default function RandomCountry() {
    const { CountryData } = useContext(CountriesContext);
    const router = useRouter();

    const updateCountry = () => {
        const randomNumber = Math.floor(Math.random() * CountryData.length);
        router.push(`/${CountryData[randomNumber].name.common}`)
    }
  return (
    <button className='button-float' onClick={()=>updateCountry()}>Random Country You Should Visit</button>
  )
}

