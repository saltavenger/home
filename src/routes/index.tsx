import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGithubAlt,
  faLinkedin,
  faStackOverflow
} from '@fortawesome/free-brands-svg-icons';
import { faCertificate } from '@fortawesome/free-solid-svg-icons';
import { createFileRoute, Link } from '@tanstack/react-router';

import data from '../assets/experience.json';

import styles from './index.module.css';

function App() {
  const experience = data.experience;
  return (
    <>
      <header>
          <div className={styles.ribbon}><h1 className={styles.ribbonContent}>Ali Areskog</h1></div>
      </header>
      <div className={styles.content}>
        <aside className={styles.side}>
            <p>Javascript engineer with a focus on UX and building frontend systems at scale. When not coding, I can be found doing partner acrobatics or on my bicycle.</p>
            <div className={styles.social}>
                <a href="https://github.com/saltavenger/"><FontAwesomeIcon icon={faGithubAlt} /><span className="sr-only">Github</span></a>
                <a href="http://stackoverflow.com/users/2823860/saltavenger"><FontAwesomeIcon icon={faLinkedin} /><span className="sr-only">LinkedIn</span></a>
                <a href="https://www.linkedin.com/in/aareskog"><FontAwesomeIcon icon={faStackOverflow} /><span className="sr-only">Stack Overflow</span></a>
            </div>
            <h2>Experiments</h2>
            <ul>
              <li><Link to="/experiments/map">Tri.net Map 2026</Link></li>
            </ul>
            <h2>Achievements</h2>
            <ul>
              <li><strong>1st Place</strong> — Chewy — Technology peer recognition team award, 2021</li>
              <li><strong>Club Drosslemeyer</strong> - Oberon Theater - <a href="https://youtu.be/EqzNZlwg_F0?si=6mcWNXK4fkHmeCo_" target="_blank">Acrobatic performance</a>, 2016</li>
              <li><strong>Boston CSS Meetup</strong> — Accessibility & Semantic design: creating clean and accessible code, 2015</li>
              <li><strong>2nd place</strong> — Hackfit — Routine building application for outpatient recovery from addiction, 2014</li>
            </ul>
        </aside>
        <main className={styles.main}>
            <h2>Experience</h2>
            <ul>
              {experience.map(job => (
                <li key={job.id}>{job.date} <strong>{job.title}</strong>, {job.company}
                  <ul>
                    {job.highlights.map(highlight => (
                      <li key={highlight.key}>{highlight.text}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
            <h2>Education</h2>
            <ul className={styles.education}>
                <li>Emerson College, B.A. Visual Media Arts, Concentration: New Media, 2008</li>
                <li><h3>Courses</h3>
                    <ul>
                        <li>Front End Web Development, General Assembly, 2012</li>
                        <li>Introduction to Computer Science, edX, MIT, 2013 <a href="https://s3.amazonaws.com/verify.edx.org/downloads/03e46306a95a47f1b29735645cfebb51/Certificate.pdf" target="_blank"><FontAwesomeIcon icon={faCertificate} /></a></li>
                        <li>Fundamentals of Typography, UMass Lowell, 2014</li>
                    </ul>
                </li>
            </ul>
            <div id="app"></div>
        </main>
      </div>
    </>
  )
}

export const Route = createFileRoute('/')({
  component: App,
});
