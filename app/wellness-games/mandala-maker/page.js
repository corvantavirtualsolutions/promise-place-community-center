import GameShell from "@/components/games/GameShell";
import MandalaMaker from "@/components/games/MandalaMaker";

export const metadata = {
  title: "Mandala Maker",
  description: "Draw one line and it mirrors around the centre into a symmetrical pattern you can save.",
};

export default function Page() {
  return (
    <GameShell
      title="Mandala Maker"
      blurb="Draw one line and it mirrors eight ways. Every scribble comes out beautiful."
      tone="grape"
      instructions="Drag anywhere on the circle. Whatever you draw is repeated around the centre, so there is no way to make it look wrong. Change the colour, the brush or the number of mirrors whenever you like."
      wide
    >
      <MandalaMaker />
    </GameShell>
  );
}
