function validateDuration(duration) {
  const parsed = parseInt(duration);
  if (isNaN(parsed) || parsed < 1) {
    throw new Error('Duration must be a positive number');
  }
  return parsed;
}
