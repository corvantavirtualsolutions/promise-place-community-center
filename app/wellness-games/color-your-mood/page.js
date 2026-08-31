import GameShell from "@/components/games/GameShell";
import ColorYourMood from "@/components/games/ColorYourMood";

export const metadata = {
  title: "Color Your Mood",
  description: "A simple digital colouring activity with five drawings and eight colours.",
};

export default function Page() {
  return (
    <GameShell
      title="Color Your Mood"
      blurb="Choose a color and create something that feels good to you."
      tone="grape"
      instructions="Pick a colour, then click a part of the drawing to fill it. Switch pictures any time, reset to start over, or save your artwork as an image."
      wide
    >
      <ColorYourMood />
    </GameShell>
  );
}
