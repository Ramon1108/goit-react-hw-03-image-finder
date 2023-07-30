import './Btn.css';
import PropTypes from 'prop-types';

const Btn = ({ onClick }) => {
  return (
    <button className="Btn-load" onClick={onClick}>
      Load more
    </button>
  );
};

export default Btn;

Btn.propTypes = {
  onClick: PropTypes.func,
};
