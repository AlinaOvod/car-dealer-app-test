export const apiClient = async (endpoint: string, options?: RequestInit) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!baseUrl) {
    throw new Error('API URL is not defined');
  }

  const url = `${baseUrl}${endpoint}`;

  try {
    console.log(`url: ${url}`);

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`API request failed: ${error.message}`);
    } else {
      console.error('Unknown error occurred during API request');
    }
    throw error;
  }
};
