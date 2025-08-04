export const copyToClipboard = async (textToCopy: string) => {
  try {
    await navigator.clipboard.writeText(textToCopy);
    alert('Link copied to clipboard');
  } catch (err) {
    prompt('Please copy the link manually', textToCopy);
  }
};
