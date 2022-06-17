
import {  useContext, useEffect, useState } from 'react';
import  Link  from 'next/link';
import Image from 'next/dist/client/image';

import {  CountriesContext } from '../context';
import styles from '../styles/Home.module.css'
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
    <div className={styles.container}>
      <div className='main'>
          <div className='mainHeader'> 
            <div className="searchBox">
              <input type="text" placeholder="Search for a country..."  onChange={(e)=>getFilter(e.target.value)}/>
            </div>
          
            <div className="filters-box">
              <select value={region} onChange={(e)=>getByRegion(e.target.value)}>
                {/* <option>Filter by Region :</option> */}
                <option value="all">All Regions</option>
                <option value="africa">Africa</option>
                <option value="asia">Asia</option>
                <option value="europe">Europe</option>
                <option value="oceania">Oceania</option>
                <option value="americas">Americas</option>
              </select>
            </div>
          </div>


          {/* Card */}
          
          <div className='grid'>
            {
            data ? data.map((country, index)=>(
              <Link href={`/${country.name.common}`} key={index}>
                <div className='item'>
                  <Image  className='image_item' width="600" height="400" src={country.flags.png} alt="ima"></Image> 
                  <div className='desc'>
                    <h4 className='header-text'>{country.name.common}</h4>
                    <p className="body-text"><strong>Population:</strong> { Number(country.population).toLocaleString()}</p>
                    <p className="body-text"><strong>Region:</strong> { country.region }</p>
                    <p className="body-text"><strong>Capital:</strong> { country.capital }</p>
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
