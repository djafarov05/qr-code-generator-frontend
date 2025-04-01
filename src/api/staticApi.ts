// Static HTML API - Returns pre-existing QR code tips
export const getTip = async () => {
  try {
    const response = await fetch('/tips.json');
    const data = await response.json();
    return data.qrTips[Math.floor(Math.random() * data.qrTips.length)];
  } catch (error) {
    console.error('Error fetching QR tip:', error);
    return 'Keep your QR code easily scannable';
  }
};