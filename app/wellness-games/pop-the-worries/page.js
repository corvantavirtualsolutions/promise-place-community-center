import GameShell from "@/components/games/GameShell";
import PopTheWorries from "@/components/games/PopTheWorries";

export const metadata = {
  title: "Pop the Worries",
  description: "Ten drifting bubbles, each holding a worry. Tap them and let them go.",
};

export default function Page() {
  return (
    <GameShell
      title="Pop the Worries"
      blurb="Each bubble holds something that might be weighing on you. Pop them one by one."
      tone="coral"
      instructions="Click or tap a bubble to pop it. Keyboard users can Tab to a bubble and press Enter."
      
    >
      <PopTheWorries />
    </GameShell>
  );
}
