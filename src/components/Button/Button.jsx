import React from 'react'
import PropTypes from 'prop-types';
import css from '../../styles.module.css'



export const LoadMoreButton = ({onClick}) => {
  return (
      <button className={css.Button}type="button" onClick={onClick}>
          Load more
    </button>
  )
}

LoadMoreButton.propTypes = {
  onClick: PropTypes.func,
};

export default LoadMoreButton

