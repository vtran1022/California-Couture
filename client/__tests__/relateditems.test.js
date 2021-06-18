import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

import RICWidget from '../src/components/RIC-Widget.jsx';
import ActionButton from '../src/components/RIC-Widget/ActionButton.jsx';
import OutfitList from '../src/components/RIC-Widget/OutfitList.jsx';
import ProductCard from '../src/components/RIC-Widget/ProductCard.jsx';
import RelatedList from '../src/components/RIC-Widget/RelatedList.jsx';
import ComparisonModal from '../src/components/RIC-Widget/ComparisonModal.jsx';
import Gallery from '../src/components/RIC-Widget/PCGallery.jsx';


// this cleans up everything after each test to avoid memory leaks
afterEach(cleanup);

// basic render testing, screen.debug() will log the HTML output in test terminal
describe('RICWidget', () => {
  test('checking both lists render', () => {
    const onClick = jest.fn();
    const related = [13023, 13024, 13025, 13026, 13027, 13028];
    const { getByText } = render(<RICWidget toggleOverlay={onClick} related={related}/>);

    expect(getByText(/Your Outfit/)).toBeInTheDocument();
    expect(getByText(/Related Products/)).toBeInTheDocument();
  });
});

describe('RelatedList', () => {
  test('left arrow disabled on initial render, right arrow enabled if related.length > 5', () => {
    const onClick = jest.fn();
    const related = [13023, 13024, 13025, 13026, 13027, 13028];
    const { getByTestId } = render(<RelatedList toggleOverlay={onClick} related={related}/>);

    expect(getByTestId('buttonL')).toBeDisabled();
    expect(getByTestId('buttonR2')).toBeEnabled();
  });
});

describe('RelatedList', () => {
  test('left arrow disabled on initial render, right arrow disabled on related.length < 6', () => {
    const onClick = jest.fn();
    const related = [13023, 13024, 13025, 13026];
    const { getByTestId } = render(<RelatedList toggleOverlay={onClick} related={related} />);

    expect(getByTestId('buttonL')).toBeDisabled();
    expect(getByTestId('buttonR')).toBeDisabled();
  });
});

