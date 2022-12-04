import * as AppleAuthentication from 'expo-apple-authentication'
import React, { ReactNode } from 'react'
import { Image, Platform, TouchableOpacity } from 'react-native'

const appleLogo = require('../assets/images/apple.png')

export type AppleAuthProps = {
  customButton?: ReactNode
  onSuccess: (token: string) => void
  onError: (error: string) => void
}

const AppleAuth = ({ onSuccess, onError, customButton }: AppleAuthProps) => {
  const isAndroid = Platform.OS === 'android'

  const appleAuth = async () => {
    try {
      const { identityToken } = await AppleAuthentication.signInAsync({
        requestedScopes: [AppleAuthentication.AppleAuthenticationScope.EMAIL]
      })
      return onSuccess(identityToken as string)
    } catch (e: any) {
      return onError(e.message)
    }
  }

  return (
    <TouchableOpacity onPress={appleAuth}>
      {customButton ? customButton : <Image source={appleLogo} style={{ height: 50, width: 50 }} />}
    </TouchableOpacity>
  )
}
export default AppleAuth
