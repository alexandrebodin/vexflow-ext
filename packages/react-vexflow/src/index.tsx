import React from "react";
import { Flow } from "vexflow";

interface StaveProps {
  clef?: "treble" | "bass";
  timeSignature?: string;
  keySignature?: string;
  notes: any[];
}

export const Stave = (props: StaveProps) => {
  const { clef = "treble", timeSignature = "4/4", keySignature, notes } = props;

  const ctxRef = React.useRef<any>(null);
  const ref = React.useRef<any>(null);

  React.useEffect(() => {
    if (!ref.current) {
      return;
    }

    if (!ctxRef.current) {
      ctxRef.current = new Flow.SVGContext(ref.current);
    }

    const context = ctxRef.current;

    context.clear();

    const stave = new Flow.Stave(10, 10, 500);
    context.resize(600, 200);

    stave.setClef(clef).setTimeSignature(timeSignature);

    if (keySignature) {
      stave.setKeySignature(keySignature);
    }

    stave.setContext(context).draw();

    if (notes.length > 0) {
      const voice = new Flow.Voice({ num_beats: 4, beat_value: 4 });
      voice.addTickables(
        notes.map(
          (note) =>
            new Flow.StaveNote({
              keys: note.keys,
              duration: note.duration,
            })
        )
      );

      new Flow.Formatter().joinVoices([voice]).format([voice], 200);

      voice.draw(context, stave);
    }
  }, [notes]);

  return <div ref={ref}></div>;
};
