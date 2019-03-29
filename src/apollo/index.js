import Vue from 'vue'
// This is everything we need to work with Apollo 2.0.
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import VueApollo from 'vue-apollo'

Vue.use(VueApollo)

// Create a new HttpLink to connect to your GraphQL API.
// According to the Apollo docs, this should be an absolute URI.
const httpLink = new HttpLink({
  uri: process.env.API_BASE_URL + '/graphql'
})

// Create a new Middleware Link using setContext
const middlewareLink = setContext(() => ({
  headers: {
    authorization: 'Bearer ' + 'xxxx' // store.getters.token''
  }
}))

// Change your link assignment from
// const link = httpLink;
// to
const link = middlewareLink.concat(httpLink)

// Create the apollo client
const apolloClient = new ApolloClient({
  // Tells Apollo to use the link chain with the http link we set up.
  link,
  // Handles caching of results and mutations.
  cache: new InMemoryCache(),
  // Useful if you have the Apollo DevTools installed in your browser.
  connectToDevTools: true
})

const apolloProvider = new VueApollo({
  // Apollo 2.0 allows multiple clients to be enabled at once.
  // Here we select the default (and only) client.
  defaultClient: apolloClient,
  errorHandler(error) {
    console.error(error)
    // if (isUnauthorizedError(error)) {
    //   // Redirect to login page
    //   if (router.currentRoute.name !== 'login') {
    //     router.replace({
    //       name: 'login',
    //       params: {
    //         wantedRoute: router.currentRoute.fullPath,
    //       },
    //     })
    //   }
    // } else {
    //   console.log('%cError', 'background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;', error.message)
    // }
  }
})

export default apolloProvider.provide()