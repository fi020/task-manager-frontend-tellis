import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.tsx'
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProviderWrapper } from "./contexts/ThemeContext";
import { TaskProvider } from './contexts/TaskContext.tsx';
import { SnackbarProvider } from './contexts/SnackbarContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProviderWrapper>

      <AuthProvider>
        <TaskProvider>
          <SnackbarProvider>


          <App />
          </SnackbarProvider>
        </TaskProvider>
      </AuthProvider>
    </ThemeProviderWrapper>
  </StrictMode>,
)
