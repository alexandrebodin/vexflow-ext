import { useEffect, useState } from "react";
import { Stave } from "@alexandrebodin/react-vexflow";

const getRandomNote = () => {
  const notes = ["c", "d", "e", "f", "g", "a", "b"];
  const octaves = ["3", "4", "5"];
  const accidentals = ["", "#", "b"];

  const note = notes[Math.floor(Math.random() * notes.length)];
  const octave = octaves[Math.floor(Math.random() * octaves.length)];
  const accidental =
    accidentals[Math.floor(Math.random() * accidentals.length)];

  return `${note}${accidental}/${octave}`;
};

function App() {
  const [notes, setNotes] = useState<any>([
    { keys: [getRandomNote()], duration: "q" },
    { keys: [getRandomNote()], duration: "q" },
    { keys: [getRandomNote()], duration: "q" },
    { keys: [getRandomNote()], duration: "q" },
  ]);

  return (
    <>
      <Stave
        clef="treble"
        timeSignature="4/4"
        keySignature="Cm"
        notes={notes}
      />
    </>
  );
}

export default App;
