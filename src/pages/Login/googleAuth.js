import React from 'react'
import { useGoogleLogin } from 'react-use-googlelogin'

const GoogleAuthContext = React.createContext()

export const GoogleAuthProvider = ({ children }) => {
  const googleAuth = useGoogleLogin({
    clientId: "626086626141-gclngcarehd8fhpacb2nrfq64mk6qf5o.apps.googleusercontent.com" // Your clientID from Google.
  })
  console.log('useGoogleAuth: GoogleAuthProvider: ')
  console.log(googleAuth)
  return (
    <GoogleAuthContext.Provider value={googleAuth}>
      {children}
    </GoogleAuthContext.Provider>
  )
}

export const useGoogleAuth = () => React.useContext(GoogleAuthContext)