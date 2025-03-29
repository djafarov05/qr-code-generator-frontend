// Dynamic HTML + JavaScript API - URL shortener using TinyURL's API
export const shortenUrl = async (url: string) => {
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
    return data.data.tiny_url;
  } catch (error) {
    console.error('Error shortening URL:', error);
    throw new Error('Failed to shorten URL');
  }
};