"use client"
import { useState } from "react";
import "tailwindcss";

let nextPlayerId = 0;
let nextEffectId = 0;

export default function Home() {
  const God = {id: -1, name: 'God'}
  const [round, setRound] = useState(0)
  const [name, setName] = useState('')
  const [players, setPlayers] = useState([])

  const [turnHolder, setTurnHolder] = useState(God);

  const [effectName, setEffectName] =  useState('')
  const [effectDuration, setEffectDuration] = useState(0)
  const [effects, setEffects] = useState([])

  function handleAddPlayer(){
    setPlayers([          //@ts-ignore
      ...players,         //@ts-ignore
      { id: nextPlayerId++, name: name, initiative: 0, currentTurn: false}
    ]);
    setName('');
  }

  function handleAddEffect(){
    let tempArray = [
      ...effects,
      {id: nextEffectId++, name: effectName, duration: (effectDuration==0 ? -1:effectDuration), casterId: turnHolder.id, casterName: turnHolder.name}
    ]
    tempArray.sort((a, b) => {      //@ts-ignore
      if(Number(a.duration)>Number(b.duration)){
        return -1
      }                               //@ts-ignore
      if(Number(a.duration)<Number(b.duration)){
        return 1
      }
      return 0
    })    //@ts-ignore
    setEffects([...tempArray])
    console.log(effects)



    setEffectName('')
  }

  function handlePreviousTurn(){
    const tempEffects = [...effects]
    const tempArray = [...players]  //@ts-ignore
    let turnIndex = tempArray.findIndex(i=>i.currentTurn)

    if(turnIndex<=0){
      setRound(round-1)
      tempEffects.map(effect=>{   //@ts-ignore
        if(effect.casterId == God.id&&round!=0) effect.duration++
      })
      turnIndex = tempArray.length                          //@ts-ignore
      tempArray[0].currentTurn = false              //@ts-ignore
    }else tempArray[turnIndex].currentTurn = false  //@ts-ignore
    tempArray[turnIndex - 1].currentTurn = true

    //handle the effects from the turn ticking over
    tempEffects.map(effect=>{   //@ts-ignore
      if(effect.casterId == turnHolder.id) effect.duration++
    })

    setTurnHolder(tempArray[turnIndex-1])
    setPlayers([...tempArray])
  }

  function handleNextTurn(){
    const tempEffects = [...effects]
    const tempArray = [...players]  //@ts-ignore
    let turnIndex = tempArray.findIndex(i=>i.currentTurn)

    if(turnIndex >= tempArray.length-1 || turnIndex<0){
      setRound(round+1)
      tempEffects.map(effect=>{   //@ts-ignore
        if(effect.casterId == God.id&&round>0) effect.duration--
      })   
      turnIndex = -1                        //@ts-ignore
      tempArray[tempArray.length-1].currentTurn = false //@ts-ignore
    }else tempArray[turnIndex].currentTurn = false    //@ts-ignore
    tempArray[turnIndex + 1].currentTurn = true

    let tempTurnHolder = tempArray[turnIndex+1]
    setTurnHolder(tempTurnHolder)

    setPlayers([...tempArray])

    //handle the effects from the turn ticking over
    tempEffects.map(effect=>{   //@ts-ignore
      if(effect.casterId == tempTurnHolder.id) effect.duration--
    })    //@ts-ignore
    setEffects([...tempEffects.filter(effect=> Number(effect.duration)!=0)])
  }

  function handleNextRound(){
    setRound(round + 1)
    effects.map(effect=>{   //@ts-ignore
      effect.duration--
    })      
    const tempEffects = [...effects]    //@ts-ignore
    setEffects([...tempEffects.filter(effect=> Number(effect.duration)!=0)])
  }
  function handlePreviousRound(){
    setRound(round - 1)
    effects.map(effect=>{   //@ts-ignore
      effect.duration++
    })        
    const tempEffects = [...effects]    //@ts-ignore
    setEffects([...tempEffects.filter(effect=> Number(effect.duration)!=0)])
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
    <div>
      <p className="
      text-[30px] font-bold 
      ">Initiative Round {round}:</p>

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
              w-12 outline-2 text-center
              rounded-full mx-1
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
{/* Display player name */}
            <p className={ //@ts-ignore
              (player.currentTurn ? "bg-[#00FF00] " : "")+
              "rounded-full px-2 text-lg font-bold transition duration-300"
            }>  {/**@ts-ignore*/}
              {player.name}
            </p>
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
            onKeyUp={e => {if(e.key==="Enter") handleAddPlayer()}}
          />
{/* Button to add Player */}
          <button
            className="
              px-4 rounded-r-lg bg-[#00FFFF] 
              text-gray-800 font-bold p-1 uppercase border-[#00FFFF] border-t border-b border-r
              
            "
            onClick={handleAddPlayer}
          >Add</button>
        </li>
      </ul>
{/* Sort Initiatives */}
      <div className="p-1">
        <button
          onClick={sortPlayers}
          className="rounded-full"
        >Set Initiative</button>
      </div>
{/* buttons to in/decrease round number */}
      <div className="p-1">
        <button
          onClick={handlePreviousRound}
          className="
            rounded-l-full w-30 mr-1
          "
        >Previous Round 
        </button>
        <button
          onClick={handleNextRound}
          className="
            rounded-r-full w-30 ml-1
          "
        >Next Round
        </button>
      </div>
{/* Reset round and turn counters */}
      <div className="p-1">
        <button
          onClick={() =>{
            setRound(0)               //@ts-ignore
            var temp = [...players]   //@ts-ignore
            temp.map(i=>i.currentTurn = false)
            setPlayers([...temp])
            setTurnHolder(God)
          }}
          className="
            rounded-full
          "
        >
          Combat Complete
        </button>
      </div>
{/* prev/next Turn buttons */}
      <div className="p-1">
        <button
          onClick={handlePreviousTurn}
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
    </div>
    
{/* Effects list */}

    <div className="max-w-[50%]">
      <ul>
{/* Input for effect names. updates 'effectName' on input change */}
        <li className="">
          <input
            className="
              rounded-l-lg p-1 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white
              w-auto"
            placeholder="Potion of testicular torsion"
            value={effectName}
            onChange={e => setEffectName(e.target.value)}
            onKeyUp={e => {if(e.key==="Enter") handleAddEffect()}}
          />
{/* input for effect duration */}
          <input
            type="number"
            className="
              p-1 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white
              w-10"
            value={effectDuration}
            onChange={e => setEffectDuration(Number(e.target.value))}
            onKeyUp={e => {if(e.key==="Enter") handleAddEffect()}}
          />
{/* Button to add Effect */}
          <button
            className="
              px-4 rounded-r-lg bg-[#00FFFF] 
              text-gray-800 font-bold p-1 uppercase border-[#00FFFF] border-t border-b border-r      "
            onClick={handleAddEffect}
          >Add Effect</button>
        </li>

      {effects.map(effect => (
        <li //@ts-ignore
          className={"rounded-lg grid grid-cols-4 py-1 "+(Number(effect.duration)>0&&Number(effect.duration)<2 ? " bg-red-500" : Number(effect.duration)>0&&Number(effect.duration)<3 ? " bg-yellow-500" : "")}
          //@ts-ignore
          key={effect.id}
        >
{/* Delete Button */}
          <button
            id="delete"
            className="
              bg-black text-center text-red-500
              rounded-lg text-lg font-bold size-7 px-0
              "
            onClick={() => {
              setEffects(effects.filter(e =>  //@ts-ignore
                e.id != effect.id
              ))
            }}
          >X</button>
{/* effect name  */}    {/* @ts-ignore */}
          <b>{effect.name}</b>
{/* effect caster name */}   {/* @ts-ignore */}
          <small><i>{effect.casterName}</i></small>
{/* effect duration */} {/* @ts-ignore */}
          {Math.abs(Number(effect.duration))+" "+(Number(effect.duration)>0 ? "left" : "and counting")}
        </li>
      ))}
      </ul>
    </div>
  </main>
  </>);
}
