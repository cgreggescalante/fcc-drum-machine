import { useEffect, useRef, useState } from "react";
import "./App.css";

const drumPadData = [
  {
    id: "Q",
    src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3",
  },
  {
    id: "W",
    src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-2.mp3",
  },
  {
    id: "E",
    src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-3.mp3",
  },
  {
    id: "A",
    src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-4_1.mp3",
  },
  {
    id: "S",
    src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-6.mp3",
  },
  {
    id: "D",
    src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Dsc_Oh.mp3",
  },
  {
    id: "Z",
    src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Kick_n_Hat.mp3",
  },
  {
    id: "X",
    src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/RP4_KICK_1.mp3",
  },
  {
    id: "C",
    src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3",
  },
];

function App() {
  const [display, setDisplay] = useState<string>("");

  return (
    <div id={"container"}>
      <div id={"drum-machine"}>
        <div id={"display"}>{display}</div>

        <div id={"drum-pads"}>
          {drumPadData.map((drumPad) => (
            <DrumPad
              id={drumPad.id}
              src={drumPad.src}
              key={drumPad.id}
              onPress={() => setDisplay(drumPad.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const DrumPad = ({
  id,
  src,
  onPress,
}: {
  id: string;
  src: string;
  onPress: () => void;
}) => {
  const ref = useRef<HTMLAudioElement>(null);

  const handleClick = () => {
    if (!ref.current) return;

    onPress();

    ref.current.currentTime = 0;
    ref.current.play();
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key.toUpperCase() === id) {
        handleClick();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div className={"drum-pad"} id={id} onClick={handleClick}>
      <audio ref={ref} id={id} src={src} className={"clip"} />
      {id}
    </div>
  );
};

export default App;
