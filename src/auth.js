// Mocked password: "zea"
// Rembember to generate a new one for your demo, here:
// https://xorbin.com/tools/sha256-hash-calculator
const HASHED_PASSWORD = '2d37e395cc590b4e127317494566f1aaf881f0ac1b5ff7d4180506fd682d68ea'

// To disable authentication, set `shouldAuthenticate` to false.
const shouldAuthenticate = true
const shouldProvideRoomID = true

async function sha256(message) {
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
    return userData && (userData.hashedPassword === HASHED_PASSWORD || !shouldAuthenticate)
  }

  async getUserData() {
    const { zeaUserData } = window.localStorage
    return zeaUserData && JSON.parse(zeaUserData)
  }

  async setUserData(userData) {
    if (shouldAuthenticate) {
      if (!userData.password) {
        throw new Error('Password not provided.')
      }

      if (userData.hashedPassword !== HASHED_PASSWORD) {
        userData.hashedPassword = await sha256(userData.password)
        userData.password = ''.padEnd(6, '*')
      }

      if (userData.hashedPassword !== HASHED_PASSWORD) {
        throw new Error('Wrong password.')
      }
    }

    window.localStorage.zeaUserData = JSON.stringify(userData)
  }

  async signOut() {
    localStorage.removeItem('zeaUserData')
  }
}

const auth = new Auth()

export default auth
export { auth, shouldAuthenticate, shouldProvideRoomID }
