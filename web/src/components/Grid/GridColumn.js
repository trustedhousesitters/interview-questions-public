import React from 'react';

import './index.css';

const GridColumn = ({ children, key }) =>  (
  <div key={key} className="col">
    <div className="inner-col">
      {children}
    </div>
  </div>
);


export default GridColumn;
