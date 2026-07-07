import React, { useState, useEffect } from 'react';
import './App.css';
import Inputform from './components/input';
import Daypage from './components/Daypage';
import WeekPage from './components/Weekpage';
import { exdata } from './hooks/handleEx';

function App() {
  const [number, setNumber] = useState(3);
  const [exnum, setExnum] = useState(Array(3).fill(1));
  const [planner, setPlanner] = useState(null);
  const [curday,setCurday]=useState(null)
  const [doneinweek,setDoneinweek]=useState([])
  const [seeWeek,setSeeWeek]=useState(false)
  const [selectDate,setSelectDate]=useState(null)

  const weekday = [
    "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"
  ];

  const back=()=>{
    setSeeWeek((prev)=>!prev)
    if(selectDate){
      setSelectDate(null)
    }
  }

  // const newPlan=()=>{
  //   localStorage.removeItem('planner')
  // }

  const increase = (index) => {
    setExnum(prev => {
      const newArr = [...prev];
      newArr[index] = newArr[index] + 1;
      return newArr;
    });
  };

  const decrease = (index) => {
    setExnum(prev => {
      const newArr = [...prev];
      if (newArr[index] > 1) {
        newArr[index] = newArr[index] - 1;
      }
      return newArr;
    });
  };

  const done=(ex)=>{
    setDoneinweek(
      (prev)=>[...prev,ex]
    )
  } 

  const choose=(day)=>{
    setSelectDate(day)
    setSeeWeek((prev)=>!prev)
  }

  const updateDays = (e) => {                                      
    setNumber(parseInt(e.target.value));
  };

  const handleplanner = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newPlanner = [];

    for (let i = 0; i < number; i++) {
      const day = weekday[i];
      const exercises = [];
      for (let j = 0; j < exnum[i]; j++) {
        const name = formData.get(`day${i}-exercise${j}-name`);
        const set = parseInt(formData.get(`day${i}-exercise${j}-set`));
        const rep = parseInt(formData.get(`day${i}-exercise${j}-rep`));
        exercises.push({ name, set, rep });
      }
      newPlanner.push({ day, exercises });
    }
    setPlanner(newPlanner);
    
  };

  useEffect(() => {
    setExnum(Array(number).fill(1));
  }, [number]);
  
  const today=new Date()
  
  useEffect(()=>{
    if(today.getDay()==0){
      setCurday(weekday[0])
    }else{
      setCurday(weekday[today.getDay()-1])
    }
    
  },[today])

  return (
    <>
    {
      planner?
      (
      <div>
        {
          seeWeek?
          (<WeekPage days={weekday} curday={curday} choosedate={choose}/>)
          :
          (
            
            <Daypage planner={planner.find(p => p.day === (selectDate?selectDate:curday))} done={done} day={selectDate?selectDate:curday} onBack={back}/>
          )
        }
        <button onClick={()=>{
          setPlanner(null)
        }} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Update Planner
        </button>
      </div>  
        )
      :<Inputform 
        number={number} 
        exnum={exnum} 
        weekday={weekday} 
        increase={increase} 
        decrease={decrease} 
        handleplanner={handleplanner} 
        updateDays={updateDays} 
      />
    }
      
    </>
  );
}

export default App;
