import React from 'react';
import PropTypes from 'prop-types';
import css from '../../styles.module.css';

// export const ImageGalleryItem = ({ tags, previewImg, selectedImage }) => {
//     return (
//         <li className={css.ImageGalleryItem}>
//             <img
//                 className={css.ImageGalleryItemImage}
//                 src={previewImg}
//                 alt={tags}
//                 onClick={selectedImage} // Verifică dacă aceasta este apelată
//             />
//         </li>
//     );
// };

const ImageGalleryItem = ({ tags, previewImg, selectedImage }) => {
    const handleClick = () => {
        console.log(`Image clicked: ${tags}`); // Verifică dacă se apelează
        selectedImage(); // Apelăm funcția de selectare a imaginii
    };

    return (
        <li className={css.ImageGalleryItem}>
            <img
                className={css.ImageGalleryItemImage}
                src={previewImg}
                alt={tags}
                onClick={handleClick} // Folosește funcția handleClick
            />
        </li>
    );
};


ImageGalleryItem.propTypes = {
    tags: PropTypes.string.isRequired,
    previewImg: PropTypes.string.isRequired,
    selectedImage: PropTypes.func.isRequired, // Marcat ca necesar
};

export default ImageGalleryItem;
