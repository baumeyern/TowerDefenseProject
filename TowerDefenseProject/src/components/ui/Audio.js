import React, { useRef, useEffect, useState } from "react";
import Audio1 from "../assets/audioClips/songformydeath.mp3";
import { Checkbox } from "@mui/material";

//Custom hook called in useRadio function to alocate the MP3 file for audio rendering
const useAudio = (src, { volume = 1, playbackRate = 1 }) => {
  const sound = useRef(new Audio(src));

  useEffect(() => {
    sound.current.playbackRate = playbackRate;
  }, [playbackRate]);

  useEffect(() => {
    sound.current.volume = volume;
  }, [volume]);

  return sound.current;
};

/**
 * (Requirement 9.0.1)
 * @returns Button displayed in gamepage for audio with on / off functionality (Defaults to off)
 */
function useRadio() {
  const audio = useAudio(Audio1, { volume: 0.2, playbackRate: 1.2 });
  const [isChecked, setIsChecked] = useState(true);

  return (
      <div className='audio-container'>
          <p className="audio">
              Toggle for audio{" "}
              <Checkbox
                  className="audio-bttn"
                  title="Toggle audio"
                  onClick={() => {
                      isChecked ? audio.play() : audio.pause();
                  }}
                  onChange={() => setIsChecked(!isChecked)}
              />
          </p>
      </div>
  );
}

export default useRadio;
