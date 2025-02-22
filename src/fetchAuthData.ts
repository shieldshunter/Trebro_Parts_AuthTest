export async function fetchAuthData(): Promise<Record<string, string>> {
  const AZURE_BUCKET_URL = '';

  try {
    const response = await fetch(AZURE_BUCKET_URL);
    if (!response.ok) throw new Error(`Failed to fetch auth data: ${response.statusText}`);

    const authData: Record<string, string> = await response.json();
    console.log("Fetched authentication data:", authData);

    return authData;
  } catch (error) {
    console.error("Error fetching authentication data:", error);
    return {};
  }
}

export default fetchAuthData;
