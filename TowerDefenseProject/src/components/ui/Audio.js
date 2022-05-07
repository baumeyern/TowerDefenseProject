import React, { useRef, useEffect, useState } from "react";
import Audio1 from "../assets/audioClips/songformydeath.mp3";
import { Checkbox } from "@mui/material";

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

function useRadio() {
    const audio = useAudio(Audio1, { volume: 0.2, playbackRate: 1.2 });
    const [isChecked, setIsChecked] = useState(true);

    return (
        <div className='audio-container'>
            <p className="audio">
                Toggle for audio{" "}
                <Checkbox
                    className="audio-bttn"
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