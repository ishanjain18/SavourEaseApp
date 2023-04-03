// Capitalize first letter of each word in sentence
export function capitalizeWords(sentence) {
  let words = sentence.toLowerCase().split(" ");
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].substring(1);
  }
  return words.join(" ");
}

// Generate a random number between min (inclusive) and max (inclusive)
export function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomValue(arr) {
  if (arr.length === 0) {
    return [];
  }
  return arr[getRandomNumber(0, arr.length - 1)];
}
