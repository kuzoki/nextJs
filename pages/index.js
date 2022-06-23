
import {  useContext, useEffect, useState } from 'react';
import  Link  from 'next/link';
import Image from 'next/dist/client/image';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {  CountriesContext } from '../context';

export default function Home() {
  const { CountryData, changeIcon} = useContext(CountriesContext);
  const [region, setRegion] = useState('all');
  const [data, setData] = useState([]);
  const [query, setQuery] = useState([]);
  useEffect(()=>{
    setData(CountryData);
  },[CountryData]);
  
 
  // Region Function Combined with search Queries
  const getByRegion = (value) =>{
    setRegion(value);
    changeIcon(value);
    let filteredRegion;
    if(value === "all"){
      if(query.length > 0){
         filteredRegion = CountryData.filter((country) => {
          return country.name.common.toLowerCase().startsWith(query.toLowerCase())
        })
      }else{
        setData(CountryData);
        return;
      }
    }else{
      if(query.length > 0){
        filteredRegion = CountryData.filter((country) => {
          return country.region.toLowerCase() === value.toLowerCase() && country.name.common.toLowerCase().startsWith(query.toLowerCase())
       })
      }else{
        filteredRegion = CountryData.filter((country) => {
          return country.region.toLowerCase() === value.toLowerCase() 
       })
      }
    } 
    setData(filteredRegion)
  }
  // Search Function Combined with region Queries
  const getFilter = (value) => {
    setQuery(value);
    
    let filtered 
    if( region === "all"){
      if(value.length < 1){
        setData(CountryData);
        return;
      }else{
        filtered = CountryData.filter((country) => {
          return country.name.common.toLowerCase().startsWith(value.toLowerCase())
        })
      }
    }else{
      filtered = CountryData.filter((country) => {
        return country.name.common.toLowerCase().startsWith(value.toLowerCase()) && country.region.toLowerCase() === region.toLowerCase()
      })
    }
    setData(filtered);
  }

  return (
    <div className='overflow-hidden'>
      <div className='container mx-auto' >
          < div className='flex flex-row	justify-between w-full mb-6'> 
      
            <input type="search" 
              className="block w-6/12 p-4 pl-10 w-full text-sm text-black bg-white rounded-lg outline-0	
              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" 
              placeholder="Search for a country..." 
              onChange={(e)=>getFilter(e.target.value)}
            />

            <select 
                className='w-2/12 px-4 rounded-lg text-black bg-white outline-0	'
                value={region}
                onChange={(e)=>getByRegion(e.target.value)}>
                {/* <option>Filter by Region :</option> */}
                <option value="all">All Regions</option>
                <option value="africa">Africa</option>
                <option value="asia">Asia</option>
                <option value="europe">Europe</option>
                <option value="oceania">Oceania</option>
                <option value="americas">Americas</option>
            </select>
            
          </div>
 
          
       
          {/* Card */}
          
          <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
            {
            data ? data.map((country, index)=>(
              <Link href={`/${country.name.common}`} key={index}>
                <div className='bg-white'>
                  <Image  className='w-ful object-cover' width="600" height="400" src={country.flags.png} alt="ima"></Image>
                  <div className="px-4 py-4">
                    <div className="font-bold text-xl mb-2">{country.name.common}</div>
                  </div> 
                  <div className="px-4 pt-2 pb-2">
                    <p className="inline-block py-1 text-sm text-gray-700 mr-2 mb-2">
                      <span className='font-semibold'>Population: </span>{ Number(country.population).toLocaleString()}
                    </p>
                    <p className="inline-block py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    <span className='font-semibold'>Region:</span> { country.region }
                    </p>
                    <p className="inline-block py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    <span className='font-semibold'>Capital:</span> { country.capital }
                    </p>
                  </div>
                 
                </div>
              </Link>
            )): <div>Loading ...</div>
          }
          </div>
          
      </div>
    </div>
  )
}
