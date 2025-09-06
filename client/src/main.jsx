import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Header from './components/Header.jsx'
import Project from './components/Projects.jsx'
import Skills from './components/Skills.jsx'
import Contact from './components/Contact.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    <App />
    <Project />
    <Skills />
    <Contact />
  </StrictMode>,
)
