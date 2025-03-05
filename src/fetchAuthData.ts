export async function fetchAuthData(): Promise<Record<string, string>> {
  const AZURE_BUCKET_URL =
    'https://partsmanual.blob.core.windows.net/authenticationhash/credentials.json'
    + '?sp=r&st=2025-02-22T04:11:14Z&se=2025-03-08T12:11:14Z&sv=2022-11-02&sr=b'
    + '&sig=lbb2TljS4yUSeTo8iDYcCmQgeZVq3uu7d90h6uqg4jM%3D';

  try {
    // The 'no-cache' setting:
    //  - STILL allows caching of the response.
    //  - BUT forces the browser to verify with the server
    //    if the cached copy is fresh before using it.
    const response = await fetch(AZURE_BUCKET_URL, { cache: 'no-cache' });
    if (!response.ok) {
      throw new Error(`Failed to fetch auth data: ${response.statusText}`);
    }

    // Expecting an array of user objects
    const authDataArray = await response.json();

    const authDataMap: Record<string, string> = {};
    authDataArray.forEach((user: { Email: string; Password: string }) => {
      authDataMap[user.Email.toLowerCase()] = user.Password;
    });

    console.log("Fetched authentication data:", authDataMap);
    return authDataMap;

  } catch (error) {
    console.error("Error fetching authentication data:", error);
    return {}; // Return an empty object on error
  }
}
