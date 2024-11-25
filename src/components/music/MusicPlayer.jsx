import { useEffect, useRef, useState } from "react";
import Sound from "../../assets/the-uprising.mp3";
import "../../styles/notFound.css";

// MusicPlayer component that plays the audio file and updates the audioData
const MusicPlayer = ({ audioData }) => {
  const audioRef = useRef(null);
  const [audioCtx, setAudioCtx] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let analyser;
    let dataArray;
    let bufferLength;
    const localAudioRef = audioRef.current;

    // Initialize audio context and event listeners
    const initializeAudio = () => {
      if (!audioCtx) {
        const context = new (window.AudioContext || window.webkitAudioContext)();
        analyser = context.createAnalyser();
        analyser.fftSize = 256;

        const source = context.createMediaElementSource(localAudioRef);
        source.connect(analyser);
        source.connect(context.destination);

        bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);

        setAudioCtx(context);
      }
    };

    // Handle audio play/pause
    const handleAudioToggle = () => {
      if (audioCtx.state === "suspended") {
        audioCtx.resume();
      }
      if (localAudioRef.paused) {
        localAudioRef.play();
        setIsPlaying(true);
      } else {
        localAudioRef.pause();
        setIsPlaying(false);
      }
    };

    // Update audio data
    const updateAudioData = () => {
      if (analyser) {
        analyser.getByteFrequencyData(dataArray);
        const average = dataArray.reduce((sum, value) => sum + value, 0) / bufferLength;
        audioData.current = average / 256.0;
      }
      requestAnimationFrame(updateAudioData);
    };

    // Initialize audio context and event listener
    document.addEventListener("click", initializeAudio);
    document.addEventListener("click", handleAudioToggle);
    updateAudioData();

    return () => {
      // Cleanup resources
      document.removeEventListener("click", initializeAudio);
      document.removeEventListener("click", handleAudioToggle);
      if (localAudioRef) localAudioRef.pause();
      if (audioCtx) audioCtx.close();
    };
  }, [audioCtx, audioData]);

  return (
    <div className="music-menu">
      <p
        onClick={() => {
          if (audioRef.current.paused) {
            audioRef.current.play();
            setIsPlaying(true);
          } else {
            audioRef.current.pause();
            setIsPlaying(false);
          }
        }}
        aria-label={isPlaying ? "Pause Music" : "Touch the Blob"}
      >
        {isPlaying ? "Pause Music" : "Tap the Blob"}
      </p>
      <audio ref={audioRef} src={Sound} crossOrigin="anonymous" volume="0.5" />
    </div>
  );
};

export default MusicPlayer;
