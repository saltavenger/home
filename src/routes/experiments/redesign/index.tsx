import { createFileRoute, Link } from '@tanstack/react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

import styles from './index.module.css';
import { Media } from '@/routes/-components/media';

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
              <li><Link to="." hash="iteration">Iteration</Link>
                <ul>
                  <li><Link to="." hash="elements">Design elements</Link></li>
                  <li><Link to="." hash="final">Final design</Link></li>
                </ul>
              </li>
              <li><Link to="." hash="brand">Brand</Link></li>
            </ul>
          </li>
          <li><Link to="." hash="code">Claude Code</Link>
            <ul>
              <li><Link to="." hash="pros">What Claude did well</Link></li>
              <li><Link to="." hash="cons">What Claude failed</Link></li>
              <li><Link to="." hash="improve">How can I improve my results?</Link>
                <ul>
                  <li><Link to="." hash="hypothesis">Hypothesis</Link></li>
                  <li><Link to="." hash="testing">Testing the hypothesis</Link></li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <p>I have been working my way through the course, <a href="https://aianddesign.systems/" rel="noopener noreferrer" target="_blank">AI & Design Systems <FontAwesomeIcon icon={faArrowUpRightFromSquare} /></a>, which is a collab between Brad Frost & Southleft. My neglected portfolio site seemed like a good place to apply the lessons.</p>
      <p>While at Chewy I was often focused on large scale technical migrations and infrastructure. I used AI frequently for deep research and outsourcing menial tasks. But, I found myself lacking time to fully explore the design-oriented side of AI. Having been on the other side reviewing tons of AI-generated code, I am especially interested in the nuances of effectively using a design system to enhance code quality and accessibility.</p>
      <p className={styles.info}><strong>Note:</strong> I plan to update this page, and my portfolio, as I go through the course. Consider it a living document</p>
      <h3 id="beginning">The beginning</h3>
      <div className={styles.twoColumn}>
        <p>I started this journey without AI. As much as AI is cool, I wanted to refamiliarize myself with the code. The plan was to convert my old plain HTML/CSS site from nearly two decades ago to react so that I could build on it & set up a CICD pipeline in github actions.</p>
        <div className={styles.imgContainer}>
          <Media caption="Original HTML/CSS site">
            <img
              src="/redesign/original-full.png"
              className={styles.img}
              alt="Original version of homepage created in HTML/CSS; simple plain text, responsive"
            />
          </Media>
        </div>
      </div>
      <div className={styles.twoColumn}>
        <p>Next, I focused on visual hierarchy of information and updated the CSS to enhance readability and make sections more distinct.</p>
        <div className={styles.imgContainer}>
          <Media caption="Updated site with clearer visual hierarchy">
            <img
              src="/redesign/starter-full.png"
              className={styles.img}
              alt="Improved homepage design introducing visual hierarchy to page via Author's own brain"
            />
          </Media>
        </div>
      </div>
      <h3 id="design">Leaning in with Claude Design</h3>
      <p>At my previous employer, we had access to Cursor and ChatGPT. So, while I'm not entirely new to AI tools, I am new to Claude. I wanted to try out Claude Design to help me with my dated site.</p>
      <div className={styles.twoColumn}>
        <div>I set a few ground rules:
          <ul>
            <li>Accessibility should be prioritized, use WCAG standards</li>
            <li>Refer to the original codebase for content and a starting point</li>
            <li>The design should be simple and rooted in the original concept of botanical prints</li>
            <li>Focus on improving the typography</li>
            <li>The colors of my current theme do not meet contrast standards, this should be fixed</li>
            <li>Make sure any fonts are free to use non-commercially</li>
            <li>Use my "inspiration" as a theme or guiding light. Do not add flowers and vines to the design.</li>
          </ul>
        </div>
        <div className={styles.imgContainer}>
          <Media caption="Claude Design's interpretation of the brief">
            <img
              src="/redesign/brief-full.png"
              className={styles.img}
              alt="Claude Design generated brief; summarizing generated plan"
            />
          </Media>
        </div>
      </div>
      <h4 id="iteration">Iteration</h4>
      <p>Claude generated three initial options. All three looked more modern than my current design, but I felt the options were fairly sterile and lacking personality.</p>
      <div className={styles.mediaStrip}>
        <div className={`${styles.imgContainer} ${styles.imgContainerSmall}`}>
          <Media caption="Option 1: Monograph">
            <img
              src="/redesign/first-opt-1.png"
              className={styles.img}
              alt="Spectral + IBM Plex Mono. Hairline rules instead of card fills, small-caps section marks, dates set as mono captions. Density from typographic hierarchy, not boxes."
            />
          </Media>
        </div>
        <div className={`${styles.imgContainer} ${styles.imgContainerSmall}`}>
          <Media caption="Option 2: Survey">
            <img
              src="/redesign/first-opt-2.png"
              className={styles.img}
              alt="Archivo + IBM Plex Mono, no serif at all. Experience as a ruled table with tabular dates; ink kept muted, one rust accent. Densest and most utilitarian."
            />
          </Media>
        </div>
        <div className={`${styles.imgContainer} ${styles.imgContainerSmall}`}>
          <Media caption="Option 3: Plate">
            <img
              src="/redesign/first-opt-3.png"
              className={styles.img}
              alt="EB Garamond display + Public Sans body. One column, large margins, the paper doing most of the work. Least information per screen; most personality."
            />
          </Media>
        </div>
      </div>
      <p>Claude explained the inspiration it pulled from the previous botanical prints: hairline rules, typographical density, and muted ink. Given Claude was focusing less on the artistic content, and more on the organization of information within the print; I felt the herbarium prints reflected something closer to what I was looking for. I prompted it to generate three more options using a herbarium specimen sheet for inspiration rather than the botanical prints it originally used.</p>
      <p>The options generated from the herbarium print were closer to the look and feel I wanted. I prefer the lighter background color and felt that the increased contrast between the font color was helpful.</p>
      <div className={styles.mediaStrip}>
        <div className={`${styles.imgContainer} ${styles.imgContainerSmall}`}>
          <Media caption="Option 1: Typed label">
            <img
              src="/redesign/iteration-opt-1.png"
              className={styles.img}
              alt="Type axis. Source Serif 4 for prose, Courier Prime for every label, date and number. Section heads are typed label blocks; content sits on a mount sheet inset from the board."
            />
          </Media>
        </div>
        <div className={`${styles.imgContainer} ${styles.imgContainerSmall}`}>
          <Media caption="Option 2: Sheet & label">
            <img
              src="/redesign/iteration-opt-2.png"
              className={styles.img}
              alt="Layout axis. No serif — Public Sans with Courier Prime labels. The specimen label becomes a persistent left column; the right side is the mounted sheet, one accession row per role."
            />
          </Media>
        </div>
        <div className={`${styles.imgContainer} ${styles.imgContainerSmall}`}>
          <Media caption="Option 3: Mounted">
            <img
              src="/redesign/iteration-opt-3.png"
              className={styles.img}
              alt="Ornament axis. Spectral + IBM Plex Mono, plus the physical cues: four corners of gummed tape, a ruled accession stamp, and a marginal annotation in italic. Four ornaments total, then stop."
            />
          </Media>
        </div>
      </div>
      <h5 id="elements">Design Elements</h5>
      <div className={styles.twoColumn}>
        <p>Overall, I liked the typography of the designs, but the top-level header didn't feel balanced to me. I thought the options either had too much flourish, or not enough. I asked Claude to generate additional header candidates. I settled on the last option, 4e, as it was a serif that still felt weighted and grounded.</p>
        <div className={styles.imgContainer}>
          <Media caption="Claude generated typography options" noBorder>
            <img
              src="/redesign/type-options.png"
              className={styles.img}
              alt="Typography options"
            />
          </Media>
        </div>
      </div>
      <div className={styles.twoColumn}>
        <p>I found myself missing the pink hover color that added a dose of playfulness to the original design and drew from the original botanical inspiration.</p>
        <div className={styles.imgContainer}>
          <Media caption="Claude attempts to integrate rose color from original designs">
            <img
              src="/redesign/pink.png"
              className={styles.img}
              alt="Ideas for incorporating rose color into theme"
            />
          </Media>
        </div>
      </div>
      <p>Of the options above, I thought that 5c could potentially work if the border was rose and the text remained green. I found the rose text visually difficult and thought it reduced contrast next to the rust. I had Claude compare options with this in mind. The rose border with the green font color is most successful, but ultimately I felt the design was stronger and more consistent without the rose color added in.</p>
      <div className={styles.mediaStrip}>
        <div className={`${styles.imgContainer} ${styles.imgContainerSmall}`}>
          <Media caption="Claude's original idea – Rose on Rose header">
            <img
              src="/redesign/pink-opt-1.png"
              className={styles.img}
              alt="Header with rose font color and rose border"
            />
          </Media>
        </div>
        <div className={`${styles.imgContainer} ${styles.imgContainerSmall}`}>
          <Media caption="Option 1: Rose on Green header">
            <img
              src="/redesign/pink-opt-2.png"
              className={styles.img}
              alt="Header with rose font color and green border"
            />
          </Media>
        </div>
        <div className={`${styles.imgContainer} ${styles.imgContainerSmall}`}>
          <Media caption="Option 2: Rose instead of rust">
            <img
              src="/redesign/pink-opt-3.png"
              className={styles.img}
              alt="Rose replaces rust color links"
            />
          </Media>
        </div>
      </div>
      <h5 id="final">Final design</h5>
      <div className={styles.twoColumn}>
        <p>For the final iteration I had it merge the concept from the first herbarium option with a split layout that was closer to the original site. The stacked options Claude gave me look nice in the abbreviated version of my site shown in the design, however my actual resume and "experience" section are much longer. I didn't want the "experiments" or "art & animation" sections to get lost. I pulled the typography choices from the second option claude gave me. Lastly, I added back the ribbon from my original site as a bookmark, I like the playfulness of the option with mounting tape and wanted to introduce a slightly more subtle decorative element.</p>
        <div className={styles.imgContainer}>
          <Media caption="Final design">
            <img
              src="/redesign/final.png"
              className={styles.img}
              alt="Final design with options pulled from previous designs"
            />
          </Media>
        </div>
      </div>
      <h4 id="brand">The Brand</h4>
      <p>I wanted to create a new favico image that would feel more consistent with the new version of the site. I had claude lead with three options based on the design:</p>
      <div className={styles.mediaStrip}>
        <div className={`${styles.imgContainer} ${styles.imgContainerSmall}`}>
          <Media caption="Option 1: Initial with bookmark">
            <img
              src="/redesign/favico-opt-1.png"
              className={styles.img}
              alt="Initial with bookmark; neutral text on green background"
            />
          </Media>
        </div>
        <div className={`${styles.imgContainer} ${styles.imgContainerSmall}`}>
          <Media caption="Option 2: Initial only">
            <img
              src="/redesign/favico-opt-2.png"
              className={styles.img}
              alt="Initial only; neutral text on green background"
            />
          </Media>
        </div>
        <div className={`${styles.imgContainer} ${styles.imgContainerSmall}`}>
          <Media caption="Option 3: Bookmark only">
            <img
              src="/redesign/favico-opt-3.png"
              className={styles.img}
              alt="Bookmark only; Green bookmark, neutral background"
            />
          </Media>
        </div>
      </div>
      <p>I didn't love the options generated by Claude this time and did not want to associate my identity with literary references or confuse the user with the actual browser bookmark manager. I asked claude to generate more options using my initial and a linear accent. It generated two options. I liked the first option the best, but felt that the linear element wasn't weighted heavily enough at small sizes. Additionally, I think the placement would look stronger at the top. With that feedback, we landed on the final version.</p>
      <div className={styles.mediaStrip}>
        <div className={`${styles.imgContainer} ${styles.imgContainerSmall}`}>
          <Media caption="Option 1: Rust color linear accent below initial">
            <img
              src="/redesign/favico-2-opt-1.png"
              className={styles.img}
              alt="Initial with a rust color linear accent below"
            />
          </Media>
        </div>
        <div className={`${styles.imgContainer} ${styles.imgContainerSmall}`}>
          <Media caption="Option 2: Ruler-style text">
            <img
              src="/redesign/favico-2-opt-2.png"
              className={styles.img}
              alt="Ruler-style strike through initial; Neutral font color with green background"
            />
          </Media>
        </div>
        <div className={`${styles.imgContainer} ${styles.imgContainerSmall}`}>
          <Media caption="Final version">
            <img
              src="/redesign/favico-final.png"
              className={styles.img}
              alt="Final version; heavily weight rust colored line and initial below to create a 'stamp' effect."
            />
          </Media>
        </div>
      </div>
      <p>To wrap up the homepage design, typography, and favico studies, I had Claude generate a spec sheet and used Figma MCP to import the design into figma.</p>
      <div className={styles.twoColumn}>
        <div className={styles.imgContainer}>
          <Media caption="Claude generated branding spec">
            <img
              src="/redesign/brandspec-full.png"
              className={styles.img}
              alt="Claude generated branding schema; color, typography, favico, and open graph image"
            />
          </Media>
        </div>
        <div className={styles.imgContainer}>
          <iframe width="800" height="450" src="https://embed.figma.com/design/tWVJgkPXamqBERC5Q40M37/Portfolio?node-id=0-1&embed-host=share" />
        </div>
      </div>
      <h3 id="code">Claude Code</h3>
      <p>With the design for the home page finished and basic brand guidelines set, I had Claude Code update my existing site using the design that we built together.</p>
      <h4 id="pros">What Claude did well</h4>
      <ul>
        <li>Claude reused patterns I already established in my codebase well. For example: file organization, class names, using CSS modules.</li>
        <li>At desktop sizes the code output was pixel-perfect with the design</li>
        <li>Having prompted it to use WCAG guidelines, it accounted for basic accessibility requirements.</li>
      </ul>
      <h4 id="cons">Where Claude failed</h4>
      <ul>
        <li>Responsive design. There were some very serious overflow issues with text exceeding containers, scrolling issues, content that overlapped at certain screen sizes.</li>
        <li>Some hallucinated or odd choices in data that claude chose to highlight</li>
        <li>A small amount of superfulous HTML and CSS made the code more complicated than it needed to be. It made troubleshooting overflow issues harder than code I would write myself.</li>
      </ul>
      <h4 id="improve">How can I improve my results?</h4>
      <h5 id="Hypothesis">Hypothesis</h5>
      <p>Going through the course, and speaking with friends and colleagues – the biggest takeaway I've had so far is making sure I am giving enough high quality context to get the results I need.</p>
      <p>With that in mind, I do think there's additional context I could have given that may have gotten me better results.</p>
      <ul>
        <li>I took the simplicity of this website for granted and wasn't explicit about mobile designs: At the design phase, I should have told it to design the website using a mobile first approach. I should have mentioned that the site is responsive and that we will need it to work with varying devices.</li>
        <li>There were choices that seemed obvious to me that the AI did not make without me revising and prompting it to. If they are obvious to me, they should be spelled out in advance either in the brief or in a skill.</li>
        <li>This is a simple portfolio site, and a design system seemed overkill. But, having explicit guidelines and pre-existing components to build from that are already responsive & accessible would have saved me some grief. I might not need a full design system, but I definitely could have used even a starter one like radix (that I eventually incorporated), or tailwind for CSS from the beginning.</li>
      </ul>
      <h5 id="testing">Testing the hypothesis</h5>
    </main>
  );
}
