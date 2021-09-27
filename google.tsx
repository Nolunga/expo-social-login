import React, { useEffect } from 'react'
import { TouchableOpacity, Image, AppState } from 'react-native'
import * as GoogleSignIn from 'expo-auth-session/providers/google'
import * as WebBrowser from 'expo-web-browser'
import { AuthSessionResult } from 'expo-auth-session'
const googleLogo = require('./assets/images/google.png')

WebBrowser.maybeCompleteAuthSession()

export type GoogleAuthProps = {
  googleExpoClientId: string
  googleAndroidClientId: string
  googleIosClientId: string
  onSuccess: (token: string) => void
  onError: (error: string) => void
}

const GoogleAuth = ({
  googleExpoClientId,
  googleAndroidClientId,
  googleIosClientId,
  onSuccess,
  onError
}: GoogleAuthProps) => {
  const [_, response, promptAsync] = GoogleSignIn.useAuthRequest({
    expoClientId: googleExpoClientId,
    androidClientId: googleAndroidClientId,
    iosClientId: googleIosClientId
  })

  const googleAuth = async (response: AuthSessionResult) => {
    if (response.type === 'success') {
      return onSuccess(response.authentication?.accessToken as string)
    } else {
      return onError('An unknown error has occured')
    }
  }

  useEffect(() => {
    if (response && AppState.currentState === 'active') {
      googleAuth(response)
    }
  }, [response, AppState.currentState])

  return (
    <TouchableOpacity onPress={() => promptAsync()}>
      <Image source={googleLogo} style={{ height: 50, width: 50 }} />
    </TouchableOpacity>
  )
}
export default GoogleAuth
