import { createFileRoute } from '@tanstack/react-router';
import styles from './index.module.css';
import { Media } from '@/routes/-components/media/media';

export const Route = createFileRoute('/experiments/trans/')({
  component: TransPage,
  staticData: {
    title: 'Transbucket User Experience'
  }
});

function TransPage() {
    return (
        <main>
            <div className={styles.info}>
                <div><strong>Work in progress</strong></div>
                <div>This is a living document</div>
            </div>
            <h2>Transbucket User Experience</h2>
            <p><a href="https://www.transbucket.com/" target="_blank" rel="noopener noreferrer">Transbucket</a> is a community-driven website for sharing surgical outcomes for gender affirming care. The lights have been kept on at transbucket for many years, but it's a volunteer-led effort and it has not had a UX focused engineer working on it for many years. As a result, the user experience has gotten significantly outdated.</p>
            <h3>Current state</h3>
            <ul>
                <li>Ruby on rails - actively being updated by maintainer, but several years out of date</li>
                <li>Ad-driven revenue to pay for hosting</li>
                <li>Volunteer-led initiatives</li>
                <li>Largely maintained by engineers with deep backend experience</li>
                <li>User interface uses bootstrap and is loaded via Rails</li>
                <li>Internationalization is supported via URL</li>
                <li>Unit tests are backend driven, but exist</li>
                <li>Frontend and backend are tightly coupled</li>
                <li>Lack of repeatable components, only using CSS library to style elements</li>
                <li>Deployed in heroku</li>
            </ul>
            <h4>User Painpoints</h4>
            <ul>
                <li>Ads hijack screen</li>
                <li>Navigation can be confusing</li>
                <li>Limited support for mobile devices</li>
                <li>Accessibility features not consistently applied</li>
                <li>Some features no longer working</li>
            </ul>
            <h3>Legacy applications in transition</h3>
            <p>Working with legacy applications, the immediate challenge is figuring out how to integrate frontend changes in a way that is sustainable. One thing that has held true over the years I've spent migrating legacy applications, is that no two solutions are exactly the same.</p>
            <h4>Challenges and Considerations</h4>
            <ul>
                <li><strong>Finding maintainers</strong> - It's easier to find volunteers for work that supports resumes & careers. This means using modern technology. A junior engineer is less likley to contribute to an outdated rails project.</li>
                <li><strong>Maintainability</strong> - Building a system that is realistically maintainable without being overwhelming takes thought. Reducing code duplication and overhead is essential.</li>
                <li><strong>Backend-frontend collaboration</strong> - Building a system where backend engineers feel comfortable contributing to frontend challenges.</li>
                <li><strong>Deployment infrastructure</strong> - There's currently a single pipeline for the application and no defined separation for frontend and backend.</li>
            </ul>
            <h4>Working within constraints</h4>
            <div>There are a couple of decisions I made early on. The first was to prioritize introducing a <strong>design system</strong> estabilishing a consistent visual language and reusable components. A design system provides answers for several challenges:
                <ul>
                    <li>Future updates are constrained to a single component rather than 20-30 pages of duplicative instances.</li>
                    <li>Clearer contribution models. New developers have a base to build from that we've already established meets standards semantically and visually.</li>
                    <li>Introducing visual and accessibility testing to better serve the user base.</li>
                    <li>Documentation unlocks AI-assisted development. Reduces AI hallucinations and ensures standards are applied consistently within the codebase.</li>
                </ul>
            </div>
            <p>The second decision is that, initially, we will put aside creating different microservices for the backend and frontend. The benefits of getting updates to users quickly vastly outweigh the advantage of modernizing the CICD pipeline for transbucket, while nice to have, it is not something users will see immediate benefits from. It would also necessitate large changes to authentication.</p>
            <h3>Design System & AI Integration</h3>
            <p>Creating a design system required inventorying all existing components. One thing transbucket does relatively well is design consistency. Pages may not have had the most modern design, but the design is consistent. This made breaking down the screens we were supporting relatively straightforward – for example, the procedure listing page is nearly identical to a surgeon listing page outside of the data displayed. Transbucket largely consists of tabular data and lists, pinterest-style grids, forms to upload data about a procedure, and detail pages with comments and ratings. This is in addition to the usual pages you'd see in any content-restricted application (authentication, profile management, etc).</p>
            <p>Broadly, our components fell into the following categories: forms, features, data, navigation, and overlays.</p>
            <div className={styles.imgContainer}>
                <Media caption="Design system documentation in storybook">
                    <img
                    src="/transbucket/storybook.png"
                    className={styles.img}
                    alt="Comment group component documentation"
                    />
                </Media>
            </div>
            <h4>Tooling</h4>
            <p>Rapid development and AI integration were given high priority when compared to choices I would potentially make for brand identity and intellectual property at an enterprise business – a case where spending the time rolling your own components from the ground up can sometimes be a better investment. The goal of our design system is to create an MCP and skills an agent can interact with to rapidly develop pages without losing quality. Because this is a site used by the general public it's very important to maintain accessibility standards and cover a wide range of devices. These are things that are easy to slip when focused on feature development and when you are lacking reusable patterns.</p>
            <ul>
                <li>DTCG (Design tokens community group) JSON schema</li>
                <li>Terazzo to integrate tokens with other tools such as storybook and tailwind</li>
                <li>Tailwind for rapid prototyping, machine-readable styles</li>
                <li>React Aria for unstyled, base, accessible components</li>
                <li>Storybook for component documentation</li>
                <li>Chromatic for visual regression testing</li>
                <li>Google's modern web guidance skills</li>
            </ul>
            <h3>Design & Development</h3>
            <h4>Registration</h4>
            <div>
                <p>In addition to typical user data, transbucket collects sensitive data about healthcare procedures and relevant info. I wanted to bring more clarity to how data is used in the registration process. Especially data collected about gender and pronouns which are required at registration.</p>
                <div>Some subtle changes to how information is presented during registration include:
                    <ul>
                        <li>Consolidating the list of pronouns to common defaults - other pronouns can be entered as custom
                            <ul>
                                <li>Language support. Consolidating the list of pronouns to ones that have translations in most languages means that users who speak languages other than english are still included and respected in community discussions.</li>
                                <li>Users can still provide custom strings to describe pronouns when theirs are not covered default options</li>
                                <li>There is an inclusivity tradeoff that happens with the lack of specificity. We increase access in other languages, but it does come at the cost of representation of niche identities.</li>
                            </ul>
                        </li>
                        <li>Adding more hierarchal visual cues for important information. For example, rules for healthcare providers.</li>
                        <li>Providing more in depth descriptions on exactly how gender and pronouns are used in accordions without cluttering the screen.</li>
                        <li>Copy changes to increase brevity reduce mental load.</li>
                        <li>Explicitly have users accept the terms of agreement and attest to reading the privacy policy for better compliance with GDPR and aligning with the larger committment to prioritize user privacy and consent.</li>
                    </ul>
                </div>
            </div>
            <div className={styles.twoColumn}>
                <div className={styles.imgContainer}>
                    <Media caption="Registration before">
                        <img
                        src="/transbucket/registration_before.png"
                        className={styles.img}
                        alt="original registration screen"
                        />
                    </Media>
                </div>
                <div className={styles.imgContainer}>
                    <Media caption="Registration redesign">
                        <img
                        src="/transbucket/registration_after.png"
                        className={styles.img}
                        alt="redesigned registration screen"
                        />
                    </Media>
                </div>
            </div>
            <h4>Login</h4>
            <p>The login screen largely remained the same, but prioritizes responsive design for compatability with mobile devices.</p>
            <div className={styles.twoColumn}>
                <div className={styles.imgContainer}>
                    <Media caption="Login before (Mobile)">
                        <img
                        src="/transbucket/login_mobile_before.png"
                        className={styles.img}
                        alt="login screen before redesign on mobile device"
                        />
                    </Media>
                </div>
                <div className={styles.imgContainer}>
                    <Media caption="Login redesign (Mobile)">
                        <img
                        src="/transbucket/login_mobile_after.png"
                        className={styles.img}
                        alt="login screen after redesign on mobile device"
                        />
                    </Media>
                </div>
            </div>
            <div className={styles.twoColumn}>
                <div className={styles.imgContainer}>
                    <Media caption="Login before">
                        <img
                        src="/transbucket/login_before.png"
                        className={styles.img}
                        alt="login screen before redesign"
                        />
                    </Media>
                </div>
                <div className={styles.imgContainer}>
                    <Media caption="Login redesign">
                        <img
                        src="/transbucket/login_after.png"
                        className={styles.img}
                        alt="login screen after redesign"
                        />
                    </Media>
                </div>
            </div>
            <h4>Internationalization</h4>
            <p>Of the sixteen languages that Transbucket currently supports, Arabic is the only right-to-left language. The existing site does translation, but it has no right-to-left support. Using tailwind and react-aria allowed for a smoother experience and paves the way for supporting other languages with similar demands.</p>
            <div className={styles.imgContainer}>
                <Media caption="Right-to-left support">
                    <img
                    src="/transbucket/rtl_support.png"
                    className={styles.img}
                    alt="RTL support for arabic"
                    />
                </Media>
            </div>
            <h4>Accessibility</h4>
            <p>Acessibility features are baked into design system components. When a feature is shipped, we can depend on colors that were already tested for contrast, keyboard navigable forms and interactive elements, ability to skip redundant information in screen readers, and so on.</p>
            <div className={styles.imgContainer}>
                <Media caption="Keyboard accessibility testing of registration flow">
                    <video autoPlay loop muted playsInline width="600">
                        <source src="/transbucket/accessibility.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </Media>
            </div>
        </main>
    );
}