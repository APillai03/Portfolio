import React from 'react';
import './skills.css';

// Map skill names to devicon icon class names where available
const SKILL_ICON_MAP = {
  Python: 'devicon-python-plain colored',
  C: 'devicon-c-plain colored',
  'C++': 'devicon-cplusplus-plain colored',
  Java: 'devicon-java-plain colored',
  PowerShell: 'devicon-powershell-plain colored',
  Flask: 'devicon-flask-original',
  NodeJS: 'devicon-nodejs-plain colored',
  PHP: 'devicon-php-plain colored',
  React: 'devicon-react-original colored',
  MongoDB: 'devicon-mongodb-plain colored',
  SQL: 'devicon-mysql-plain colored',
  TensorFlow: 'devicon-tensorflow-original colored',
  'PyTorch': 'devicon-pytorch-original colored',
  'Hugging Face': 'devicon-huggingface-original colored',
  Docker: 'devicon-docker-plain colored',
  Terraform: 'devicon-terraform-plain colored',
  Azure: 'devicon-azure-plain colored',
  Jenkins: 'devicon-jenkins-plain colored',
  'Power BI': 'devicon-powerbi-plain colored',
  Pandas: 'devicon-pandas-original colored',
  NumPy: 'devicon-numpy-original colored',
  Excel: 'devicon-excel-plain colored',
  Jupyter: 'devicon-jupyter-plain colored',
  Matplotlib: '',
};

const SKILLS = [
  'Python','C','C++','Java','PowerShell','Flask','NodeJS','PHP','React','MongoDB','SQL',
  'TensorFlow','PyTorch','Hugging Face','Docker','Terraform','Azure','Jenkins','Power BI',
  'Pandas','NumPy','Excel','Jupyter','Matplotlib'
];


function initialsFor(name) {
  return name.split(/\s+/).map(w => w[0]).join('').slice(0,3).toUpperCase();
}

export default function Skills() {
  return (
    <section className="Skills" id="skills">
      <div className="Skills__header">
        <h2>Skills</h2>
        <p>Technologies and tools I use</p>
      </div>
      <div className="Skills__grid">
        {SKILLS.map((skill) => {
          const cls = SKILL_ICON_MAP[skill] || '';
          return (
            <div key={skill} className="skill-tile" title={skill} aria-label={skill} role="img">
              {cls ? (
                <i className={`skill-icon ${cls}`}></i>
              ) : (
                <div className="skill-fallback">{initialsFor(skill)}</div>
              )}
              <div className="skill-name">{skill}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
