import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGithubAlt,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import { faCertificate, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Card } from './-components/card';
import { CardList } from './-components/cardList';
import { ExperienceTitle } from './-components/experienceTitle';
import { Media } from './-components/media';
import { LinkButton } from './-components/linkButton';

import data from '../assets/experience.json';

import styles from './index.module.css';

function App() {
  const experience = data.experience;
  return (
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
              <div><Link to="/experiments/trans">Transbucket User Experience</Link><span className={styles.meta}>2026</span></div>
            </Card>
            <Card compact>
              <div><Link to="/experiments/redesign">Claude Design & Portfolio</Link><span className={styles.meta}>2026</span></div>
            </Card>
            <Card compact>
              <div><Link to="/experiments/map">Tri.net Map</Link><span className={styles.meta}>2026</span></div>
            </Card>
            <Card compact>
              <div>
                <div><Link to="/experiments/catFeeder">Raspberry Pi Cat Feeder & Companion App</Link></div>
                <span className={styles.meta}>2019</span>
              </div>
            </Card>
          </CardList>
          <h2 className={styles.sideSectionGap}>Art &amp; animation</h2>
          <CardList>
            <Card compact>
              <div><a href="https://www.flickr.com/people/saltavenger/" target="_blank" rel="noopener noreferrer">Bird &amp; Nature Photography <FontAwesomeIcon icon={faArrowUpRightFromSquare} /></a><span className={styles.meta}>Flickr</span></div>
            </Card>
            <Card compact>
              <div>
                <Media
                  caption="ECTV Horror Marathon Intro"
                  noBorder
                  trigger={
                    <LinkButton type="button">
                      ECTV Horror Marathon Intro
                    </LinkButton>
                  }
                >
                  <iframe 
                      title="vimeo-player"
                      src="https://player.vimeo.com/video/15642684?h=24e3e3fb74"
                      width="640"
                      height="360"
                      frameBorder="0"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                      allowFullScreen
                    />
                </Media>
                <span className={styles.meta}>Apple Motion</span>
              </div>
            </Card>
            <Card compact>
              <div>
                <Media
                  caption="The Flower"
                  noBorder
                  trigger={
                    <LinkButton>
                      The Flower
                    </LinkButton>
                  }
                >
                  <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/LHxt5KL8kxs?si=IfiCoxlL7RgWY7aa"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </Media>
                <span className={styles.meta}>Stop motion, After Effects</span>
              </div>
            </Card>
            <Card compact>
              <div>
                <Media
                  caption="Dodo"
                  noBorder
                  trigger={
                    <LinkButton>
                      Dodo
                    </LinkButton>
                  }
                >
                  <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/0XIGQRDDwsc?si=66DDt-4I6ii5-jsR"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </Media>
                <span className={styles.meta}>3D, Maya</span>
              </div>
            </Card>
            <Card compact>
              <div>
                <Media
                  caption="Casual Monster"
                  noBorder
                  trigger={
                    <LinkButton type="button">
                      Casual Monster
                    </LinkButton>
                  }
                >
                  <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/I_pGkWGe6GI?si=8BmkeNYAnayC88eJ"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </Media>
                <span className={styles.meta}>Rotoscope</span>
              </div>
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
              <span className={styles.meta}>Chewy, 2021</span>
            </Card>
            <Card compact>
              <div>
                <Media
                  caption="Club Drosslemeyer"
                  noBorder
                  trigger={
                    <LinkButton>
                      <strong>Club Drosslemeyer</strong>
                    </LinkButton>
                  }
                >
                  <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/EqzNZlwg_F0?si=6mcWNXK4fkHmeCo_"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </Media>
              </div>
              <span className={styles.meta}>Oberon Theater — acrobatic performance, 2016</span>
            </Card>
            <Card compact>
              <div><strong>Accessibility &amp; semantic design: creating clean and accessible code</strong></div>
              <span className={styles.meta}>Boston CSS Meetup, 2015</span>
            </Card>
            <Card compact>
              <div><strong>2nd place — Hackfit</strong></div>
              <span className={styles.meta}>Routine building application for outpatient recovery from addiction, 2014</span>
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
              <li><span className={styles.courseDate}>2026</span><div>AI & Design Systems, Southleft & Brad Frost Web</div></li>
              <li><span className={styles.courseDate}>2012</span><div>Front End Web Development, General Assembly</div></li>
              <li><span className={styles.courseDate}>2013</span><div>Introduction to Computer Science, edX / MIT <a href="https://s3.amazonaws.com/verify.edx.org/downloads/03e46306a95a47f1b29735645cfebb51/Certificate.pdf" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faCertificate} /><span className="sr-only">edX Certificate</span></a></div></li>
              <li><span className={styles.courseDate}>2014</span><div>Fundamentals of Typography, UMass Lowell</div></li>
            </ul>
          </div>
        </main>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/')({
  component: App,
});
