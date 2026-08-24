import { createFileRoute } from '@tanstack/react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { Media } from '@/routes/-components/media';

import styles from './index.module.css';

export const Route = createFileRoute('/experiments/catFeeder/')({
  component: RouteComponent,
  staticData: {
    title: 'Raspberry Pi Cat Feeder'
  }
})

function RouteComponent() {
  return (
    <div>
        <div>
            <h2>Feeder Rebuild</h2>
            <div className={styles.container}>
                <p>Rebuild of "Feed and go" pet feeder. Gutted existing hardware and replaced with raspberry pi after company that manufactured it closed.</p>
                <h3>Features</h3>
                <ul>
                    <li>Raspberry pi motor driver integrated with existing bowl and motor</li>
                    <li>Photo-interrupter to position bowl</li>
                    <li>Touch sensors to manually trigger feedings and lock bowl</li>
                    <li>Video camera - to see cat when you're away</li>
                </ul>
                <p>Created a companion application built with AWS Amplify to prototype quickly. Integrated with AWS IOT.</p>
                <Media caption="Cat feeder companion application">
                    <img
                        src="/cat-feeder"
                        alt="User profile screen for companion application"
                        className={styles.appImg}
                    />
                </Media>
            </div>
            <div className={styles.container}>
                <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/olmZlXvhRXo?si=zsgTufTGehIVCm0s"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                />
                <p>Demo of cat feeder responding to existing SNS queue of leasing flow I was working on at the time. POC for SNS queue in application.</p>
            </div>
            <h2>Links</h2>
            <div className={styles.container}>
                <div>
                    <a
                        href="https://x.com/search?q=(feedandgo%2C%20OR%20rasberrypi)%20(from%3Asaltavenger)&src=typed_query&f=top"
                        target="_blank"
                        rel="noopener noreferrer"
                    >Twitter - Hardware updates <FontAwesomeIcon icon={faArrowUpRightFromSquare} /></a>
                </div>
                <div>
                    <a
                        href="https://github.com/saltavenger/feedandgo"
                        target="_blank"
                        rel="noopener noreferrer"
                    >Github Repository <FontAwesomeIcon icon={faArrowUpRightFromSquare} /></a>
                </div>
            </div>
        </div>
    </div>
  );
}
