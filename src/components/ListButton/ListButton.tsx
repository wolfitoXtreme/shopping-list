import React, { useEffect, useState } from 'react';

import { PagesType } from '@app/types/types';

import Button from '@app/components/Button/Button';

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
    <Button
      actions={[() => moreResults({ ...pages, currentPage: currentPage + 1 })]}
    >
      Show more {pages.totalPages} - {pages.currentPage} - {pages.previousPage}
    </Button>
  ) : null;
};

export default ListButton;
