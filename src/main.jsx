import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';



ReactDOM.createRoot(document.getElementById('root')).render(
  <MantineProvider withGlobalStyles withNormalizeCSS>
    <React.StrictMode>
      <BrowserRouter basename={"/recipe-finder/"}>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </MantineProvider>

)
