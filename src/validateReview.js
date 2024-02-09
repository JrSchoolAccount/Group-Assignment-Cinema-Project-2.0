export function validateReview(review) {
  const { name, comment, rating } = review;
  if (!name || !comment || rating === undefined) {
    return { valid: false, error: 'Alla nödvändiga fält måste vara ifyllda.' };
  }
  if (rating < 0 || rating > 5) {
    return { valid: false, error: 'Rating måste vara mellan 0 och 5.' };
  }
  return { valid: true };
}

