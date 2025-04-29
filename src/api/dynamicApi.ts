export const shortenUrl = async (url: string) => {
  if (!url || url.length < 5) {
    throw new Error('Invalid URL');
  }

  try {
    const response = await fetch(`https://api.tinyurl.com/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_TINYURL_API_KEY}`
      },
      body: JSON.stringify({
        url: url,
        domain: "tinyurl.com"
      })
    });

    const data = await response.json();

    if (!response.ok || !data?.data?.tiny_url) {
      throw new Error('Failed to shorten URL, make sure you are not trying to shorten already shortened link');
    }

    return data.data.tiny_url;

  } catch (error) {
    console.error('Error shortening URL:', error);
    throw new Error('Failed to shorten URL, make sure you are not trying to shorten already shortened link');
  }
};
