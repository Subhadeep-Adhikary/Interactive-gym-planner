import React, { useState, useEffect } from 'react';
import './App.css';
import Inputform from './components/input';
import Daypage from './components/Daypage';
import WeekPage from './components/Weekpage';
import {getExerciseByName} from './hooks/handleEx.js'

function App() {
  const [number, setNumber] = useState(3);
  const [exnum, setExnum] = useState(Array(3).fill(1));
  const [planner, setPlanner] = useState(null);
  const [curday,setCurday]=useState(null)
  const [doneinweek,setDoneinweek]=useState([])
  const [seeWeek,setSeeWeek]=useState(false)
  const [selectDate,setSelectDate]=useState(null)
  const [seedetails,setseedetails]=useState(false)
  const [log, setLog] = useState([]);
  const [pageex, setPageex] = useState({});

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

  const seedetail=(ex)=>{
    setseedetails(prev=>!prev)
    let name=ex.name
    let logs=planner.find(p => p.day === (selectDate?selectDate:curday)).exercises.find(e => e.name === ex.name).log || []
    let exobject=planner.find(p => p.day === (selectDate?selectDate:curday)).exercises.find(e => e.name === ex.name)
    setPageex({...ex,name: name, log: logs,exobject: exobject})
  }

  const onbackpage=()=>{
    setseedetails(prev=>!prev)
    setPageex(null)
  }

  const updateDays = (e) => {                                      
    setNumber(parseInt(e.target.value));
  };
   const addLog = (e,ex) => {
    e.preventDefault();
    weight = e.target.weight.value;
    reps = e.target["reps/time"].value;
    if (!weight || !reps) return;
    const newEntry = {
      date: new Date().toLocaleDateString(),
      weight,
      reps
    };
    setLog(prev => [...prev, newEntry]);
    planner.forEach(day => {
      day.exercises.forEach(exercise => {
        if (exercise.name === ex.name) {
          if (!exercise.log) {
            exercise.log = [];
          }
          exercise.log.push(newEntry);
        }
      });
    });
    
  };

  const handleplanner = async (e) => {
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
        const exobject = await getExerciseByName(name);
        exercises.push({ ...exobject, set, rep });
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
            pageex?
            (<ExPage exercise={pageex} addlog={addLog} date={selectDate?selectDate:curday} onBackpage={onbackpage}/>)
            :
            <Daypage planner={planner.find(p => p.day === (selectDate?selectDate:curday))} done={done} day={selectDate?selectDate:curday} onBack={back} seedetails={seedetail}/>
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
