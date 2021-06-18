import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

import Overview from '../src/components/Overview.jsx';
import overviewSample from '../__mocks__/overview_samples.js';

import Cart from '../src/components/overview/Cart.jsx';
import cartSample from '../__mocks__/cart_samples.js';

import ImageGallery from '../src/components/overview/ImageGallery.jsx';
import gallerySample from '../__mocks__/gallery_samples.js';

import Description from '../src/components/overview/Description.jsx';
import descriptionSample from '../__mocks__/description_samples.js'
import ZoomedPreview from '../src/components/overview/ZoomedPreview.jsx'

afterEach(cleanup);

describe('Overview', () => {
  test('Overview component should render with sample data', () => {
    const overview = render(<Overview
      theme={ overviewSample.theme }
      productId={ overviewSample.productId }
      styles={ overviewSample.styles }
      product={ overviewSample.product }
      />)
  })
})

// describe('ZoomedPreview', () => {
//   test('should pop up a window on mouse enter', () => {

//   })

// })


// describe('Cart', () => {
//   test('Cart component should render with sample data', () => {
//     render(<Cart
//       key='899999'
//       stylesList={ cartSample.styles }
//       style={ cartSample.style }
//       handleStyleSelect={ cartSample.handleStyleSelect }
//       currentProduct={ cartSample.currentProduct }
//       />)


//       ;
//   });
// });

// describe('ImageGallery', () => {
//   test('ImageGallery component should render with sample data', () => {
//     render(<ImageGallery
//       key='999999'
//       style={ gallerySample }
//       styleid={ gallerySample.styleid }/>
//       );
//   });
// });

// describe('Descriptions Component', () => {
//   test('Description component should render with sample data', () => {
//     render(<Description
//       key='799999'
//       currentProduct={ descriptionSample }
//       />);
//   });
// });
