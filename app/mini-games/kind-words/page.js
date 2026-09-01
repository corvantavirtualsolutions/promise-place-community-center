import GameShell from "@/components/games/GameShell";
import KindWords from "@/components/games/KindWords";

export const metadata = {
  title: "Kind Words",
  description: "Fridge-magnet word tiles you can arrange into a sentence. Every word in the box is a gentle one.",
};

export default function Page() {
  return (
    <GameShell
      eyebrow="Creative activity"
      title="Kind Words"
      blurb="Word tiles you can arrange into a sentence. Every word here is a gentle one."
      tone="grape"
      instructions="Tap a word to add it to your sentence, and tap it again up top to take it back out. There are no unkind words in the box, so whatever you build will land somewhere good."
      wide
    >
      <KindWords />
    </GameShell>
  );
}
