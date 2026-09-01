import GameShell from "@/components/games/GameShell";
import PopIt from "@/components/games/PopIt";

export const metadata = {
  title: "Pop It",
  description: "A board of bubbles to press. Finish it and flip it over. Something to do with your hands.",
};

export default function Page() {
  return (
    <GameShell
      eyebrow="Fidget"
      title="Pop It"
      blurb="A whole board of bubbles to press. When you finish it, flip it over and go again."
      tone="coral"
      instructions="Press a bubble and it pops straight in. Drag across the board to pop a whole row at once. When every bubble is in, the board flips itself and you can start again."
    >
      <PopIt />
    </GameShell>
  );
}
