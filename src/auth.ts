// Mocked password: "zea"
// Remember to generate a new one for your demo, here:
// https://xorbin.com/tools/sha256-hash-calculator
const HASHED_PASSWORD = '2d37e395cc590b4e127317494566f1aaf881f0ac1b5ff7d4180506fd682d68ea'

// To disable authentication, set `shouldAuthenticate` to false.
const shouldAuthenticate = true

async function sha256(message: string) {
  // encode as UTF-8
  const msgBuffer = new TextEncoder().encode(message)

  // hash the message
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer)

  // convert ArrayBuffer to Array
  const hashArray = Array.from(new Uint8Array(hashBuffer))

  // convert bytes to hex string
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
  return hashHex
}

class Auth {
  async isAuthenticated() {
    const userData = await this.getUserData()
    console.log('isAuthenticated userData:', userData)
    return userData && (userData.hashedPassword === HASHED_PASSWORD || !shouldAuthenticate)
  }

  async getUserData() {
    const { zeaUserData } = window.localStorage
    return zeaUserData && JSON.parse(zeaUserData)
  }

//Retooled so that after initial user login and logout, the us
  async setUserData(userData: Record<string, any>) {
    if (shouldAuthenticate) {
      if (!userData.password) {
        throw new Error('Password not provided.')
      }

      console.log('Original userData:', userData)

      // Hash the password if it is not already hashed
      if (!userData.hashedPassword || userData.hashedPassword !== await sha256(userData.password)) {
        userData.hashedPassword = await sha256(userData.password)
        console.log('Hashed password:', userData.hashedPassword)
        userData.password = ''.padEnd(6, '*')
      }

      // Check if the hashed password matches the stored hashed password
      if (userData.hashedPassword !== HASHED_PASSWORD) {
        throw new Error('Wrong password.')
      }
    }

    console.log('Setting userData:', userData)
    window.localStorage.zeaUserData = JSON.stringify(userData)
  }

  async signOut() {
    console.log('Signing out')
    localStorage.removeItem('zeaUserData')
    console.log('User data removed:', !localStorage.getItem('zeaUserData'))
  }
}

const auth = new Auth()

export default auth
export { auth, shouldAuthenticate }
