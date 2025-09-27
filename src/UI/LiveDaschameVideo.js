import React from 'react'
import videoDaschame from '../assets/videos/video2.mp4'
  import { IconButton } from "@mui/material";
  import CloseIcon from "@mui/icons-material/Close";
const LiveDaschameVideo = ({closeValue}) => {

  return (
    <>
      <div className='p-4 bg-white border'>
            <div className="flex justify-end pb-3 mt-[-10px]">
                <IconButton size="small" className="x-icon" onClick={()=>closeValue(false)}>
                <CloseIcon />
              </IconButton>
            </div> 
      <video
        className=" object-cover"
        // autoPlay
        // loop
        muted
        playsInline
        controls width={"100%"} height={500}
      >
        <source src={videoDaschame} type="video/mp4" />
        </video>
         </div>
    </>
  )
}

export default LiveDaschameVideo
