"use client"
import { useState } from "react";
import "tailwindcss";

let nextId = 0;

export default function Home() {
  const [round, setRound] = useState(0)
  const [name, setName] = useState('')
  const [players, setPlayers] = useState([])
  //const [currentTurn, setcurrentTurn] = useState(-1)

  function handleAdd(){
    setPlayers([          //@ts-ignore
      ...players,         //@ts-ignore
      { id: nextId++, name: name, initiative: 0, currentTurn: false}
    ]);
    setName("");
  }

  function handleNextTurn(){
    let noTurnSet = true
    let setTurn = false
    const temparr = [...players]
    temparr.forEach(i=>{
      if(setTurn==true){     //@ts-ignore
        i.currentTurn=true
        setTurn=false
        noTurnSet=false
        console.log("turn is set")
        return
      }                   //@ts-ignore
      if(i.currentTurn==true){  //@ts-ignore
        i.currentTurn = false
        setTurn=true
        console.log("current users turn")
      }
    })

    if(noTurnSet===true){      //@ts-ignore
      temparr[0].currentTurn=true
      setRound(round+1)

      // temparr.map(i=>{
      //   if(noTurnSet){  //@ts-ignore
      //     i.currentTurn = true
      //     noTurnSet = false
      //   }
      // })
    }
    setPlayers([...temparr])
    console.log(players)
  }

  function sortPlayers(){   //@ts-ignore
    let tempArray = [...players]
    tempArray.sort((a, b) => {      //@ts-ignore
      if(Number(a.initiative)>Number(b.initiative)){
        return -1
      }                               //@ts-ignore
      if(Number(a.initiative)<Number(b.initiative)){
        return 1
      }
      return 0
    })
    setPlayers([...tempArray])
    console.log(players)
  }

  return (<>
  <main>
    <h1>Initiative Round {round}:</h1>

    <ul>
{/* The players list, iterates through each in array 'players' on change */}
      {players.map(player => (
        <li 
          className="
            flex justify-normal gap-x-1 py-1 
          "//@ts-ignore
          key={player.id}
        >
{/* Delete Button */}
          <button
            id="delete"
            className="
            bg-black text-center text-red-500
            rounded-lg text-lg font-bold size-7 px-0
            "
            onClick={() => {
              setPlayers(players.filter(s =>  //@ts-ignore
                s.id != player.id
              ))
            }}
          >X</button>
{/* display and allow changes for the initiative of each player */}
          <input type="number"
            className="
            w-12 outline-1
            text-center
            "
            onChange={(newIni)=>{
              const newArr = players.map(i =>{    //@ts-ignore
                if(i.id === player.id){           //@ts-ignore
                  return {...i, initiative: newIni.target.value}
                }else return i
              })                                  //@ts-ignore
              setPlayers(newArr)
            }}
          />
{/* Display player name */}{/**@ts-ignore*/}
          <p className={player.currentTurn ? "bg-[#00FF00]" : ""}>{player.name}</p>
        </li>
      ))}

{/* Input for player names. updates 'name' on input change */}
      <li>
        <input
          className="
          rounded-l-lg p-1 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white

          w-auto"
          placeholder="Sedue Lastname"
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyUp={e => {if(e.key==="Enter") handleAdd()}}
        />
{/* Button to add Player */}
        <button
          className="
            px-4 rounded-r-lg bg-[#00FFFF] 
            text-gray-800 font-bold p-1 uppercase border-[#00FFFF] border-t border-b border-r
            
          "
          onClick={handleAdd}
        >Add</button>
      </li>
    </ul>
{/* buttons for turn handling */}


    <div className="p-1">
      <button
        onClick={sortPlayers}
        className="rounded-full"
      >Set Initiative</button>
    </div>
{/* buttons to in/decrease round number */}
    <div className="p-1">
      <button
        onClick={()=>setRound(round-1)}
        className="
          rounded-l-full w-30 mr-1
        "
      >Previous Round 
      </button>
      <button
        onClick={()=>setRound(round+1)}
        className="
          rounded-r-full w-30 ml-1
        "
      >Next Round
      </button>
    </div>
    <div className="p-1">
      <button
        onClick={() =>{
          setRound(0)               //@ts-ignore
          var temp = [...players]   //@ts-ignore
          temp.map(i=>i.currentTurn = false)
          setPlayers([...temp])
        }}
        className="
          rounded-full
        "
      >
        Combat Complete
      </button>
    </div>
    <div className="p-1">
      <button
        onClick={()=>console.log("prev guy")}
        className="
          rounded-l-full w-30 mr-1
        "
      >Previous Turn 
      </button>
      <button
        onClick={handleNextTurn}
        className="
          rounded-r-full w-30 ml-1
        "
      >Next Turn
      </button>
    </div>
  </main>
  </>);
}
