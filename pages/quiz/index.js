
import {  useContext, useState, useRef } from 'react';
import {  CountriesContext } from '../../context';
import Link from 'next/link' 
import Image from 'next/dist/client/image';
export default function Quiz() {
    // Generate init Number
    const  getRandomInt = (max)=> {
        return Math.floor(Math.random() * max);
    }
    const { CountryData } = useContext(CountriesContext);
    const [quiz, setQuiz] = useState([]);
    const [score, setScore ] = useState(0);
    const [gameState, setGame] = useState(false);
    const [blockBtn, setBlockBtn] = useState(false);
    const [next, setNext] = useState(false);
    const quizList = useRef();

    // Quiz Generator
    const generateQuiz = () =>{
        const correctNumberId = getRandomInt(CountryData.length)
        const flag =   CountryData[correctNumberId].flags.svg; 
        const correctName =   CountryData[correctNumberId].name.common;
        
        
        setGame(true);
        setBlockBtn(false);
        setNext(false);
        let answers = [];
        for (let i = 0; i < CountryData.length ; i++) {
            let countryFalseName = CountryData[getRandomInt(CountryData.length)].name.common;
            let dataToPush = {name : countryFalseName, type : false}
            if(countryFalseName === correctName) { continue; }
            if(answers.length === 3 ) {break; }
            answers.push(dataToPush);
        }
        const fullQuiz = [
            {
                Country_flag : flag,
                answers : []       
            }
            
        ]
        answers.splice(getRandomInt(3),0,{name: correctName, type:true})
        fullQuiz[0].answers= answers;
        setQuiz(fullQuiz);
        // To remove some Styling Need Better Dynamic Way
        if(gameState === true){
            let el = quizList.current;
            el.classList.remove("answered");
            console.log(el)
            quizList.current.children[0].classList.remove("red-bg")
            for (let y = 0; y < el.children.length; y++) {
                el.children[y].classList.remove("green-bg");  
                el.children[y].classList.remove("red-bg");    
            }
        }
    }

    // Response Checker
    const  checkResponse = (e, type) =>{
        quizList.current.classList.add("answered");
        let btnState = e.getAttribute('data-state');
        
        if(btnState === "active"){
            
            if(type === true){
                setScore(score + 1);
                e.classList.add("green-bg");
            }else{
                e.classList.add("red-bg");
                setScore(score - 1 )
            }
            setBlockBtn(true);
            setNext(true);
        }else{
            return;
        }
    }
    
    return (
        <div className='container mx-auto quiz'>
           <div className='flex flex-row justify-between items-center mb-8'>
                <Link href='/' ><div className='btn-simple '><i className='mr-4 fa-solid fa-arrow-left-long' data-v-5455f2a1=""></i>Back Home</div></Link>
                <h3 className='text-2xl text-black '>Guess the Country Flag Game</h3>
           </div>
            <div className='grid  place-items-center'>
                <div onClick={()=>generateQuiz()} 
                    className='bg-green-500 text-lg hover:bg-slate-500 cursor-pointer text-white py-4 px-8 rounded-full mt-16 ' 
                    style={ gameState ? { display:'none'} : {display : 'inline-block'} }  > Lets Play the game</div> 
                <div className='rounded-full w-12 h-12 bg-slate-500 text-white' style={ gameState ? { display:'inline-block'} : {display : 'none'} }>
                    <p className='grid  place-items-center h-full'>{score}</p>
                </div>
            </div>
            <div onClick={()=>generateQuiz()} className='btn-rounded' style={ next ? { display:'inline-block'} : {display : 'none'} }   > Next Guess</div> 

            <div className='quizblock'>  
                {quiz.map((data, i)=>(
                    <div key={i} className="grid grid-cols-2 gap-5 items-baseline">
                        <Image  src={data.Country_flag} width='600' height='300' alt="image"></Image>
                        <div>
                            <ul className='quiz-list' ref={quizList} >
                                {
                                data.answers.map((info, y)=>(
                                    <li key={y} onClick={(e)=>checkResponse(e.target, info.type)} data-state={blockBtn ? 'disabled' : 'active'} >{info.name}</li>
                                ))  
                                }
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
            <div onClick={()=>generateQuiz()} className="btn-rounded" style={ next ? { display:'inline-block'} : {display : 'none'} }   > Next Guess</div> 

        </div>
        
    )
}
