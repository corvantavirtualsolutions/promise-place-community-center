import GameShell from "@/components/games/GameShell";
import ColourMixer from "@/components/games/ColourMixer";

export const metadata = {
  title: "Colour Mixer",
  description: "Drop paint into a bowl, watch new colours appear, and keep the ones you like.",
};

export default function Page() {
  return (
    <GameShell
      eyebrow="Creative activity"
      title="Colour Mixer"
      blurb="Drop paints into the bowl and watch a brand new colour appear. It'll tell you its name."
      tone="coral"
      instructions="Tap any paint to add a drop. The bowl mixes as you go, so a single drop of something dark shifts it gently rather than all at once. When you like what you see, keep it — kept colours line up underneath, and you can drop them back in to keep going."
    >
      <ColourMixer />
    </GameShell>
  );
}
