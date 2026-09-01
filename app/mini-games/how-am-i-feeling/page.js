import GameShell from "@/components/games/GameShell";
import HowAmIFeeling from "@/components/games/HowAmIFeeling";

export const metadata = {
  title: "How Am I Feeling?",
  description: "Change the eyebrows, eyes and mouth until the face matches you, and it puts a word to it.",
};

export default function Page() {
  return (
    <GameShell
      eyebrow="Feelings"
      title="How Am I Feeling?"
      blurb="Change the eyebrows, eyes and mouth until the face matches you. It'll tell you the word."
      tone="sun"
      instructions="Sometimes the hardest part is finding the word for it. Change the face until it looks about right, and the word underneath will change with it. There is no correct answer, and nothing here is saved."
    >
      <HowAmIFeeling />
    </GameShell>
  );
}
