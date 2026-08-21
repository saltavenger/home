import { createFileRoute, Link } from '@tanstack/react-router';

import styles from './index.module.css';

export const Route = createFileRoute('/experiments/redesign/')({
  component: RedesignPage,
  staticData: {
    title: 'Portfolio Redesign & AI'
  }
})

function RedesignPage() {
  return (
    <main className={styles.container}>
      <h2>Adventures in AI</h2>
      <nav className={styles.toc}><strong>Table of Contents</strong>
        <ul>
          <li><Link to="." hash="beginning">The beginning</Link></li>
          <li><Link to="." hash="design">Leaning in with Claude Design</Link>
            <ul>
              <li><Link to="." hash="home">Designing the homepage</Link></li>
              <li><Link to="." hash="brand">Brand</Link></li>
            </ul>
          </li>
          <li><Link to="." hash="code">Claude Code</Link></li>
        </ul>
      </nav>
      <p>I have been working my way through the course, <a href="https://aianddesign.systems/" rel="noopener noreferrer" target="_blank">AI & Design Systems</a>, which is a collab between Brad Frost & Southleft. My neglected portfolio site seemed like a good place to apply the lessons.</p>
      <p>While at Chewy I was often focused on large scale technical migrations and infrastructure. I used AI frequently for deep research and outsourcing menial tasks. But, I found myself lacking time to fully explore the design-oriented side of AI. Having been on the other side reviewing tons of AI-generated code, I am especially interested in the nuances of effectively using a design system to enhance code quality and accessibility.</p>
      <p className={styles.info}><strong>Note:</strong> I plan to update this page as I go through the course, this is a work in progress.</p>
      <h3 id="beginning">The beginning</h3>
      <p>I started this journey without AI. As much as AI is cool, I wanted to refamiliarize myself with the code, and this is very familiar and easy territory for me. The plan was to convert my old plain HTML/CSS site from nearly two decades ago to react so that I could build on it & set up a CICD pipeline in github actions.</p>
      <div className={styles.redesignImg}>
        <img src="/redesign/original-full.png" width={600} />
      </div>
      <p>After it was up and running, I spent a little time cleaning up the CSS myself to help out readability and visual hierarchy.</p>
      <div className={styles.redesignImg}>
        <img src="/redesign/starter-full.png" width={600} />
      </div>
      <h3 id="design">Leaning in with Claude Design</h3>
      <p>At my previous employer, we had access to Cursor and ChatGPT. So, while I'm not entirely new to AI tools, I am new to Claude. I wanted to try out Claude Design to help me with my dated site.</p>
      <p>I set a few ground rules:
        <ul>
          <li>Accessibility should be prioritized, use WCAG standards</li>
          <li>Refer to the original codebase for content and a starting point</li>
          <li>The design should be simple and rooted in the original concept of botanical prints</li>
          <li>Focus on improving the typography</li>
          <li>The colors of my current theme do not meet contrast standards, this should be fixed</li>
          <li>Make sure any fonts are free to use non-commercially</li>
          <li>Use my "inspiration" as a theme or guiding light. Do not add flowers and vines to the design.</li>
        </ul>
      </p>
      <div className={styles.redesignImg}>
        <img src="/redesign/brief-full.png" width={600} />
      </div>
      <h4 id="home">Designing the homepage</h4>
      <p>Claude quickly generated three initial options. All three looked more modern than my current design, but I felt the options were fairly sterile and lacking personality. I had claude regenerate three more options using a herbarium specimen sheet for inspiration.</p>
      <h4 id="brand">The Brand</h4>
      <p>Once finished with the homepage design, I had claude generate a spec sheet.</p>
      <div className={styles.redesignImg}>
        <img src="/redesign/brandspec-full.png" width={600} />
      </div>
      <h3 id="code">Claude Code</h3>
    </main>
  );
}
