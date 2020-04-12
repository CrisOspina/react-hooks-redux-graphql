import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './pages/home/HomePage'
// import GraphHome from './pages/home/GraphHome'
import FavPage from './pages/favs/FavPage'
import LoginPage from './pages/login/LoginPage'
import PrivateRoutes from './PrivateRoutes'

export default function Routes() {
  return (
    <Switch>
      <PrivateRoutes exact path='/' component={Home} />
      <PrivateRoutes path='/favs' component={FavPage} />
      <Route path='/login' component={LoginPage} />
    </Switch>
  )
}






// Iniciar sesión dependiendo del localstarage
// const PrivateRoute = ({
//   component,
//   path, 
//   ...props
// }) => {
//   let storage = localStorage.getItem('storage')
//   storage = JSON.parse(storage)

//   if(storage && storage.loggIn.loggedIn) {
//     return (
//       <Route 
//         path={path}
//         component={component}
//         {...props}>
//       </Route>
//     )
//   } else {
//     return (
//       <Redirect to='/login/' {...props} />
//     )
//   }
// }

// export default function Routes() {
//   return (
//     <Switch>
//       <PrivateRoute exact path='/' component={Home} />
//       <PrivateRoute path='/favs' component={FavPage} />
//       <Route path='/login' component={LoginPage} />
//     </Switch>
//   )
// }