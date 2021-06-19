import React, { useState, useEffect } from 'react';
import AvgRating from '../AvgRating.jsx';
import ActionButton from './ActionButton.jsx';
import Atelier from '../../Atelier.js';
import errimage from '../../imgs/imagenot.png';
import Gallery from './PCGallery.jsx';

const ProductCard = ({ productId, index, listState, triggerDelete, triggerModal, offset, productClick }) => {
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState({ default: 0, salePrice: null });
  const [gallery, setGalley] = useState([]);
  const [showGallery, setShow] = useState(false);

  const fetchProducts = async () => {
    let productData = await Atelier.getInfo(productId);
    let productStyles = await Atelier.getStyles(productId);

    const firstStyle = productStyles.results[0];

    setCategory(productData.category);
    setName(productData.name);
    setImage(firstStyle.photos[0].thumbnail_url);
    setPrice({
      default: firstStyle.original_price,
      salePrice: firstStyle.sale_price
      });

    setGalley(firstStyle.photos);
  };

  const mouseOver = () => {
    setShow(true);
  }

  const mouseOut = () => {
    setShow(false);
  }

  const changeImage = (index) => {
    setImage(gallery[index].thumbnail_url);
  }

  useEffect(() => {
    fetchProducts().catch((err) => console.log(`Error fetching product/style info: ${err}`));
  }, [productId]);

  return (
    <span className='ProductCard' style={{ '--offset': offset }}>
      <ActionButton
        index={index}
        id={productId}
        listState={listState}
        triggerDelete={triggerDelete}
        triggerModal={triggerModal}/>

        <div className='product-gallery'>
          <img className='ProductImage'
               src={image ? image : errimage}
               alt={name}
               onMouseOver={mouseOver}
               onClick={() => productClick(productId)}
               data-testid='image-prod'>
          </img>
          {showGallery
            ? <>
                <div className='image-holder'
                     onMouseOut={mouseOut}
                     onClick={() => productClick(productId)}
                     data-testid='image-holder'></div>
                <Gallery
                  gallery={gallery}
                  changeImage={changeImage}/>
              </>
            : <span data-testid='no-gallery' hidden></span>
          }
        </div>
        <div data-testid='productcard' onClick={() => productClick(productId)}>
        <span id='prod-category'>{category}</span>
        <br />
        <b id='prod-name'>{name}</b>
        <br />
        {price.salePrice
          ? <> <b id="sale-price">${price.salePrice} &nbsp; </b> <strike className='prod-price'>${price.default}</strike> </>
          : <span className='prod-price'>${price.default}</span>
        }
        <br />
        <div id='prod-star'>
          <AvgRating
            productId={productId}/>
        </div>
      </div>
    </span>
  );
};

export default ProductCard;