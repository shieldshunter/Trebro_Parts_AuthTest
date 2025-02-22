export async function fetchAuthData(): Promise<Record<string, string>> {
  const AZURE_BUCKET_URL = 'https://partsmanual.blob.core.windows.net/authenticationhash/credentials.json?sp=r&st=2025-02-22T04:11:14Z&se=2025-03-08T12:11:14Z&sv=2022-11-02&sr=b&sig=lbb2TljS4yUSeTo8iDYcCmQgeZVq3uu7d90h6uqg4jM%3D';

  try {
    const response = await fetch(AZURE_BUCKET_URL);
    if (!response.ok) throw new Error(`Failed to fetch auth data: ${response.statusText}`);

    const authDataArray = await response.json(); // Expecting an array

    // Convert array to a dictionary { email: hashedPassword }
    const authDataMap: Record<string, string> = {};
    authDataArray.forEach((user: { Email: string; Password: string; }) => {
      authDataMap[user.Email.toLowerCase()] = user.Password;
    });

    console.log("Fetched authentication data:", authDataMap);
    return authDataMap;
  } catch (error) {
    console.error("Error fetching authentication data:", error);
    return {};  // Return an empty object instead of an array
  }
}
