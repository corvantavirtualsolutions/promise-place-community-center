import GameShell from "@/components/games/GameShell";
import MemoryMatch from "@/components/games/MemoryMatch";

export const metadata = {
  title: "Memory Match",
  description: "A calm memory card game with eight pairs to find. No timer and no pressure.",
};

export default function Page() {
  return (
    <GameShell
      title="Memory Match"
      blurb="Turn over two cards at a time and find the eight matching pairs. Take as long as you like."
      tone="sky"
      instructions="Click or tap a card to turn it over, then turn over a second. Matching pairs stay face up. You can also move between cards with Tab and select with Enter."
      
    >
      <MemoryMatch />
    </GameShell>
  );
}
