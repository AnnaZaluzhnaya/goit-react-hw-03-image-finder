import style from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem';

const ImageGallery = ({ images, onClickModalOpen }) => {
  return (
    <ul className={style.ImageGallery}>
      {images.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          onClickModalOpen={() => onClickModalOpen(largeImageURL)}
          tags={tags}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;
