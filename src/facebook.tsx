import * as Facebook from 'expo-facebook'
import React, { ReactNode } from 'react'
import { Image, TouchableOpacity } from 'react-native'

const facebookLogo = require('../assets/images/facebook.png')

export type FacebookAuthProps = {
  facebookAppId: string
  onSuccess: (token: string) => void
  onError: (error: string) => void
  customButton?: ReactNode
}

const FacebookAuth = ({ facebookAppId, onSuccess, onError, customButton }: FacebookAuthProps) => {
  const facebookAuth = async () => {
    try {
      await Facebook.initializeAsync({ appId: facebookAppId })
      const { type, token } = (await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email']
      })) as { type: string; token: string | undefined }
      if (type === 'success') {
        return onSuccess(token as string)
      } else {
        return onError('An unknown error has occured')
      }
    } catch (error: any) {
      return onError(error.message)
    }
  }

  return (
    <TouchableOpacity onPress={facebookAuth}>
      {customButton ? (
        customButton
      ) : (
        <Image source={facebookLogo} style={{ height: 50, width: 50 }} />
      )}
    </TouchableOpacity>
  )
}
export default FacebookAuth
