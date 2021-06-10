import React from 'react';

const ComparisonModal = ({}) => {

  return (
    <div className='CompModal'>
      <table>
        <thead>Comparing Items</thead>
      </table>
    </div>
  )
};

export default ComparisonModal;

/*
- popUp on the page
- title: "Comparing"
- comparing the current selected related product to the overview product
- table format - three columns
 1) Current product name
 2) characteristics
  - each on own line
  - facts on product or values which product has specific quantity
  - if has specific value, should display
  - if is a fact such that is 'true' for given prod, value should be displayed as checkmark
  - any char not apply, left blank
  - all should appear
  - if no overlapping w/ products, display still but no value for both prods
  - if length too long, make scrollable
   - product names fixed to top of list
 3) compared product name
*/