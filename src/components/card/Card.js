import React from 'react'
import styles from './card.module.css'
import FontAwesome from 'react-fontawesome'
import PropTypes from 'prop-types'

export default function Card({
	name, 
	image, 
	rightClick, 
	leftClick,
	hide
}) {
	return (
		<div className={styles.container}>
				<div className={styles.card}>
					<img 
						alt="rick" 
						src={image} 
					/>
					<p className={styles.name}>
						{name}
					</p>

					{
						!hide &&
						<div className={styles.actions}>
							<div
								onClick={leftClick}
								className={styles.left}>
								<FontAwesome
									name="thumbs-down"
									size="2x"
								/>
								</div>
								<div
									onClick={rightClick}
									className={styles.right}>
									<FontAwesome
											name="heart"
											size="2x"
									/>
								</div>
						</div>
					}
				</div>
		</div>
	)
}

Card.propTypes = {
	name: PropTypes.string.isRequired,
	image: PropTypes.string.isRequired,
	leftClick: PropTypes.func,
	rightClick: PropTypes.func,
}

Card.defaultProps = {
	name: 'Rick Sanches',
	image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg'
}