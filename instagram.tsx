import axios from 'axios'
import React, { ReactNode, useRef, useState } from 'react'
import { Image, Modal, SafeAreaView, Text, TouchableOpacity } from 'react-native'
import { WebView, WebViewNavigation } from 'react-native-webview'

const instagramLogo = require('./assets/images/instagram.png')

export type InstagramAuthProps = {
  customButton?: ReactNode
  appId: string
  appSecret: string
  redirectUrl: string
  onSuccess: (token: string) => void
  onError: (error: string) => void
}
const InstagramAuth = ({
  appId,
  appSecret,
  redirectUrl,
  onSuccess,
  onError,
  customButton
}: InstagramAuthProps) => {
  const [showLogin, setShowLogin] = useState(false)

  const webView = useRef<any>()
  const scopes = ['user_profile']
  const instaAuthUrl = `https://api.instagram.com/oauth/authorize/?client_id=${appId}&redirect_uri=${redirectUrl}&response_type=code&scope=${scopes.join(
    ','
  )}`
  const patchPostMessageJsCode = `(${String(function () {
    var originalPostMessage = window.postMessage
    var patchedPostMessage = function (message: any, targetOrigin: any, transfer: any) {
      originalPostMessage(message, targetOrigin, transfer)
    }
    patchedPostMessage.toString = function () {
      return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage')
    }
    window.postMessage = patchedPostMessage
  })})();`
  const onNavigationStateChange = async (event: WebViewNavigation) => {
    if (event.url.startsWith(redirectUrl)) {
      webView.current.stopLoading()
      const code = event.url.split('code=')[1]
      try {
        let form = new FormData()
        form.append('client_id', appId)
        form.append('client_secret', appSecret)
        form.append('grant_type', 'authorization_code')
        form.append('redirect_uri', redirectUrl)
        form.append('code', code)
        const { data } = await axios.post('https://api.instagram.com/oauth/access_token', form, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        onSuccess(data.access_token)
        setShowLogin(false)
      } catch (error: any) {
        onError(error.response.data.error_message)
      }
    }
  }
  return (
    <>
      <TouchableOpacity onPress={() => setShowLogin(true)}>
        {customButton ? (
          customButton
        ) : (
          <Image source={instagramLogo} style={{ height: 50, width: 50 }} />
        )}
      </TouchableOpacity>
      <Modal visible={showLogin} animationType="slide">
        <SafeAreaView style={{ height: '100%' }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#7A48BB',
              justifyContent: 'center',
              position: 'absolute',
              bottom: '5%',
              zIndex: 1,
              alignSelf: 'center',
              width: 120,
              height: 60,
              borderRadius: 20
            }}
            onPress={() => setShowLogin(false)}
          >
            <Text style={{ textAlign: 'center', color: 'white' }}>Cancel</Text>
          </TouchableOpacity>
          <WebView
            ref={(ref) => (webView.current = ref)}
            source={{
              uri: instaAuthUrl,
              headers: {
                'Accept-Language': 'en'
              }
            }}
            startInLoadingState
            onNavigationStateChange={onNavigationStateChange}
            injectedJavaScript={patchPostMessageJsCode}
          />
        </SafeAreaView>
      </Modal>
    </>
  )
}
export default InstagramAuth
