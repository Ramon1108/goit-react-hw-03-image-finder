import './ImgGalleryItem.css';
import Modal from '../Modal';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ImgGalleryItem extends Component {
  state = {
    shownModal: false,
  };
  onModal = () => {
    this.setState(({ shownModal }) => ({ shownModal: !shownModal }));
  };
  render() {
    const { item } = this.props;
    const { webformatURL } = item;
    return (
      <li className="ImgGalleryItem">
        <img
          onClick={this.onModal}
          className="ImgGalleryItem-image"
          src={webformatURL}
          alt="img"
        />
        {this.state.shownModal && <Modal onClose={this.onModal} image={item} />}
      </li>
    );
  }
}

ImgGalleryItem.propTypes = {
  item: PropTypes.object,
};

export default ImgGalleryItem;
