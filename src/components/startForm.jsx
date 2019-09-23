import React, { useState } from "react"
import Axios from "axios"
import "./style.css"

const StartForm = ({ storeToken }) => {
  const [name, setName] = useState("")
  const [room, setRoom] = useState("")

  const handleSubmit = async e => {
    e.preventDefault()

    const result = await Axios({
      method: "POST",
      url: "https://straw-serval-7941.twil.io/createToken",
      data: { identity: name },
      //withCredentials: true,
    })
    console.log(result)
    const jwt = result.data

    //TODO add error handling
    storeToken(jwt)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="user-name">
        Display Name <br />
        <input
          type="text"
          name="user-name"
          value={name}
          onChange={e => setName(e.target.value)}
          id="user-name"
        />
      </label>
      <label htmlFor="user-room">
        Room to join <br />
        <input
          type="text"
          name="user-room"
          value={room}
          onChange={e => setRoom(e.target.value)}
          id="user-room"
        />
      </label>
      <button type="submit">Join Room</button>
    </form>
  )
}

export default StartForm
