/* Rotates once a day so a return visitor sees something new, and everyone who
   submits on the same day sees the same line.

   These are written for this site rather than attributed to anyone. Quotes get
   misattributed constantly, and putting invented words in a real person's mouth
   on a mental health provider's website is not a risk worth taking for a bit of
   decoration. Same reasoning as the rest of the site: nothing invented.

   They also avoid "just think positive" framing — a person who has only just
   asked a clinic for help should not be told to cheer up. */
export const DAILY_NOTES = [
  "Reaching out is one of the hardest parts, and you have already done it.",
  "Asking for help is a sign of strength, not a sign that something is wrong with you.",
  "You do not have to have the right words to deserve support.",
  "Small steps still count as steps. Today's was a real one.",
  "You are allowed to take up space, and to take the time you need.",
  "Whatever brought you here, you did not have to carry it alone.",
  "Progress is rarely a straight line, and that is not a failure on your part.",
  "Your feelings make sense, even on the days you cannot explain them.",
  "Looking after your mind is as ordinary and as necessary as looking after your body.",
  "You are more than the hardest day you have had.",
  "Rest is not something you have to earn.",
  "It is okay for things to be difficult and for you to still be doing your best.",
  "The people who care about you would want you to have asked, too.",
  "There is no schedule you are behind on.",
];

/* Day of the year, so the note changes at midnight in the reader's own
   timezone. Computed on the client, only after a submission, so there is no
   server/client mismatch to worry about. */
export function noteOfTheDay(date = new Date()) {
  const start = new Date(date.getFullYear(), 0, 0);
  const day = Math.floor((date - start) / 86_400_000);
  return DAILY_NOTES[day % DAILY_NOTES.length];
}
