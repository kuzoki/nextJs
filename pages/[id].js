
import {useRouter} from 'next/router'  
import Link from 'next/link'  
import {  useContext, useEffect, useState } from 'react';
import {  CountriesContext } from '../context'
import Image from 'next/dist/client/image';

export default function Single(){
    const router = useRouter();
    const { CountryData } = useContext(CountriesContext);
    const [country, setCountry] = useState([]);
    
    
    useEffect(()=>{
      if (router.query.id != undefined){
        const getData = async() =>{
            const res = await fetch(`https://restcountries.com/v3.1/name/${router.query.id}?fullText=true`);
            const newData = await res.json();
            setCountry(newData);
        }
        getData();
        } 
    },[router]);
    
    
    const updateCountry = (e) =>{
      CountryData.forEach(data => {
        if(e === data.cca3) {
          router.push(`/${data.name.common}`)
        }
      });
    }
    return(
      
      <div className="container mx-auto">
          <div className=''>
            <Link href='/' ><div className='btn-simple mb-8'><i className="fa-solid fa-arrow-left-long mr-4" data-v-5455f2a1=""></i>Back Home</div></Link>
            {country ? country.map((country, i)=>(
              <div className='grid grid-cols-2 gap-4' key={i}>
                <div>
                  {country.flags.svg ? <Image className='w-full mb-4' width='600' height='400' src={country.flags.svg} alt="ima"></Image>:<></> }
                  {country.coatOfArms.svg ? <Image className='w-full' width='600' height='400' src={country.coatOfArms.svg} alt="ima"></Image>:<></> }
                </div>
                <div className=''>
                  <h4 className='font-bold text-4xl mb-10'>{country.name.common}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-8">
                      <div className='flex flex-col'>
                        <p className="inline-block py-1 text-sm text-gray-700 mr-2 mb-2">
                          <span className='font-semibold'>Official Name: </span>{country.name.official}
                        </p>
                        <p className="inline-block py-1 text-sm text-gray-700 mr-2 mb-2">
                          <span className='font-semibold'>Population: </span>{ Number(country.population).toLocaleString()}
                        </p>
                        <p className="inline-block py-1 text-sm text-gray-700 mr-2 mb-2">
                          <span className='font-semibold'>Region:</span> { country.region }
                        </p>
                        <p className="inline-block py-1 text-sm  text-gray-700 mr-2 mb-2">
                         <span className='font-semibold'>Capital:</span> { country.capital }
                        </p>
                      </div>
                      <div className='flex flex-col'>
                        <p className="inline-block py-1 text-sm text-gray-700 mr-2 mb-2">
                         <span className='font-semibold'>Top Level Domain:</span> { country.tld[0] }
                        </p>
                        <p className="inline-block py-1 text-sm text-gray-700 mr-2 mb-2">
                         <span className='font-semibold'>Currencies:</span> {  Object.values(country.currencies)[0].name}
                        </p>
                        <div className="inline-block py-1 text-sm text-gray-700 mr-2 mb-2"><span className='font-semibold'>Languages: </span>
                          {Object.values(country.languages).map((val,i)=>(<span key={i} >{val}</span>))}
                        </div>
                      </div>
                  </div>
                  <div className="w-full flex flex-row mb-8">
                        <div className="inline-block py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Borders:</div>
                        <div className='flex flex-row flex-wrap	'>
                        { 
                          country.borders ? country.borders.map((val)=>(<span  key={val} 
                            className="btn-rounded" 
                            onClick={()=>updateCountry(val)}>{val}</span>)) : <span className="text-base rounded-full bg-white px-4 py-2 text-gray-700">Have no Borders</span>
                        }
                        </div>
                  </div>
                  {country.maps.googleMaps ?
                    <div className='btn-rounded inline-block'>
                      <a href={country.maps.googleMaps} target="_blank" rel="noreferrer"> Check The country on Google Map:  <i className="fa-solid fa-map-location-dot"></i></a>
                    </div> : <></>
                  }
                  
                </div>
              </div>
            )):<></>}
              
              
          </div>
      </div>
    )
}
