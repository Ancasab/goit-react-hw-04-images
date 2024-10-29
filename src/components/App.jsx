import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import { Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SearchBar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import LoadMoreButton from './Button/Button';
import fetchApi from './Service/ApiService';
import Spinner from './Loader/Loader';
import Modal from './Modal/Modal';
import css from 'styles.module.css';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [alt, setAlt] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      if (!searchQuery) return;

      setStatus('pending');

      try {
        const imageData = await fetchApi(searchQuery, page);
        const { hits: imagesHits, total } = imageData;

        if (!imagesHits.length) {
          toast.warning('No results were found for your search, please try something else.', {
            transition: Zoom,
            position: 'top-center',
          });
        } else {
          setImages((prevImages) => [...prevImages, ...imagesHits]);
          setTotalHits(total);
          setStatus('resolved');
          if (page > 1) {
            window.scrollBy({ top: 300, behavior: 'smooth' });
          }
        }
      } catch (error) {
        toast.error(`Sorry, something went wrong. ${error.message}`);
        setStatus('rejected');
        setError(error);
      }
    };

    fetchImages();
  }, [searchQuery, page]);

  const handleFormSubmit = (query) => {
    if (searchQuery !== query) {
      resetState();
      setSearchQuery(query);
    }
  };

  const handleSelectedImage = (largeImageUrl, tags) => {
    setSelectedImage(largeImageUrl);
    setAlt(tags);
  };

  const resetState = () => {
    setSearchQuery('');
    setPage(1);
    setImages([]);
    setSelectedImage(null);
    setAlt(null);
    setStatus('idle');
  };

  const loadMore = () => setPage((prevPage) => prevPage + 1);
  const closeModal = () => setSelectedImage(null);

  return (
    <div className={css.App}>
      <SearchBar onSubmit={handleFormSubmit} />
      <ToastContainer autoClose={3000} theme="colored" pauseOnHover />
      {status === 'pending' && <Spinner />}
      {error && <h1 style={{ color: 'orangered', textAlign: 'center' }}>{error.message}</h1>}
      {images.length > 0 && <ImageGallery images={images} selectedImage={handleSelectedImage} />}
      {images.length > 0 && images.length < totalHits && <LoadMoreButton onClick={loadMore} />}
      {selectedImage && <Modal selectedImage={selectedImage} tags={alt} onClose={closeModal} />}
    </div>
  );
};

App.propTypes = {
  searchQuery: PropTypes.string,
};

export default App;



// import React, { useState, useEffect} from 'react';
// import axios from 'axios';
// import PropTypes from 'prop-types';
// import { ToastContainer, toast } from 'react-toastify';
// import { Zoom } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// import SearchBar from './Searchbar/Searchbar';
// import ImageGallery from './ImageGallery/ImageGallery';
// import LoadMoreButton from './Button/Button';
// import fetchApi from './Service/ApiService';
// import Spinner from './Loader/Loader';
// import Modal from './Modal/Modal';
// import css from 'styles.module.css';

// axios.defaults.baseURL = 'https://pixabay.com/api/';

// const App = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [images, setImages] = useState([]);
//   const [page, setPage] = useState(1);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [alt, setAlt] = useState(null);
//   const [status, setStatus] = useState('idle');
//   const [error, setError] = useState(null);
//   const [totalHits, setTotalHits] = useState(null);

//     useEffect(() => {
//     const fetchImages = async () => {
//       if (!searchQuery) return;

//       setStatus('pending');

//         try {
//             const imageData = await fetchApi(searchQuery, page);
//             setTotalHits(imageData.total);
//             const imagesHits = imageData.hits;

//             if (!imagesHits.length) {
//                 toast.warning(
//                     'No results were found for your search, please try something else.',
//                     { transition: Zoom, position: 'top-center' }
//                 );
//             }

//                 setImages((prevImages) => [...prevImages, ...imagesHits]);
//                 setStatus('resolved');

//                 if (page > 1) {
//                     const CARD_HEIGHT = 300; // preview image height
//                     window.scrollBy({
//                         top: CARD_HEIGHT * 2,
//                         behavior: 'smooth',
//                     });
//                 }
//         }
//         catch (error) {
//           toast.error(`Sorry, something went wrong. ${error.message}`);
//           setStatus('rejected');
//           setError(error);
//           }
//         };

//         fetchImages();
//     }, [searchQuery, page]);

//     const handleFormSubmit = (query) => {
//       if (searchQuery === query) {
//         return;
//       }
//       resetState();
//       setSearchQuery(query);
//     };

//     const handleSelectedImage = (largeImageUrl, tags) => {
//       setSelectedImage(largeImageUrl);
//       setAlt(tags);
//     };

//     const resetState = () => {
//       setSearchQuery('');
//       setPage(1);
//       setImages([]);
//       setSelectedImage(null);
//       setAlt(null);
//       setStatus('idle');
//     };

//     const loadMore = () => {
//         setPage((prevPage) => prevPage + 1);
//     };

//     const closeModal = () => {
//         setSelectedImage(null);
//     };

//     return (
//       <div className={css.App}>
//         <SearchBar onSubmit={handleFormSubmit} />
//         <ToastContainer autoClose={3000} theme="colored" pauseOnHover />
//           {status === 'pending' && <Spinner />}
//           {error && (
//             <h1 style={{ color: 'orangered', textAlign: 'center' }}>
//             {error.message}
//             </h1>
//           )}
//           {images.length > 0 && (
//               <ImageGallery
//                   images={images}
//                   selectedImage={handleSelectedImage}
//               />
//           )}
//           {images.length > 0 && images.length !== totalHits && (
//             <LoadMoreButton onClick={loadMore} />
//           )}
//           {selectedImage && (
//             <Modal
//                 selectedImage={selectedImage}
//                 tags={alt}
//                 onClose={closeModal}
//             />
//           )}
//       </div>
//     );
// };

// App.propTypes = {
//     searchQuery: PropTypes.string,
// };

// export default App;
