import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.tsx'
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProviderWrapper } from "./contexts/ThemeContext";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProviderWrapper>

      <AuthProvider>

        <App />
      </AuthProvider>
    </ThemeProviderWrapper>
  </StrictMode>,
)
