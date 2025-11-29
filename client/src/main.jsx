import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { AppContextProvider } from './context/AppContext.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <GoogleOAuthProvider clientId="682222120557-c65h2gkrjdf3qgckjrleellehkrj8b26.apps.googleusercontent.com">
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </GoogleOAuthProvider>
  </BrowserRouter>,
)
