import React, { useContext, useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { listProducts } from '@store/actions';

import { NavigationContext } from '@app/context/NavigationContext/NavigationContext';
import useFetch from '@app/hooks/useFetch';

const ListButton: React.FC<{ onListingProducts: (...args: any[]) => void }> = ({
  onListingProducts
}) => {
  const { currentPage, setCurrentPage } = useContext(NavigationContext);
  const { data, pages } = useFetch(10, currentPage + 1);
  const [showButton, setShowButton] = useState(true);

  useEffect(() => {
    if (pages && currentPage === pages) {
      setShowButton(false);
    }
  }, [currentPage, pages]);

  return showButton ? (
    <button
      onClick={() => {
        setCurrentPage(currentPage + 1);
        onListingProducts(data);
      }}
    >
      Show more
    </button>
  ) : null;
};

const mapDispatchToProps = (dispatch: React.Dispatch<any>) => {
  return {
    onListingProducts: (value) => dispatch(listProducts(value))
  };
};

export default connect(null, mapDispatchToProps)(ListButton);
