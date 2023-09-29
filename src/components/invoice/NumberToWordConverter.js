import React from 'react';
import numberToWords from 'number-to-words';

const NumberToWordConverter = ({ amount }) => {
  const numericAmount = parseFloat(amount);
  if (isNaN(numericAmount)) {
    return <div>Invalid input</div>;
  }
  // Convert the numeric amount to words
  const amountInWords = numberToWords.toWords(Math.floor(numericAmount));
  const formattedAmount = `${amountInWords
    .charAt(0)
    .toUpperCase()}${amountInWords.slice(1)}`;

  return <div>{formattedAmount} rupees</div>;
};

export default NumberToWordConverter;
