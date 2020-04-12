import React from 'react'
import { connect } from 'react-redux'
import { doGoogleLoginAction, logOutAction } from '../../redux/userDuck'
import styles from './login.module.css'

function LoginPage({ 
	doGoogleLoginAction, 
	fetching, 
	loggedIn,
	logOutAction
}) {

	const doLogin = () => doGoogleLoginAction()
	const logout = () => logOutAction()

	return (
		<div className={styles.container}>
			{fetching && <h2>Cargando...</h2>}
			{
				!loggedIn ? 
				<>
					<h1>
						Inicia sesión con Google
					</h1>
					<button
						onClick={doLogin}>
						Iniciar
					</button>
				</>
				:
				<>
				<h1>
					Cierra tu sesión
				</h1>
				<button
					onClick={logout}>
					Cerrar Sesión
				</button>
				</>
			}
		</div>
	)
}

// Recuperamos es state
function mapState({ loggIn: { fetching, loggedIn }}){
	return {
		fetching, 
		loggedIn
	}
}

export default connect(
	mapState, 
	{ 
		doGoogleLoginAction,
		logOutAction
})(LoginPage)