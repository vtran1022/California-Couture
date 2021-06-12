import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

// import RICWidget from './client/src/components/RIC-Widget.jsx';
// import ActionButton from './client/src/components/RIC-Widget/ActionButton.jsx';
// import OutfitList from './client/src/components/RIC-Widget/OutfitList.jsx';
// import ProductCard from './client/src/components/RIC-Widget/ProductCard.jsx';
// import RelatedList from './client/src/components/RIC-Widget/RelatedList.jsx';
// import ComparisonModal from './client/src/components/RIC-Widget/ComparisonModal.jsx';