import style from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ webformatURL, onClickModal, tags }) => {
  return (
    <li className={style.ImageGalleryItem} onClick={onClickModal}>
      <img
        className={style.ImageGalleryItemImage}
        src={webformatURL}
        alt={tags}
      />
    </li>
  );
};

export default ImageGalleryItem;
