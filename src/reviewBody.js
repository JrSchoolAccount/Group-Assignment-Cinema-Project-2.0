export function reviews(newReview) {
  const date = new Date().toISOString();
  const body = {
    data: {
      comment: 'string',
      rating: 0,
      author: 'string',
      verified: true,
      movie: 'string or id',
      createdAt: date,
      updatedAt: date,
      createdBy: 'string or id',
      updatedBy: 'string or id',
      ...newReview,
    },
  };
  return body;
}
