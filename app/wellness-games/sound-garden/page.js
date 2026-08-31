import GameShell from "@/components/games/GameShell";
import SoundGarden from "@/components/games/SoundGarden";

export const metadata = {
  title: "Sound Garden",
  description: "Tap squares to plant notes and hear them loop back as a calm melody. No music experience needed.",
};

export default function Page() {
  return (
    <GameShell
      title="Sound Garden"
      blurb="Tap squares to plant notes. They loop back as a tune that cannot sound wrong."
      tone="sky"
      instructions="Tap any squares you like, then press Play. Every row is a note from the same scale, so whatever you choose will sound right together. Sound can be turned off at any time."
      wide
    >
      <SoundGarden />
    </GameShell>
  );
}
