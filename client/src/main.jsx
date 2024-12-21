import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Header from './components/Header.jsx'
import Project from './components/Projects.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    <App />
    <Project />
    <Contact />
    <Footer />
  </StrictMode>,
)
