import { createContext, useEffect, useState, useReducer } from "react";

export const CountriesContext = createContext()

const themeReducer = (state, action) => {
    switch (action.type) {
        case 'SRC':
            return {...state, srcNav: action.payload}
        default:
            return state
    } 
}
export function CountriesProvider({children}){
    const [CountryData, setCountryData] = useState(null);
    const [url, setUrl] = useState('https://restcountries.com/v3.1/all');
    const [state, dispatch] = useReducer(themeReducer, {
        srcNav : 'globe.png'
    })

    const changeIcon = (region) =>{
        
        switch (region){
            case 'africa' :
                dispatch({type: 'SRC', payload: "africa.png"});
                break;
            case 'europe' :
                dispatch({type: 'SRC', payload: "europe.png"});
                break;    
            case 'asia' :
                dispatch({type: 'SRC', payload: "asia.png"});
                break;    
            case 'americas' :
                dispatch({type: 'SRC', payload: "america.png"});
                break;    
            case 'oceania' :
                dispatch({type: 'SRC', payload: "australia.png"});
                break;    
            default:
                dispatch({type: 'SRC', payload: "globe.png"});  
        }
        
    }

    useEffect(()=>{
        const getData = async() =>{
            const res = await fetch(url);
            const newData = await res.json();
            setCountryData(newData);
        }
        getData();
    }, [url])
    
    return(
        <CountriesContext.Provider value={ {CountryData, setUrl, ...state, changeIcon}}>
            { children }
        </CountriesContext.Provider>
    )
}

