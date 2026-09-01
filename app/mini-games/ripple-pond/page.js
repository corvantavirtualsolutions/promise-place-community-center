import GameShell from "@/components/games/GameShell";
import RipplePond from "@/components/games/RipplePond";

export const metadata = {
  title: "Ripple Pond",
  description: "Touch still water and watch the rings spread. The lilies and the fish feel every one.",
};

export default function Page() {
  return (
    <GameShell
      eyebrow="Quiet activity"
      title="Ripple Pond"
      blurb="Touch the water and rings spread out. The lilies and the fish feel every one."
      tone="sky"
      instructions="Touch anywhere on the water, or drag a finger across it. The rings pass through each other, and the lily pads and fish move as they go by. There is nothing to finish."
      wide
    >
      <RipplePond />
    </GameShell>
  );
}
