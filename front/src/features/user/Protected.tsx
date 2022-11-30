import React from 'react';
import { useAppSelector } from '../../app/hooks';
import Login from './Login';
import { Navigate } from 'react-router-dom';

function Protected({ element }: { element: JSX.Element }) {

  const session = useAppSelector( (state) => state.auth );

  let content: JSX.Element;

  if (session.autorizado) {
    content = element;
  }
  else {
    content = <Navigate to = { '/login' }/>;
  }

  return ( content );
}

export default Protected;