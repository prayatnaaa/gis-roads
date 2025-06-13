export const isExpired = (
  timestamp: number,
  expiryMs = 1000 * 60 * 60 * 24 * 7
): boolean => {
  return Date.now() - timestamp > expiryMs;
};
