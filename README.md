# expo-social-login

Expo Social Login is a package that makes it easy to implement social login in your Expo app. With just a few lines of code, you can enable your users to log in with their Facebook, Google, Apple, or Instagram accounts.

The package uses the Expo AuthSession module to handle the OAuth2 flow, and provides a simple and consistent API for each social network. It also returns the access tokens and user profiles, making it easy to integrate with your existing authentication system.


![screenshot](image.png)

## Features

- login with Facebook
- login with Google
- login with Instagram
- login with Apple

## How to use this cute package

### Install the package

using yarn

```
yarn add expo-social-login
```

using npm

```
npm install expo-social-login
```

### Use it in your login/register screen

```
import { SocialAuth } from 'expo-social-login'

const LoginOrRegisterScreen = () => {
    return <View>

        ...
        <SocialAuth
            googleAndroidClientId={process.env.GOOGLE_ANDROID_CLIENT_ID}
            googleExpoClientId={process.env.GOOGLE_EXPO_CLIENT_ID}
            googleIosClientId={process.env.GOOGLE_IOS_CLIENT_ID}
            appId={process.env.INSTAGRAM_APP_ID}
            appSecret={process.env.INSTAGRAM_APP_SECRET}
            redirectUrl={process.env.INSTAGRAM_REDIRECT_URL}
            facebookAppId={process.env.FACEBOOK_APP_ID}
            enableInstagram={true}
            onSignInSuccess: (provider, token) => console.log(provider,token)
            onError: (error) => console.log(error)
            onCancel: () => console.log('Social Auth Cancelled')
        />
        ...

    </View>
}

export default LoginOrRegisterScreen
```

The above example with render the component like this:

![SocialLogin](image.png)

The icons displayed are clickable and will initiate a login/register session.

You can also cherry-pick which social auth you'd like to use, see example below

```
import { AppleAuth, FacebookAuth, GoogleAuth, Instagram } from 'expo-social-login'
...

const LoginOrRegisterScreen = () => {
    return <View>
    ...
    <Text>This is a login or registration screen</Text>
    ...

    <AppleAuth
        onError={(error)=>console.log('Apple auth error',error)}
        onSuccess={(token) => console.log('Apple', token)}
    />
    <GoogleAuth
        googleAndroidClientId={process.env.GOOGLE_ANDROID_CLIENT_ID}
        googleExpoClientId={process.env.GOOGLE_EXPO_CLIENT_ID}
        googleIosClientId={process.env.GOOGLE_IOS_CLIENT_ID}
        onError={(error)=>console.log('Google auth error',error)}
        onSuccess={(token) => console.log('Google auth token', token)}
    />
    <Instagram
        appId={process.env.INSTAGRAM_APP_ID}
        appSecret={process.env.INSTAGRAM_APP_SECRET}
        redirectUrl={process.env.INSTAGRAM_REDIRECT_URL}
        onError={(error)=>console.log('Instagram auth error',error)}
        onSuccess={(token) => console.log('Instagram auth token', token)}
    />
    <FacebookAuth
        facebookAppId={process.env.FACEBOOK_APP_ID}
        onSuccess={(token) => console.log('facebook auth token', token)}
        onError={(error)=>console.log('Facebook auth error',error)}
    />
    </View>
}

export default LoginOrRegisterScreen

```

If you wish to use a custom logo or button for your Social auth you can use the `customButton` prop and provide your own image, text or button. The `onPress` functionality has already been implemented internally

```
...
    <FacebookAuth
        facebookAppId={process.env.FACEBOOK_APP_ID}
        onSuccess={(token) => console.log('facebook auth token', token)}
        onError={(error)=>console.log('Facebook auth error',error)}
        customButton={<View><Text>Login with Facebook</Text></View>}
    />
...
```

## Tada! and you're good to go

![social media](https://media.giphy.com/media/3QwogXfR2vfZS/giphy.gif)
