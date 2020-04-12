import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

// Iniciar sesion dependiendo de Redux
function PrivateRoutes ({ 
  path, 
  component, 
  loggedIn, 
  ...props 
}) {
  return (
    loggedIn 
    ? 
      <Route path={path} component={component} {...props}/>
    :
      <Redirect to='/login/' {...props} />
  )
}

function mapStateToProps({ loggIn: { loggedIn } }){
  return {
    loggedIn
  }
}

export default connect(mapStateToProps)(PrivateRoutes)