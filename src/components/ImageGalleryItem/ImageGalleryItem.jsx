import style from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ webURL, onClick, tags }) => {
  return (
    <li className={style.ImageGalleryItem} onClick={onClick}>
      <img className={style.ImageGalleryItemImage} src={webURL} alt={tags} />
    </li>
  );
};

export default ImageGalleryItem;
