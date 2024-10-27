import React from 'react';
import PropTypes from 'prop-types';
import css from '../../styles.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ images, selectedImage }) => {
    console.log(images); // Verifică dacă imaginile sunt afișate corect

    return (
        <ul className={css.ImageGallery}>
            {images.map(({ id, webformatURL, tags, largeImageURL }) => (
                <ImageGalleryItem
                    key={id}
                    previewImg={webformatURL}
                    tags={tags}
                    selectedImage={() => selectedImage(largeImageURL, tags)} // Asigură-te că transmite corect URL-ul mare
                />

            ))}
        </ul>
    );
};

ImageGallery.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            webformatURL: PropTypes.string.isRequired, // Asigură-te că adaugi și celelalte proprietăți necesare
            tags: PropTypes.string,
            largeImageURL: PropTypes.string.isRequired,
        })
    ).isRequired,
    selectedImage: PropTypes.func.isRequired, // Marchez ca necesar
};

export default ImageGallery;
