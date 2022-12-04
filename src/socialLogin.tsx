import React from 'react'
import { Platform, View } from 'react-native'
import AppleAuth, { AppleAuthProps } from './apple'
import FacebookAuth, { FacebookAuthProps } from './facebook'
import GoogleAuth, { GoogleAuthProps } from './google'
import InstagramAuth, { InstagramAuthProps } from './instagram'

type Props = FacebookAuthProps &
  GoogleAuthProps &
  InstagramAuthProps &
  AppleAuthProps & {
    enableInstagram?: boolean
    onSignInSuccess: (provider: string, token: string) => void
    onError: (error: string) => void
    onCancel?: () => void
  }
/**
 * expo social media login component

 * @param enableInstagram boolean to enable Instagram sign in
 */

const SocialAuth = (props: Props) => {
  const isIos = Platform.OS === 'ios'

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
      }}
    >
      <GoogleAuth {...props} onSuccess={(token) => props.onSignInSuccess('google', token)} />

      <FacebookAuth {...props} onSuccess={(token) => props.onSignInSuccess('facebook', token)} />

      {props.enableInstagram && (
        <InstagramAuth
          {...props}
          onSuccess={(token) => props.onSignInSuccess('instagram', token)}
        />
      )}

      {isIos && <AppleAuth {...props} />}
    </View>
  )
}

export default SocialAuth