describe('RelatedList', () => {
  test('right arrow button to click', async () => {
    const onClick = jest.fn();
    const related = [13023, 13024, 13025, 13026, 13027, 13028];
    const { getByTestId } = render(<RelatedList toggleOverlay={onClick} related={related} onClick={onClick}/>);

    await userEvent.click(getByTestId('buttonR2'));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe('Related List', () => {
  test('style - offset should be 0 initially', () => {
    const onClick = jest.fn();
    const related = [13023, 13024, 13025, 13026, 13027, 13028];
    const { getByTestId } = render( <RelatedList toggleOverlay={onClick} related={related}/> );

    const list = (getByTestId('RICList'));

    expect(list).toHaveStyle({'--offset': '0'});
  });
});

describe('OutfistList', () => {
  test('arrow buttons should not exist initial render', () => {
    const { getByTestId } = render(<OutfitList />);

    expect(getByTestId('buttonL')).toBeDisabled();
    expect(getByTestId('buttonR')).toBeDisabled();
  });
});

describe('OutfitList', () => {
  test('Check that Add Outfit card exists', () => {
    const { getByText } = render(<OutfitList />);

    expect(getByText(/Add to Outfit/)).toBeInTheDocument();
  });
});

describe('OutfitList', () => {
  test('onClick to render item added and x-button', async () => {
    const onClick = jest.fn();
    const id = 13023;

    const { getByTestId, getByText } = render(<OutfitList productId={id} onClick={onClick}/>);

    await userEvent.click(getByTestId('outfit'));

    expect(getByText(/Item Added/)).toBeInTheDocument();
    expect(getByTestId('x-button')).toBeInTheDocument();
  });
});

describe('Action Button', () => {
  test('calls the onClick callback handler for x button', async () => {
    const onClick = jest.fn();
    const { getByTestId } = render( <ActionButton triggerDelete={onClick}/> );

    await userEvent.click(getByTestId('x-button'));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe('Action Button', () => {
  test('calls the onClick callback handler for star button', async () => {
    const onClick = jest.fn();
    const list = 'related';

    const { getByTestId } = render( <ActionButton listState={list} triggerModal={onClick}/> );

    await userEvent.click(getByTestId('star'));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe('Product Card', () => {
  test('calls the onClick callback handler for product card in two spots', async () => {
    const onClick = jest.fn();
    const { getByTestId } = render( <ProductCard productClick={onClick}/> );

    await userEvent.click(getByTestId('productcard'));
    await userEvent.click(getByTestId('image-prod'));

    expect(onClick).toHaveBeenCalledTimes(2);
  });
});

describe('Product Card', () => {
  test('product card to be visible', () => {
    const { getByTestId } = render( <ProductCard /> );

    expect((getByTestId('productcard'))).toBeVisible();
    expect((getByTestId('image-prod'))).toBeVisible();
  });
});

describe('Product Card', () => {
  test('on hover, thumbnail gallery will appear, then disappear unhover', async () => {
    const id = 13029;

    const { getByTestId } = render( <ProductCard productId={id}/> );

    await userEvent.hover(getByTestId('image-prod'));
    expect(getByTestId('gallery-image')).toBeInTheDocument();

    await userEvent.unhover(getByTestId('image-holder'));
    expect(getByTestId('no-gallery')).toBeInTheDocument();
  });
});

describe('ComparisonModal', () => {
  test('check modal rendering', () => {
    const { getByText } = render(<ComparisonModal />);

    expect(getByText(/Comparing/)).toBeInTheDocument();
    expect(getByText(/Product 1/)).toBeInTheDocument();
    expect(getByText(/Product 2/)).toBeInTheDocument();
  });
});

describe('Comparison Modal', () => {
  test('modal to be visible', () => {
    const { getByTestId } = render( <ComparisonModal /> );

    const modal = (getByTestId('c-modal'));

    expect(modal).toBeVisible();
  });
});

describe('Comparison Modal', () => {
  test('x-button works', async () => {
    const onClick = jest.fn();

    const { getByTestId } = render( <ComparisonModal trigger={onClick}/> );

    await userEvent.click(getByTestId('x-button'));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe('Thumbnail Gallery', () => {
  test('thumbnail gallery to exist', () => {
    const photos = [
      {
          "thumbnail_url": "https://images.unsplash.com/photo-1561861422-a549073e547a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
          "url": "https://images.unsplash.com/photo-1561861422-a549073e547a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
      },
      {
          "thumbnail_url": "https://images.unsplash.com/photo-1560072810-1cffb09faf0f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
          "url": "https://images.unsplash.com/photo-1560072810-1cffb09faf0f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
      }
    ];

    const { getAllByAltText } = render( <Gallery gallery={photos}/> );

    const thumbnails = getAllByAltText('thumbnail-image');

    thumbnails.forEach((thumbnail) => {
      expect(thumbnail).toBeVisible();
    });
  });
});

describe('Thumbnail Gallery', () => {
  test('onClick callback is handled when clicking on thumbnail', async () => {
    const onClick = jest.fn();
    const photos = [
      {
          "thumbnail_url": "https://images.unsplash.com/photo-1561861422-a549073e547a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
          "url": "https://images.unsplash.com/photo-1561861422-a549073e547a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
      },
      {
          "thumbnail_url": "https://images.unsplash.com/photo-1560072810-1cffb09faf0f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
          "url": "https://images.unsplash.com/photo-1560072810-1cffb09faf0f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
      }
    ];

    const { getAllByAltText } = render( <Gallery gallery={photos} changeImage={onClick}/> );

    const thumbnail = getAllByAltText('thumbnail-image')[0];

    await userEvent.click(thumbnail);

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe('Thumbnail Gallery', () => {
  test('offset style should be 0 initially', () => {
    const photos = [
      {
          "thumbnail_url": "https://images.unsplash.com/photo-1561861422-a549073e547a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
          "url": "https://images.unsplash.com/photo-1561861422-a549073e547a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
      },
      {
          "thumbnail_url": "https://images.unsplash.com/photo-1560072810-1cffb09faf0f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
          "url": "https://images.unsplash.com/photo-1560072810-1cffb09faf0f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
      }
    ];

    const { getByTestId } = render( <Gallery gallery={photos}/> );

    expect(getByTestId('g-container')).toHaveStyle({'--offset': '0'});
  });
});

describe('Thumbnail Gallery', () => {
  test('left arrow disabled on initial render, right arrow disabled when photos.length < 5', () => {
    const photos = [
      {
          "thumbnail_url": "https://images.unsplash.com/photo-1561861422-a549073e547a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
          "url": "https://images.unsplash.com/photo-1561861422-a549073e547a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
      },
      {
          "thumbnail_url": "https://images.unsplash.com/photo-1560072810-1cffb09faf0f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
          "url": "https://images.unsplash.com/photo-1560072810-1cffb09faf0f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
      }
    ];

    const { getByTestId } = render( <Gallery gallery={photos}/> );

    expect(getByTestId('g-buttonL')).toBeDisabled();
    expect(getByTestId('g-buttonR2')).toBeDisabled();
  });
});

describe('Thumbnail Gallery', () => {
  test('left arrow disabled on initial render, right arrow enabled when photos.length > 4', () => {
    const photos = [
      {
          "thumbnail_url": "https://images.unsplash.com/photo-1561861422-a549073e547a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
          "url": "https://images.unsplash.com/photo-1561861422-a549073e547a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
      },
      {
          "thumbnail_url": "https://images.unsplash.com/photo-1560072810-1cffb09faf0f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
          "url": "https://images.unsplash.com/photo-1560072810-1cffb09faf0f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
      },
      {
        "thumbnail_url": "https://images.unsplash.com/photo-1561861422-a549073e547a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
        "url": "https://images.unsplash.com/photo-1561861422-a549073e547a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
    },
    {
        "thumbnail_url": "https://images.unsplash.com/photo-1560072810-1cffb09faf0f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
        "url": "https://images.unsplash.com/photo-1560072810-1cffb09faf0f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
    },
    {
      "thumbnail_url": "https://images.unsplash.com/photo-1561861422-a549073e547a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
      "url": "https://images.unsplash.com/photo-1561861422-a549073e547a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
  },
  {
      "thumbnail_url": "https://images.unsplash.com/photo-1560072810-1cffb09faf0f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
      "url": "https://images.unsplash.com/photo-1560072810-1cffb09faf0f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
  }
    ];

    const { getByTestId } = render( <Gallery gallery={photos}/> );

    expect(getByTestId('g-buttonL')).toBeDisabled();
    expect(getByTestId('g-buttonR')).toBeEnabled();
  });
});