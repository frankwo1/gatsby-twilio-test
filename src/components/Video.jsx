import React, { useEffect, useRef } from "react"
import TwilioVideo from "twilio-video"

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
    participant.on("trackSubscribed", track => {
      console.log("Track subscribed")
      RemoteVidRef.current.appendChild(track.attach())
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
