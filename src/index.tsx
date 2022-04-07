import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import { ThemeProvider } from './hooks/theme'
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux"
import giveStore from './redux/store';
import { Spinner } from 'reactstrap';



// ** Lazy load app
const LazyApp = lazy(() => import('./App'));


ReactDOM.render(
  <React.StrictMode>
    <Provider store={giveStore()}>
    <Suspense fallback={<Spinner className='loader'/>}>
      <BrowserRouter>
      <ThemeProvider>
          <LazyApp />
      </ThemeProvider>
    </BrowserRouter>
    </Suspense>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
