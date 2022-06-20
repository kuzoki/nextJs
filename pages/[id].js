
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
      
      <div className="main-full">
          <div className='single-wrap'>
            <Link href='/' ><div className='btn-back'><i className="fa-solid fa-arrow-left-long" data-v-5455f2a1=""></i>Back Home</div></Link>
            {country ? country.map((country, i)=>(
              <div className='single' key={i}>
                <div>
                  {country.flags.svg ? <img className='flag' width='600' height='400' src={country.flags.svg} alt="ima"></img>:<></> }
                  {country.coatOfArms.svg ? <img className='flag' width='600' height='400' src={country.coatOfArms.svg} alt="ima"></img>:<></> }
                </div>
                <div className='desc'>
                  <h4 className='name'>{country.name.common}</h4>
                  <div className="list">
                      <div>
                        <p className="body-text"> <span>Official Name: </span>{country.name.official}</p>
                        <p className="body-text"><span>Population:</span> { Number(country.population).toLocaleString()}</p>
                        <p className="body-text"><span>Population:</span> { country.region }</p>
                        <p className="body-text"><span>Sub Region:</span> { country.subregion }</p>
                        <p className="body-text"><span>Capital:</span> { country.capital }</p>
                      </div>
                      <div>
                        <p className="body-text"><span>Top Level Domain:</span> {country.tld[0]}</p>
                        <p className="body-text"><span>Currencies:</span>  {  Object.values(country.currencies)[0].name}</p>
                        <div className="body-text flex-wrap"><span>Languages:</span>
                          {Object.values(country.languages).map((val,i)=>(<span key={i} className="native">{val},</span>))}
                        </div>
                      </div>
                  </div>
                  <div className="borderList">
                        <div className="body-text"><span >Borders:</span></div>
                        { 
                          country.borders ? country.borders.map((val)=>(<span key={val} className="border-country" onClick={()=>updateCountry(val)}>{val}</span>)) : <span className="border-country">Have no Borders</span>
                        }
                  </div>
                  {country.maps.googleMaps ?
                    <div className='map'>
                      <a href={country.maps.googleMaps} target="_blank" rel="noreferrer"> See On Google Map:  <i className="fa-solid fa-map-location-dot"></i></a>
                    </div> : <></>
                  }
                  
                </div>
              </div>
            )):<></>}
              
              
          </div>
      </div>
    )
}
