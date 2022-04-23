import React, { Component, useRef, useEffect, useState } from "react";
import { Howl, Howler } from "howler";
import useSound from "use-sound";
import Audio1 from "../../assets/audioClips/songformydeath.mp3";

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

export default useAudio;
