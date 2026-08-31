import GameShell from "@/components/games/GameShell";
import BreatheAndGrow from "@/components/games/BreatheAndGrow";

export const metadata = {
  title: "Breathe & Grow",
  description: "A guided breathing exercise: five slow breaths, and a flower that grows with each one.",
};

export default function Page() {
  return (
    <GameShell
      title="Breathe & Grow"
      blurb="Follow the circle. Breathe in as it grows, out as it settles. Five breaths, and your flower blooms."
      tone="teal"
      instructions="Press Start Breathing, then follow the circle — in for four seconds, out for four. The flower grows with every completed breath."
      
    >
      <BreatheAndGrow />
    </GameShell>
  );
}
