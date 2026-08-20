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
    <div className={styles.board}>
      <div className={styles.sheet}>
        <header className={styles.header}>
          <div className={styles.bookmark}></div>
          <h1>Ali Areskog</h1>
        </header>
        <div className={styles.intro}>
          <div className={styles.introMain}>
            <p className={styles.summary}>Javascript engineer with a focus on UX and building frontend systems at scale. When not coding, I can be found doing partner acrobatics or on my bicycle.</p>
            <div className={styles.social}>
                <a href="https://github.com/saltavenger/" rel="noopener noreferrer"><FontAwesomeIcon icon={faGithubAlt} /><span className="sr-only">Github</span></a>
                <a href="https://www.linkedin.com/in/aareskog" rel="noopener noreferrer"><FontAwesomeIcon icon={faLinkedin} /><span className="sr-only">LinkedIn</span></a>
            </div>
          </div>
          <dl className={styles.facts}>
            <dt>Locality</dt><dd>Boston, MA</dd>
            <dt>Coll.</dt><dd>2013 — present</dd>
          </dl>
        </div>
        <div className={styles.content}>
          <aside className={styles.side}>
            <h2>Experiments</h2>
            <CardList>
              <Card compact>
                <div><Link to="/experiments/map">Tri.net Map</Link><span className="meta">2026</span></div>
              </Card>
              <Card compact>
                <div><a href="https://x.com/search?q=(feedandgo%2C%20OR%20rasberrypi)%20(from%3Asaltavenger)&src=typed_query&f=top" target="_blank" rel="noopener noreferrer">Raspberry Pi cat feeder &amp; companion app</a><span className="meta">2019</span></div>
              </Card>
            </CardList>
            <h2 className={styles.sideSectionGap}>Art &amp; animation</h2>
            <CardList>
              <Card compact>
                <div><a href="https://www.flickr.com/people/saltavenger/" target="_blank" rel="noopener noreferrer">Bird &amp; nature photography</a><span className="meta">Flickr</span></div>
              </Card>
              <Card compact>
                <div><a href="https://vimeo.com/15642684?fl=pl&fe=sh" target="_blank" rel="noopener noreferrer">ECTV Horror Marathon intro</a><span className="meta">Apple Motion</span></div>
              </Card>
              <Card compact>
                <div><a href="https://youtu.be/LHxt5KL8kxs?si=YPLEuF1DFynvh_Ll" target="_blank" rel="noopener noreferrer">The Flower</a><span className="meta">Stop motion, After Effects</span></div>
              </Card>
              <Card compact>
                <div><a href="https://youtu.be/0XIGQRDDwsc?si=66DDt-4I6ii5-jsR" target="_blank" rel="noopener noreferrer">Dodo</a><span className="meta">3D, Maya</span></div>
              </Card>
              <Card compact>
                <div><a href="https://youtu.be/I_pGkWGe6GI?si=8BmkeNYAnayC88eJ" target="_blank" rel="noopener noreferrer">Casual Monster</a><span className="meta">Rotoscope</span></div>
              </Card>
            </CardList>
          </aside>
          <main className={styles.main}>
            <div className={styles.headRow}>
              <h2>Experience</h2>
              <span className={styles.headCount}>{experience.length} entries · 13 yrs</span>
            </div>
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
            <h2 className={styles.sectionGap}>Achievements</h2>
            <CardList>
              <Card compact>
                <div><strong>1st place – Technology peer recognition team award</strong></div>
                <span className="meta">Chewy, 2021</span>
              </Card>
              <Card compact>
                <div>
                  <a href="https://youtu.be/EqzNZlwg_F0?si=6mcWNXK4fkHmeCo_" target="_blank" rel="noopener noreferrer">
                    <strong>Club Drosslemeyer</strong>
                  </a>
                </div>
                <span className="meta">Oberon Theater — acrobatic performance, 2016</span>
              </Card>
              <Card compact>
                <div><strong>Accessibility &amp; semantic design: creating clean and accessible code</strong></div>
                <span className="meta">Boston CSS Meetup, 2015</span>
              </Card>
              <Card compact>
                <div><strong>2nd place — Hackfit</strong></div>
                <span className="meta">Routine building application for outpatient recovery from addiction, 2014</span>
              </Card>
            </CardList>
            <h2 className={styles.sectionGap}>Education</h2>
            <div className={styles.education}>
              <div className={styles.educationHead}>
                <h3>B.A. Visual Media Arts</h3>
                <span className={styles.educationDate}>2008</span>
              </div>
              <div className={styles.educationSchool}>Emerson College — concentration, New Media</div>
              <p className={styles.continuingLabel}>Continuing education</p>
              <ul className={styles.courses}>
                <li><span>2012</span><div>Front End Web Development, General Assembly</div></li>
                <li><span>2013</span><div>Introduction to Computer Science, edX / MIT <a href="https://s3.amazonaws.com/verify.edx.org/downloads/03e46306a95a47f1b29735645cfebb51/Certificate.pdf" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faCertificate} /><span className="sr-only">edX Certificate</span></a></div></li>
                <li><span>2014</span><div>Fundamentals of Typography, UMass Lowell</div></li>
              </ul>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/')({
  component: App,
});
