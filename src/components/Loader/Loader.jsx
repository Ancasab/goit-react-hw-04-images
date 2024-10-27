// import React from 'react'
import css from '../../styles.module.css';
import { ThreeDots } from 'react-loader-spinner';



export const Spiner = () => {
  return (
     <div className={css.LoaderContainer}>
      <ThreeDots color="#3f51b5" height={200} width={200} />
    </div>
  )
}

export default Spiner