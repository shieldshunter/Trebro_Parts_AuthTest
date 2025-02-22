import { fetchAuthData } from './fetchAuthData';

let emailPasswordMap: Record<string, string> = {};

// Fetch credentials once and cache them in memory
(async () => {
  emailPasswordMap = await fetchAuthData();
})();

// Function to get the cached authentication data
async function getCachedAuthData(): Promise<Record<string, string>> {
  if (Object.keys(emailPasswordMap).length === 0) {
    emailPasswordMap = await fetchAuthData(); // Fetch only if cache is empty
  }
  return emailPasswordMap;
}

const shouldAuthenticate = true;

/**
 * Utility: Hashes a string using SHA-256.
 */
async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

class Auth {
  async isAuthenticated(): Promise<boolean> {
    const userData = await this.getUserData();
    if (!userData || !userData.email) return false;

    const storedHash = emailPasswordMap[userData.email.toLowerCase()];
    return storedHash === userData.hashedPassword || !shouldAuthenticate;
  }

  async getUserData(): Promise<Record<string, any> | null> {
    const { zeaUserData } = window.localStorage;
    return zeaUserData ? JSON.parse(zeaUserData) : null;
  }

  async setUserData(userData: Record<string, any>) {
    if (shouldAuthenticate) {
      const emailLower = userData.email.toLowerCase();

      if (!emailPasswordMap[emailLower]) {
        throw new Error('Email not registered. Please request access.');
      }
      if (!userData.password) {
        throw new Error('Password not provided.');
      }

      // Hash the entered password
      const computedHash = await sha256(userData.password);

      if (emailPasswordMap[emailLower] !== computedHash) {
        throw new Error('Wrong password.');
      }

      userData.hashedPassword = computedHash;
      userData.password = ''.padEnd(6, '*'); // Hide actual password
    }

    window.localStorage.zeaUserData = JSON.stringify(userData);
  }

  async signOut() {
    localStorage.removeItem('zeaUserData');
  }
}

const auth = new Auth();

export default auth;
export { auth, shouldAuthenticate, getCachedAuthData };
