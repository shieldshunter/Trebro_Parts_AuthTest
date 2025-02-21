/*********************************
 * auth.ts
 *********************************/
/*
 * Temporary “whitelist” as a simple array for demonstration.
 * Replace with real list, or load from a CSV/server.
 */
const validEmails = [
  'hshields@trebro.com',
  'Barry'
]

// Mocked password: "zea"
const HASHED_PASSWORD = '2d37e395cc590b4e127317494566f1aaf881f0ac1b5ff7d4180506fd682d68ea'

// To disable authentication, set `shouldAuthenticate` to false
const shouldAuthenticate = true

/**
 * Utility: Hashes a string using SHA-256.
 */
async function sha256(message: string): Promise<string> {
  // Encode as UTF-8
  const msgBuffer = new TextEncoder().encode(message)
  // Hash the message
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer)
  // Convert ArrayBuffer to Array
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  // Convert bytes to hex string
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
  return hashHex
}

class Auth {
  /**
   * Checks if the user is considered "authenticated."
   * Returns true if:
   *   - user data is in localStorage, AND
   *   - the saved hashed password is the known HASHED_PASSWORD, OR
   *   - authentication is disabled.
   */
  async isAuthenticated(): Promise<boolean> {
    const userData = await this.getUserData()
    console.log('isAuthenticated userData:', userData)
    // userData will exist if setUserData() succeeded before.
    // If !shouldAuthenticate, we skip the password check.
    if (!userData) return false

    const isPasswordMatch = userData.hashedPassword === HASHED_PASSWORD
    return isPasswordMatch || !shouldAuthenticate
  }

  /**
   * Retrieves current user data from localStorage.
   */
  async getUserData(): Promise<Record<string, any> | null> {
    const { zeaUserData } = window.localStorage
    return zeaUserData ? JSON.parse(zeaUserData) : null
  }

  /**
   * Stores the user data in localStorage AFTER validating:
   *   1. The user’s email is whitelisted.
   *   2. The password matches our known hash (if authentication is enabled).
   */
  async setUserData(userData: Record<string, any>) {
    // If we’re actually authenticating:
    if (shouldAuthenticate) {
      if (!userData.email || !validEmails.includes(userData.email.trim().toLowerCase())) {
        throw new Error('Email not whitelisted. Please request access.')
      }
      if (!userData.password) {
        throw new Error('Password not provided.')
      }

      console.log('Original userData:', userData)

      // If there’s no hashedPassword set yet, or the hashed value is out of sync, recalculate it:
      const computedHash = await sha256(userData.password)
      if (!userData.hashedPassword || userData.hashedPassword !== computedHash) {
        userData.hashedPassword = computedHash
        console.log('Hashed password:', userData.hashedPassword)
        // Replace the original plain-text password with asterisks before storing.
        userData.password = ''.padEnd(6, '*')
      }

      // If the hashed password does not match the known password, throw an error:
      if (userData.hashedPassword !== HASHED_PASSWORD) {
        throw new Error('Wrong password.')
      }
    }

    // If we reach here, either we are not authenticating at all (shouldAuthenticate=false),
    // or the user’s email and password checks succeeded.
    console.log('Setting userData:', userData)
    window.localStorage.zeaUserData = JSON.stringify(userData)
  }

  /**
   * Removes user data from localStorage, effectively signing out the current user.
   */
  async signOut() {
    console.log('Signing out')
    localStorage.removeItem('zeaUserData')
    console.log('User data removed:', !localStorage.getItem('zeaUserData'))
  }
}

const auth = new Auth()

export default auth
export { auth, shouldAuthenticate, validEmails }
