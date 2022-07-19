import style from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem';

const ImageGallery = ({ images, openModal }) => {
  return (
    <ul className={style.ImageGallery}>
      {images.map(({ id, webformatURL, tags, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          webURL={webformatURL}
          largeImageURL={largeImageURL}
          openModal={openModal}
          tags={tags}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;
