export async function fetchAuthData(): Promise<Set<string>> {
  // Updated SAS token - expires December 13, 2026
  const AZURE_BUCKET_URL =
  'https://partsmanual.blob.core.windows.net/authenticationhash/credentials.json'
+ '?sv=2024-11-04&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2026-12-13T00:40:19Z&st=2025-08-04T15:25:19Z&spr=https,http&sig=7LSdsX4SkTUHUfRuVEKC0MPln0K0G1kAhOY1v9bJUKs%3D';

  try {
    console.log("Attempting to fetch whitelist from Azure blob...");
    
    const response = await fetch(AZURE_BUCKET_URL, { 
      cache: 'no-cache',
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    
    console.log("Response status:", response.status);
    console.log("Response statusText:", response.statusText);
    
    if (!response.ok) {
      console.error(`HTTP Error ${response.status}: ${response.statusText}`);
      
      // If it's a 403, likely the SAS token has expired
      if (response.status === 403) {
        console.error("Access forbidden - SAS token may have expired or CORS not configured");
      }
      
      throw new Error(`Failed to fetch whitelisted emails: ${response.status} ${response.statusText}`);
    }

    const responseText = await response.text();
    console.log("Raw response:", responseText);

    // Try to parse as JSON
    let authDataArray;
    try {
      authDataArray = JSON.parse(responseText);
    } catch (parseError) {
      console.error("Failed to parse JSON response:", parseError);
      throw new Error("Invalid JSON response from blob storage");
    }

    const emailSet = new Set<string>();
    
    // Handle different possible data structures
    if (Array.isArray(authDataArray)) {
      authDataArray.forEach((user: any) => {
        if (typeof user === 'string') {
          // If it's just an array of email strings
          emailSet.add(user.toLowerCase());
        } else if (user && typeof user === 'object') {
          // If it's an array of objects with Email property
          if (user.Email) {
            emailSet.add(user.Email.toLowerCase());
          } else if (user.email) {
            emailSet.add(user.email.toLowerCase());
          }
        }
      });
    } else if (authDataArray && typeof authDataArray === 'object') {
      // If it's a single object, try to extract emails
      Object.values(authDataArray).forEach((value: any) => {
        if (typeof value === 'string' && value.includes('@')) {
          emailSet.add(value.toLowerCase());
        }
      });
    }

    console.log("Fetched whitelisted emails:", emailSet);
    
    if (emailSet.size === 0) {
      console.warn("No emails found in the response, using fallback");
      return new Set(["hshields@trebro.com"]);
    }
    
    return emailSet;

  } catch (error) {
    console.error("Error fetching whitelist. Error details:", error);
    
    // Log specific error types for debugging
    if (error instanceof TypeError && error.message.includes('fetch')) {
      console.error("Network error - check CORS settings and SAS token");
    }
    
    console.log("Returning fallback email set");
    // Temporary expanded fallback for testing
    return new Set([
      "hshields@trebro.com",
      "test@trebro.com",
      "admin@trebro.com"
    ]);
  }
}

