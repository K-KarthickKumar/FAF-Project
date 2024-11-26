import React, { useEffect, useRef } from 'react';
import Vimeo from '@vimeo/player';
 
const VimeoPlayer = ({ videoId, startTime, stopTime }) => {
  const playerRef = useRef(null);
  console.log(startTime+" "+stopTime);
 
  useEffect(() => {
    const player = new Vimeo(playerRef.current, {
      id: videoId,
    }
    );

    player.ready().then(()=>{
        player.setCurrentTime(startTime);
        player.play();
    });
 
    // Play the video when the component mounts
    player.on('play',()=>{
        player.setCurrentTime(startTime);
        const duration = stopTime - startTime + 1;
        setTimeout(() => {
          player.pause();
        //   player.setCurrentTime(startTime);
        }, duration * 1000);     });
 
    // Set a timeout to stop the video after stopTime - startTime
   // Convert seconds to milliseconds
 
    // Cleanup - unload the player when the component unmounts
    return () => {
      player.unload();
    };
  }, [videoId, startTime, stopTime]);
 
  return <div ref={playerRef} ></div>;
};
 
export default VimeoPlayer;