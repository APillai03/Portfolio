import './styles.css';
import linkedin from './assets/linkedin_logo.png';
import whatsapp from './assets/whatsapp_logo.png';
import github from './assets/github_logo.png';
import gmail from './assets/gmail_logo.png';

function App() {
  return (
    <section className="Hero" id="home">
      <div className="Hero__content">
        <p className="eyebrow">Hello, I am</p>
        <h1 className="headline">Aditya Pillai</h1>
        <p className="subhead">Full‑stack developer, ML enthusiast and Cloud Practitioner crafting reliable, human‑centered solutions.</p>

        <div className="Hero__ctas">
          <a className="btn primary" href="#projects">View Projects</a>
          <a className="btn" href="https://apillai03.github.io/Certificates/Resume.pdf" target="_blank" rel="noopener noreferrer">Resume</a>
        </div>

        <div className="Hero__socials">
          <a className="social" href='https://www.linkedin.com/in/aditya-pillai-7a6338334' target='_blank' rel="noopener noreferrer" aria-label="LinkedIn">
            <img src={linkedin} alt="LinkedIn" />
          </a>
          <a className="social" href="https://wa.me/0000000000?text=Hello%20there" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
            <img src={whatsapp} alt="WhatsApp" />
          </a>
          <a className="social" href='https://github.com/APillai03' target='_blank' rel="noopener noreferrer" aria-label="GitHub">
            <img src={github} alt="GitHub" />
          </a>
          <a className="social" href='mailto:adityapillai0803@gmail.com' aria-label="Email">
            <img src={gmail} alt="Gmail" />
          </a>
        </div>
      </div>
    </section>
  )
}

export default App
