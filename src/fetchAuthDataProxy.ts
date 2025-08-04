// Alternative approach using an Azure Function proxy
export async function fetchAuthDataViaProxy(): Promise<Set<string>> {
  // You can create an Azure Function that fetches from blob storage
  // and returns the data with proper CORS headers
  const PROXY_URL = 'https://your-function-app.azurewebsites.net/api/getAuthData';

  try {
    console.log("Attempting to fetch whitelist via Azure Function proxy...");
    
    const response = await fetch(PROXY_URL, { 
      cache: 'no-cache',
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch whitelisted emails: ${response.status} ${response.statusText}`);
    }

    const authDataArray = await response.json();
    const emailSet = new Set<string>();
    
    authDataArray.forEach((user: { Email: string }) => {
      emailSet.add(user.Email.toLowerCase());
    });

    console.log("Fetched whitelisted emails via proxy:", emailSet);
    return emailSet;

  } catch (error) {
    console.error("Error fetching whitelist via proxy:", error);
    return new Set(["hshields@trebro.com"]);
  }
}
