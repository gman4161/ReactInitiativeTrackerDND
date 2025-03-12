"use client"
import { useState } from "react";

let nextId = 0;

export default function Home() {
  const [round, setRound] = useState(1)
  const [name, setName] = useState('');
  const [players, setPlayers] = useState([]);

  function handleAdd(){
    setPlayers([          //@ts-ignore
      ...players,         //@ts-ignore
      { id: nextId++, name: name, initiative: 0}
    ]);
    setName("");
  }

  function sortPlayers(){
    console.log(players)
    let tempArray = [...players]
    tempArray.sort((a, b) => {          //@ts-ignore
      if(a.initiative>b.initiative){
        return -1
      }                               //@ts-ignore
      if(a.initiative<b.initiative){
        return 1
      }
      return 0
    })
    setPlayers([...tempArray])
    console.log(players)
  }

  return (<>
    <h1>Initiative Round {round}:</h1>

    <ul>
      {/* The players list, iterates through each in array 'players' on change */}
      {players.map(player => (              //@ts-ignore
        <li key={player.id}>
          <button                             //@ts-ignore
            onClick={() => {
              setPlayers(players.filter(s =>  //@ts-ignore
                s.id != player.id
              ))
            }}
          >X</button>
          
          {/* display and allow changes for the initiative of each player */}
          <input type="number"
            onChange={(newIni)=>{                 //@ts-ignore
              console.log('change'+player.id)
              const newArr = players.map(i =>{    //@ts-ignore
                if(i.id === player.id){           //@ts-ignore
                  return {...i, initiative: newIni.target.value}
                }else return i
              })                                  //@ts-ignore
              setPlayers(newArr)
            }}
          />                                    {/**@ts-ignore*/}
          {player.name}
        </li>
      ))}


      {/* Input for player names. updates 'name' on input change */}
      <li>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyUp={e => {if(e.key==="Enter") handleAdd()}}
        />
        <button onClick={handleAdd}>Add</button>
      </li>
    </ul>
    <button onClick={() => {setRound(round+1); sortPlayers()}}>Next Round</button>
    <button onClick={() => setRound(1)}>Combat Complete</button>

  </>);
}
