export type Quote = {
  id: string | number;
  text: string;
  author: string;
  isGenerated?: boolean;
};

export const quotes: Quote[] = [
  { id: 1, text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { id: 2, text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
  { id: 3, text: "Your time is limited, so don’t waste it living someone else’s life.", author: "Steve Jobs" },
  { id: 4, text: "An unexamined life is not worth living.", author: "Socrates" },
  { id: 5, text: "The journey of a thousand miles begins with a single step.", author: "Lao Tzu" },
  { id: 6, text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { id: 7, text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { id: 8, text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
  { id: 9, text: "Everything you’ve ever wanted is on the other side of fear.", author: "George Addair" },
  { id: 10, text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  { id: 11, text: "Hardships often prepare ordinary people for an extraordinary destiny.", author: "C.S. Lewis" },
  { id: 12, text: "What you get by achieving your goals is not as important as what you become by achieving your goals.", author: "Zig Ziglar" },
  { id: 13, text: "The purpose of our lives is to be happy.", author: "Dalai Lama" },
  { id: 14, text: "You will face many defeats in life, but never let yourself be defeated.", author: "Maya Angelou" },
  { id: 15, text: "In the end, it's not the years in your life that count. It's the life in your years.", author: "Abraham Lincoln" },
  { id: 16, text: "Life is a succession of lessons which must be lived to be understood.", author: "Ralph Waldo Emerson" },
  { id: 17, text: "Go confidently in the direction of your dreams! Live the life you've imagined.", author: "Henry David Thoreau" },
  { id: 18, text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
  { id: 19, text: "Act as if what you do makes a difference. It does.", author: "William James" },
  { id: 20, text: "When you have a dream, you've got to grab it and never let go.", author: "Carol Burnett" },
];