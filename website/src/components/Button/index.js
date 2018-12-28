import React from 'react';

import {GooBlob, GooeyButton, GooBlobContainer} from './index.styles';

export default ({children, onClick, disabled}) => {
  return (
    <GooeyButton disabled={disabled} onClick={onClick}>
      {children}
      <GooBlobContainer className="goo-blob-container">
        <GooBlob />
        <GooBlob />
        <GooBlob />
        <GooBlob />
      </GooBlobContainer>
    </GooeyButton>
  );
};
