import ImgGalleryItem from '../ImgGalleryItem';
import './ImgGallery.css';
import PropTypes from 'prop-types';

function ImgGallery({ items }) {
  return (
    <>
      <ul className="ImgGallery">
        {items.map(item => (
          <ImgGalleryItem key={item.id} item={item} />
        ))}
      </ul>
    </>
  );
}

export default ImgGallery;

ImgGallery.propTypes = {
  items: PropTypes.array,
};
