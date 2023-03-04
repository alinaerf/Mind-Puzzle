import './App.css';
import { useEffect, useState } from "react";
import Crossword from '@jaredreisinger/react-crossword';
function generate_link(){
  const maxValue = new Date("2013-11-31").getTime();
  const minValue = new Date("1976-01-01").getTime();
  const timestamp = Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
  const result=new Date(timestamp);
  const month=String(result.getMonth()).length===1?'0'+result.getMonth(): result.getMonth()
  const day=String(result.getDay()).length===1?'0'+result.getDay(): result.getDay()
  console.log(month)
  console.log(day)
  const new_link=`https://raw.githubusercontent.com/doshea/nyt_crosswords/master/${result.getFullYear()}/${month}/${day}.json`
  console.log(new_link)
  return new_link
} 
const App=()=>{
  const api=generate_link()
  const [data, setData]=useState()
  useEffect(()=>{
      fetch(api)
      .then(res=>res.json())
      .then(result=>{
          setData(result)
      })
  })
  console.log(data)
  if (data!==undefined){

    var reformatted_data={across:{}, down:{}}
    for (let j=0; j<data['answers']['across'].length; j++){
      reformatted_data['across'][Number(data['clues']['across'][j].substring(0, data['clues']['across'][j].indexOf(".")))]={'clue':data['clues']['across'][j],'answer':data['answers']['across'][j]}
    }
    for (let i=0; i<data['answers']['down'].length; i++){
      reformatted_data['down'][Number(data['clues']['down'][i].substring(0, data['clues']['down'][i].indexOf(".")))]={'clue':data['clues']['down'][i],'answer':data['answers']['down'][i]}
    }
    console.log(reformatted_data)
      return <div style={{ width: '25em', display: 'flex'}}>
              <Crossword data={reformatted_data} />
          </div>;;

  }else{
      return(
          <div>
              Loading...
          </div>
      )
  }
}
export default App