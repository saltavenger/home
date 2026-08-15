import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGithubAlt,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import { faCertificate } from '@fortawesome/free-solid-svg-icons';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Card } from './-components/card';
import { CardList } from './-components/cardList';
import { ExperienceTitle } from './-components/experienceTitle';

import data from '../assets/experience.json';

import styles from './index.module.css';

function App() {
  const experience = data.experience;
  return (
    <>
      <header className={styles.header}>
          <div className={styles.ribbon}><h1 className={styles.ribbonContent}>Ali Areskog</h1></div>
      </header>
      <div className={styles.content}>
        <aside className={styles.side}>
            <p>Javascript engineer with a focus on UX and building frontend systems at scale. When not coding, I can be found doing partner acrobatics or on my bicycle.</p>
            <div className={styles.social}>
                <a href="https://github.com/saltavenger/" rel="noopener noreferrer"><FontAwesomeIcon icon={faGithubAlt} /><span className="sr-only">Github</span></a>
                <a href="https://www.linkedin.com/in/aareskog" rel="noopener noreferrer"><FontAwesomeIcon icon={faLinkedin} /><span className="sr-only">LinkedIn</span></a>
            </div>
            <h2>Experiments</h2>
            <ul className={styles.experiments}>
              <li><Link to="/experiments/map">Tri.net Map 2026</Link></li>
              <li><a href="https://x.com/search?q=(feedandgo%2C%20OR%20rasberrypi)%20(from%3Asaltavenger)&src=typed_query&f=top" target="_blank" rel="noopener noreferrer">Raspberry Pi Cat Feeder & Companion App, 2019</a></li>
            </ul>
            <h2>Art & Animation</h2>
            <CardList>
              <Card compact>
                <div><a href="https://www.flickr.com/people/saltavenger/" target="_blank" rel="noopener noreferrer">Bird & Nature Photography</a></div>
              </Card>
              <Card compact>
                <div>
                  <a href="https://vimeo.com/15642684?fl=pl&fe=sh" target="_blank" rel="noopener noreferrer">ECTV Horror Marathon Intro (Apple Motion)</a>
                </div>
              </Card>
              <Card compact>
                <div><a href="https://youtu.be/LHxt5KL8kxs?si=YPLEuF1DFynvh_Ll" target="_blank" rel="noopener noreferrer">The Flower (Stop Motion, After Effects)</a></div>
              </Card>
              <Card compact>
                <div><a href="https://youtu.be/0XIGQRDDwsc?si=66DDt-4I6ii5-jsR" target="_blank" rel="noopener noreferrer">Dodo (3D - Maya)</a></div>
              </Card>
              <Card compact>
                <div><a href="https://youtu.be/I_pGkWGe6GI?si=8BmkeNYAnayC88eJ" target="_blank" rel="noopener noreferrer">Casual Monster (Rotoscope)</a></div>
              </Card>
            </CardList>
            <h2>Achievements</h2>
            <CardList>
              <Card compact>
                <div><strong>1st place – Technology peer recognition team award</strong></div>
                <div>Chewy, 2021</div>
              </Card>
              <Card compact>
                <div>
                  <a href="https://youtu.be/EqzNZlwg_F0?si=6mcWNXK4fkHmeCo_" target="_blank" rel="noopener noreferrer">
                    <strong>Club Drosslemeyer</strong>
                  </a>
                </div>
                <div>Oberon Theater - Acrobatic performance, 2016</div>
              </Card>
              <Card compact>
                <div><strong>Accessibility & semantic design: creating clean and accessible code</strong></div>
                <div>Boston CSS Meetup, 2015</div>
              </Card>
              <Card compact>
                <div><strong>2nd place — Hackfit</strong></div>
                <div>Routine building application for outpatient recovery from addiction, 2014</div>
              </Card>
            </CardList>
        </aside>
        <main className={styles.main}>
            <h2 className={styles.experience}>Experience</h2>
            <CardList>
              {experience.map(job => (
                <Card key={job.id}>
                  <ExperienceTitle date={job.date} title={job.title} company={job.company} />
                  <ul>
                    {job.highlights.map(highlight => (
                      <li key={highlight.key}>{highlight.text}</li>
                    ))}
                  </ul>
                </Card>
              ))}
            </CardList>
            <h2>Education</h2>
            <CardList single>
              <li><strong>Emerson College</strong>, <em>B.A. Visual Media Arts</em>, Concentration: New Media, 2008</li>
              <li><h3>Courses</h3>
                  <ul>
                      <li>Front End Web Development, General Assembly, 2012</li>
                      <li>Introduction to Computer Science, edX, MIT, 2013 <a href="https://s3.amazonaws.com/verify.edx.org/downloads/03e46306a95a47f1b29735645cfebb51/Certificate.pdf" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faCertificate} /><span className="sr-only">edX Certificate</span></a></li>
                      <li>Fundamentals of Typography, UMass Lowell, 2014</li>
                  </ul>
              </li>
            </CardList>
            <div id="app"></div>
        </main>
      </div>
    </>
  )
}

export const Route = createFileRoute('/')({
  component: App,
});
