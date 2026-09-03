import GameShell from "@/components/games/GameShell";
import ConstellationConnect from "@/components/games/ConstellationConnect";

export const metadata = {
  title: "Constellation Connect",
  description: "Join stars into your own constellation and give it a name. There is no right answer.",
};

export default function Page() {
  return (
    <GameShell
      eyebrow="Quiet activity"
      title="Constellation Connect"
      blurb="Join the stars into any shape you like, then give it a name of your own."
      tone="grape"
      instructions="Tap a star, then tap another, and a line joins them. Keep tapping and the line keeps going. Nothing here is a puzzle with a solution — whatever you make is the right shape. Clear the lines or ask for a different sky whenever you want to start over."
      wide
    >
      <ConstellationConnect />
    </GameShell>
  );
}
