import React, { useEffect, useState } from 'react';

import { PagesType } from '@app/types/types';

interface ListButtonInt {
  moreResults: (pages: PagesType) => void;
  pages: PagesType;
}

const ListButton: React.FC<ListButtonInt> = ({
  moreResults,
  pages,
  pages: { currentPage, totalPages }
}) => {
  const [showButton, setShowButton] = useState(true);

  useEffect(() => {
    if (currentPage === totalPages) {
      setShowButton(false);
    }
  }, [currentPage, totalPages]);

  return showButton ? (
    <button
      onClick={() => {
        moreResults({ ...pages, currentPage: currentPage + 1 });
      }}
    >
      Show more {pages.totalPages} - {pages.currentPage} - {pages.previousPage}
    </button>
  ) : null;
};

export default ListButton;
