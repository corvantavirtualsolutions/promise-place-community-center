import GameShell from "@/components/games/GameShell";
import BalloonBreath from "@/components/games/BalloonBreath";

export const metadata = {
  title: "Balloon Breath",
  description: "Hold to fill the balloon and let go to breathe out. Five slow breaths, paced by your own hand.",
};

export default function Page() {
  return (
    <GameShell
      title="Balloon Breath"
      blurb="Hold to fill the balloon. Let go, and it floats away with your breath."
      tone="teal"
      instructions="Press and hold anywhere on the balloon — or hold the space bar — for as long as you comfortably can, then let go. Five breaths is the whole exercise."
    >
      <BalloonBreath />
    </GameShell>
  );
}
