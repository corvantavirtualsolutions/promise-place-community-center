import GameShell from "@/components/games/GameShell";
import ZenSandGarden from "@/components/games/ZenSandGarden";

export const metadata = {
  title: "Zen Sand Garden",
  description: "Rake patterns into sand and set stones wherever you like. No goal, no ending, no score.",
};

export default function Page() {
  return (
    <GameShell
      eyebrow="Quiet activity"
      title="Zen Sand Garden"
      blurb="Rake patterns into the sand with your finger and set stones wherever you like."
      tone="sun"
      instructions="Drag across the sand to rake it. Tap anywhere to set a stone, and rings will ripple out around it. There is nothing to finish here — stay as long as you like."
      wide
    >
      <ZenSandGarden />
    </GameShell>
  );
}
