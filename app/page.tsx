"use client"
import { useState } from "react";
import { get } from "http";

let nextId = 0;

export default function Home() {
  const [inputs, setInputs] = useState();
  const [name, setName] = useState('');
  const [artists, setArtists] = useState([]);

  return (<>
    <h1>Inspiring sculptors:</h1>

    <input
      value={name}
      onChange={e => setName(e.target.value)}
    />

    <button onClick={() => {
        setArtists([      //@ts-ignore
          ...artists,   //@ts-ignore
          { id: nextId++, name: name }
        ]);
        setName("");
    }}>Add</button>

    <ul>
      {artists.map(artist => (      //@ts-ignore
        <li key={artist.id}>{artist.name}</li>
      ))}
    </ul>

  </>);
}
