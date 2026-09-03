import GameShell from "@/components/games/GameShell";
import BalanceStones from "@/components/games/BalanceStones";

export const metadata = {
  title: "Balance Stones",
  description: "Stack smooth stones into a cairn. Nothing to beat, nothing to lose — only the stone you just placed can ever fall.",
};

export default function Page() {
  return (
    <GameShell
      eyebrow="Quiet activity"
      title="Balance Stones"
      blurb="Set one smooth stone on another and see how high the pile will go."
      tone="teal"
      instructions="Move your finger or mouse across the sky to aim, then tap to set the stone down. Lean too far out and that stone slides off — but only that one. The cairn under it stays put, and you can set another straight away. There is no timer and no way to lose it all."
      wide
    >
      <BalanceStones />
    </GameShell>
  );
}
