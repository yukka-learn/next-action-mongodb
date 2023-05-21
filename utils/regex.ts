export function formatWordsWithParentheses(input: string): string {
  //   const regex = /(\b\w+\b)(?:\s(\b\w+\b)(?:\s(\b\w+\b))?)?/;
  const wordRegex = /(\b\w+(?:-\w+)?\b)(?:\s(\b\w+(?:-\w+)?\b)(?:\s(\b\w+(?:-\w+)?\b))?)?/;

  const result = input.replace(wordRegex, (match, group1, group2, group3) => {
    if (group2 && group3) {
      return `${group1} (${group2} ${group3})`;
    } else if (group2) {
      return `${group1} (${group2})`;
    } else {
      return match;
    }
  });

  return result;
}

export function formatWordsInParentheses(input: string): string {
  const words = input.split("-");

  if (words.length === 2) {
    return `${words[0]} (${words[1]})`;
  }

  if (words.length === 3) {
    return `${words[0]} (${words[1]} ${words[2]})`;
  }

  return input;
}

