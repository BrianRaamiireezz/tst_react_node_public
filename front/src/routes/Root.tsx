import { Outlet } from 'react-router-dom';

function Root() {
  return (
    <>
      <h1>
        Page header
      </h1>
      <div>
        <Outlet/>
      </div>
    </>
  );
}

/* TODO:  i - navigation
*         i - outlet
* */


export default Root;