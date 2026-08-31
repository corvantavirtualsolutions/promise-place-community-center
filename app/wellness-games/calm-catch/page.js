import GameShell from "@/components/games/GameShell";
import CalmCatch from "@/components/games/CalmCatch";

export const metadata = {
  title: "Calm Catch",
  description: "A slow, unhurried catching game. Gather kindness, hope and joy for one minute.",
};

export default function Page() {
  return (
    <GameShell
      title="Calm Catch"
      blurb="Move the basket and gather the good things as they drift down. One minute, no pressure."
      tone="sun"
      instructions="Use the left and right arrow keys, drag inside the game area, or use the on-screen buttons on a phone. Catching a rain cloud costs you nothing."
      wide
    >
      <CalmCatch />
    </GameShell>
  );
}
