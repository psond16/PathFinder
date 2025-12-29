const LETTER_TEMPLATES = [
    ({ boardName, reflection }) => `
  You once named this board "${boardName}" because it meant something real to you.
  
  At the beginning, you wrote:
  "${reflection}"
  
  Time taught you something gentle:
  progress was never loud.
  It was made of quiet effort,
  small consistency,
  and choosing yourself again and again.
  `,
  
    ({ boardName, reflection }) => `
  This board was called "${boardName}" for a reason.
  
  You started with this thought:
  "${reflection}"
  
  What you didn’t know then —
  was that growth happens slowly,
  almost invisibly,
  until one day you realize
  you’re no longer who you used to be.
  `,
  
    ({ boardName, reflection }) => `
  When you created "${boardName}",
  you were hoping more than believing.
  
  You wrote:
  "${reflection}"
  
  Months later,
  you understand this now:
  the future version of you
  was built by ordinary days
  you decided not to quit.
  `,
  ];
  
  export function generatePseudoLetter({ boardName, reflection }) {
    const template =
      LETTER_TEMPLATES[Math.floor(Math.random() * LETTER_TEMPLATES.length)];
  
    return template({
      boardName: boardName || "My Vision Board",
      reflection:
        reflection || "You believed this version of yourself was possible.",
    });
  }
  