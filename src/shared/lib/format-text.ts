export const formatTextToTitleCase = (text: string): string => {
  if (!text) return '';

  return text
    .toLowerCase()
    .replace(/-/g, ' ')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
