import { defineAuth, secret } from "@aws-amplify/backend";

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
    externalProviders: {
      google: {
        clientId: secret('GOOGLE_CLIENT_ID'),
        clientSecret: secret('GOOGLE_CLIENT_SECRET'),
        scopes: ['email', 'profile'],
        attributeMapping: {
          email: 'email',
          givenName: 'given_name',
        },
      },
      callbackUrls: [
        'http://localhost:3000/profile',
        'https://main.daw61a36qd4st.amplifyapp.com/profile'
      ],
      logoutUrls: ['http://localhost:3000/', 'https://main.daw61a36qd4st.amplifyapp.com'],
    }
  },
  multifactor: {
    mode: 'OPTIONAL',
    totp: true,
  },
});
