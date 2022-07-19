import style from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ webURL, openModal, tags, largeImageURL }) => {
  return (
    <li
      className={style.ImageGalleryItem}
      onClick={() => openModal(largeImageURL)}
    >
      <img className={style.ImageGalleryItemImage} src={webURL} alt={tags} />
    </li>
  );
};

export default ImageGalleryItem;
