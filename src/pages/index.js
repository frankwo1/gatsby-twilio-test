import React, { useState, useEffect, useRef } from "react"
import TwilioVideo from "twilio-video"
import Layout from "../components/layout"
import SEO from "../components/seo"
import StartForm from "./../components/startForm"

const Video = ({ token }) => {
  const localVidRef = useRef(null)
  const RemoteVidRef = useRef(null)

  const addParticipant = participant => {
    //Attach video to all remote participants]
    console.log("Participant joined room")
    console.log(participant.identity)
    participant.tracks.forEach(publication => {
      if (publication.isSubscribed) {
        const track = publication.track

        RemoteVidRef.current.appendChild(track.attach())
      }
    })
  }

  useEffect(() => {
    TwilioVideo.connect(token, { video: true, audio: true, name: "test" }).then(
      room => {
        //Attach video to local user
        TwilioVideo.createLocalVideoTrack().then(track => {
          localVidRef.current.appendChild(track.attach())
          console.log("successfully joined room")
          console.log(room)
        })

        room.on("participantConnected", addParticipant)

        //Attach video to all remote participants
        room.participants.forEach(addParticipant)
      }
    )
  }, [token])

  return (
    <div className="Videos-container">
      <div ref={localVidRef}></div>
      <div ref={RemoteVidRef}></div>
    </div>
  )
}

const IndexPage = () => {
  const [token, setToken] = useState(false)
  return (
    <Layout>
      <SEO title="Home" />
      {!token ? (
        <StartForm storeToken={setToken}></StartForm>
      ) : (
        <Video token={token} />
      )}
      {/* <Link to="/page-2/">Go to page 2</Link> */}
    </Layout>
  )
}

export default IndexPage
