import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
// import ApolloClient from 'apollo-boost'
// import { ApolloProvider } from 'react-apollo'
import { generateStore } from './redux/store'
import './index.css'
import 'font-awesome/css/font-awesome.css'
import App from './App'

let store = generateStore()

// let client = new ApolloClient({
//   uri: 'https://rickandmortyapi.com/graphql'
// })

let WithStore = () => (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)


// let WithApollo = () => (
//   <ApolloProvider client={client}>
//     <WithStore />
//   </ApolloProvider>
// )

ReactDOM.render(<WithStore />, document.getElementById('root'))
