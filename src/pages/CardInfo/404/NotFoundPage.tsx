import React from 'react';
import { Link } from 'react-router-dom';

export const NotFoundpage = () => {
  return (
    <>
      <div>404 Not found</div>
      <Link to={'/'}>Return to home page</Link>
    </>
  );
};
