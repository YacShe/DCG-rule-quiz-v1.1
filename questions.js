// ============================================================
// QUESTIONS DATA
// ------------------------------------------------------------
// Edit this file to add/remove/change questions. No other file
// needs to change.
//
// Each question looks like this:
//
// {
//   text: "The question shown at the top",
//   image: "images/your-file.png",   // optional, leave "" if no image
//   answers: [
//     { text: "Answer A", correct: false, explanation: "Why this is wrong." },
//     { text: "Answer B", correct: true,  explanation: "Why this is correct." },
//     { text: "Answer C", correct: false, explanation: "Why this is wrong." },
//     { text: "Answer D", correct: false, explanation: "Why this is wrong." },
//   ]
// }
//
// - You can have 2, 3 or 4 answers per question.
// - Exactly one answer per question should have correct: true.
// - To swap an image, just drop the new file into the "images"
//   folder and update the "image" path here.
// ============================================================

const QUESTIONS = [
  {
    // Question 1
    text: "In which of the following cases will **Overflow -4** be applied?",
    image: "images/question-image-1.png",
    answers: [
      { text: "A Digimon with an ACE card as the top card being placed under another Digimon/Tamer on the field.", correct: false, explanation: "Moving from/to under another card on the field does not cause Overflow, this is because Overflow states 'the field or under a card' as 2 safe areas." },
      { text: "A Digimon in the breeding area with an ACE digivolution card being moved to the battle area.", correct: false, explanation: "The ACE card did not move from being under a card to anywhere else, so no Overflow." },
      { text: "A Digimon with an ACE card as the top card being De-digivolved.", correct: true, explanation: "De-digivolving a Digimon causes the top card to be trashed, so the ACE card moves from the battle area to the trash, causing Overflow." },
      { text: "A Digimon with an ACE card as the top card Digivolving into a non-ACE card.", correct: false, explanation: "When Digivolving, the ACE card goes directly from being the top card on the field, to being under a card on the field, so Overflow is not applied." },
    ],
  },
  {
    // Question 2
    text: "Your Digimon was De-digivolved resulting in this stack. What happens next?",
    image: "images/question-image-2.png",
    answers: [
      { text: "The Digimon will be placed in the trash, this doesn't count as deletion or being removed from the battle area.", correct: true, explanation: "According to the rules, Digimon with no DP value are placed in the trash, this **does not** count as leaving the battle area." },
      { text: "The Digimon will be deleted by the rules. The inheritable effect cannot be activated.", correct: false, explanation: "Digimon with no DP value are placed in the trash by rules, not deleted." },
      { text: "The Digimon will be removed from the battle area by the rules. The inheritable effect can be activated to try to save it but it will still be removed.", correct: false, explanation: "The inheritable effect cannot be activated because the Digimon is not considered as leaving the battle area." },
      { text: "The Digimon will be removed from the battle area. The inheritable effect can be activated and the Digimon will survive the effect and remain in the battle area.", correct: false, explanation: "Digimon with no DP value cannot exist in the battle area." },
    ],
  },
  {
    // Question 3
    text: "Which of the following scenarios **does not** describe a Digimon leaving the battle area?",
    image: "images/question-image-3.png",
    answers: [
      { text: "A Digimon is placed under another Digimon or Tamer.", correct: false, explanation: "Cards under other cards are not in the battle or breeding areas." },
      { text: "A Digimon is deleted.", correct: false, explanation: "Deleted Digimon are moved from the battle area to the trash." },
      { text: "A Digimon is returned to the hand/deck.", correct: false, explanation: "Returned Digimon are moved from the battle area to the hand or deck." },
      { text: "A Digimon Digivolves.", correct: true, explanation: "Digivolving doesn't cause the Digimon to leave the battle area." },
    ],
  },
  {
    // Question 4
    text: "Player A digivolves into EX11 Medusamon and deletes player B's Megidramon with Wargrowlmon under it. Which is correct?",
    image: "images/question-image-4.png",
    answers: [
      { text: "If Medusamon returns Megidramon to the bottom of the deck, none of its deletion effects can activate (including inheritable effects).", correct: true, explanation: "The top card of a Digimon stack holds all of the effects, and if it's removed from the trash before activating, all deletion effects fail to activate." },
      { text: "Megidramon's deletion effects will activate before Medusamon's 2nd part to return a card to the bottom of the deck.", correct: false, explanation: "Only immediate-type effects can activate in the middle of other effects." },
      { text: "If Medusamon returns Wargrowlmon to the deck, its inheritable OD effect can't activate.", correct: false, explanation: "Inheritable effects are considered to be part of the top card. After deletion, only the top card must stay in trash for deletion effects to activate." },
      { text: "If Medusamon returns Megidramon to the deck, its own OD effect can't activate, but Wargrowlmon's inheritable still can.", correct: false, explanation: "Inheritable effects are considered to be part of the top card. After deletion, only the top card must stay in trash for deletion effects to activate." },
    ],
  },
  {
    // Question 5
    text: "Player A has played Kongou on the previous turn. Player B now digivolves into BT25 Junomon, targeting 1 of player A's Digimon. Which of these statements is true?",
    image: "images/question-image-5.png",
    answers: [
      { text: "Junomon can attempt to place a Digimon into security, and will trash both players' top security even though nothing was placed.", correct: false, explanation: "Effects costs, denoted by the word 'By' must be successfully paid in order to activate the effect that follows them." },
      { text: "If Junomon's effect places 1 of their own Digimon into security instead, then the following effect can be activated.", correct: false, explanation: "Kongou prevents cards from being placed into either security stack." },
      { text: "If Junomon becomes unaffected by effects, the effect can activate successfully.", correct: false, explanation: "Kongou affects both players, not any particular Digimon." },
      { text: "Junomon will attempt to place something into security, but will fail and nothing else will happen.", correct: true, explanation: "If cards can't be added to security stacks, Junomon's effect cost cannot be successfully paid." },
    ],
  },
  {
    // Question 6
    text: "What statement is **not true** regarding battles?",
    image: "images/question-image-6.png",
    answers: [
      { text: "Battle is a game rule where DP is compared between Digimon to determine the winner.", correct: false, explanation: "" },
      { text: "'Winning a battle' also counts when checking a Digimon card in security and having more DP.", correct: false, explanation: "Battles against security Digimon are battles." },
      { text: "An unaffected Digimon can be chosen for effects that initiate a battle.", correct: false, explanation: "Battle is a game rule, not an effect, so being unaffected by effects does not prevent it from being chosen." },
      { text: "A battle is not considered won if the losing Digimon prevents its deletion.", correct: true, explanation: "Winning a battle only refers to the act of comparing DP, what happens afterwards is irrelevant." },
    ],
  },
  {
    // Question 7
    text: "Machinedramon attacked Saberdramon and won, deleting Saberdramon. Saberdramon attempts to delete Machinedramon using <Retaliation> and it responds by removing MetalTyrannomon and another card from under it to prevent deletion. Can <Piercing> be activated to check security?",
    image: "images/question-image-7.png",
    answers: [
      { text: "Yes", correct: true, explanation: "Even though MetalTyrannomon is no longer in Machinedramon's digivolution cards, it was there when the battle was won, which caused <Piercing> to trigger, allowing Machinedramon to check security." },
      { text: "No", correct: false, explanation: "<Piercing> triggers when a Digimon is deleted in battle, with the security checks happening just before the end of the attack. Since Saberdramon was deleted in battle, <Piercing> would still trigger, allowing it to check security." },
    ],
  },
  {
    // Question 8
    text: "Player A has a Diaboromon token and attempts to remove Player B's BT24 Venusmon. Venusmon targets the token to be placed into security to protect herself. Which of these statements is true?",
    image: "images/question-image-8.png",
    answers: [
      { text: "Venusmon cannot place a token into security because it's not a Digimon.", correct: false, explanation: "Tokens are played as Digimon and can be targeted by anything that targets Digimon." },
      { text: "Venusmon can target the token, the token will be removed from the game and Venusmon will not be removed.", correct: true, explanation: "Tokens are removed from play when they leave the battle area, but they still fulfill effect cost conditions such as 'By placing a Digimon into security'." },
      { text: "Venusmon can target the token, the token will be removed from the game, but Venusmon will still be removed because the token wasn't placed into security.", correct: false, explanation: "Tokens are removed from play when they leave the battle area, but they still fulfill effect cost conditions such as 'By placing a Digimon into security'." },
      { text: "Venusmon can target the token, the token will be placed into security and Venusmon will not be removed.", correct: false, explanation: "Tokens are removed from play when they leave the battle area,cthey cannot exist in any other area." },
    ],
  },
//   {
//     // Question x
//     text: "Question",
//     image: "images/question-image-x.png",
//     answers: [
//       { text: "X", correct: true, explanation: "Y" },
//       { text: "X", correct: false, explanation: "Y" },
//       { text: "X", correct: false, explanation: "Y" },
//       { text: "X", correct: false, explanation: "Y" },
//     ],
//   },
];
