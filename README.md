# [Johnny Trinh - Full-Stack Developer Portfolio](https://johnnytrinh.se)

![Mockup](documentation/readme/mockup.png)

This portfolio showcases my skills and experience as a full-stack developer, blending a visually engaging design with a focus on accessibility and modern web development techniques. The theme draws inspiration from the Halo universe, creating a unique and memorable user experience.

## Updates

<details>
<summary> Click here for detailed version 2 updates </summary>
-----

> [!NOTE]  
> Old README.md [README.md](/documentation/oldREADME.md) file.

### All Updates

- **Re-designing Skill Tree**: Removed the skill bars and added a more up-to-date, interactive Skill Tree.
- **Enhanced Icons**: Implemented the Devicon Library to ensure sleekness and consistency in skill icons.
- **Data Overhaul**: Updated and refined all project, skill, and profile data.
- **Added Animations**: Smooth animations on all pages create a more dynamic user experience.
- **Project and Hackathon Pages**: Updated with new projects to provide evidence of contributions.
- **Code Refactor**: Improved code structure to be more readable and maintainable.
- **Performance Insights**: Integrated SpeedInsights for further detailed analysis on website performance.
- **CSS Improvements**: Updated and added CSS Root Variables to clean up the styling and make it more scalable.
- **React Functional Components**: Removed all the React classes in favor of hooks to modernize the codebase.
- **Keyboard Navigation**: Implemented full keyboard navigation by Tab, Shift+Tab, and Enter to improve accessibility.
- **Scroll Wheel Navigation**: Implemented scroll wheel functionality for smooth navigation through categories, projects, and hackathons.
- **404 Page**: Added a fully interactive and animated 404 page with WebGL effects and music for a creative "lost in space" experience.
- **Dynamic Meta Titles**: Introduced per-page dynamic meta title updates for better SEO and improved user experience.
- **Background Enhancements**: Updated background with a green gradient transition effect, elevating the visual appeal.
- **Utility Hooks**: Centralized repeated logic such as meta title updates and scroll handlers into reusable custom hooks for a more maintainable codebase.

### Updated version VS Old version

| Updates            | New version                                            | Old version                                            |
| ------------------ | ------------------------------------------------------ | ------------------------------------------------------ |
| About/Landing Page | ![screenshot](documentation/readme/new-about.png)      | ![screenshot](documentation/readme/old-about.png)      |
| Skills Page        | ![screenshot](documentation/readme/new-skills.png)     | ![screenshot](documentation/readme/old-skills.png)     |
| Projects Page      | ![screenshot](documentation/readme/new-projects.png)   | ![screenshot](documentation/readme/old-projects.png)   |
| Hackathons Page    | ![screenshot](documentation/readme/new-hackathons.png) | ![screenshot](documentation/readme/old-hackathons.png) |
| Contact Page       | ![screenshot](documentation/readme/new-contact.png)    | ![screenshot](documentation/readme/old-contact.png)    |

</details>

### Stats

[![GitHub commit activity](https://img.shields.io/github/commit-activity/t/JohnnySonTrinh/react-portfolio)](https://github.com/JohnnySonTrinh/react-portfolio/commits/main)
[![GitHub last commit](https://img.shields.io/github/last-commit/JohnnySonTrinh/react-portfolio)](https://github.com/JohnnySonTrinh/react-portfolio/commits/main)
[![GitHub repo size](https://img.shields.io/github/repo-size/JohnnySonTrinh/react-portfolio)](https://github.com/JohnnySonTrinh/react-portfolio)

## Key Features

- **AI-Generated Art Assets:** Leveraging DALL-E, Midjourney, and Picsi.AI, I created custom avatars and visual elements, enhancing the portfolio's aesthetic appeal.
- **Responsive Design:** Built with CSS3 and designed for optimal viewing across various devices and screen sizes.
- **React.js Framework:** Developed using React.js, utilizing functional components and hooks for efficient and maintainable code.
- **Smooth Navigation:** Intuitive navigation employing smooth scrolling, keyboard navigation (Tab, Shift+Tab, Enter), and mouse wheel support for seamless transitions between sections.
- **Accessibility:** Prioritized accessibility with careful consideration of ARIA attributes and keyboard navigation for all users.
- **Interactive Elements:** Engaging animations and interactive elements enhance the overall user experience.
- **Dynamic Meta Titles:** SEO-optimized, dynamic meta titles update for each page.
- **Contact Form:** A secure contact form powered by EmailJS allows for quick and easy communication.
- **Custom Hooks:** Reusable custom hooks centralize and streamline common logic for improved code maintainability.
- **Creative 404 Page:** A unique and engaging 404 page adds a touch of personality and guides users back to the main site.

## Tools & Technologies Used

- [HTML](https://en.wikipedia.org/wiki/HTML) used for the main site content.
- [CSS](https://en.wikipedia.org/wiki/CSS) used for the main site design and layout.
- [CSS :root variables](https://www.w3schools.com/css/css3_variables.asp) used for reusable styles throughout the site.
- [JavaScript](https://www.javascript.com) used for user interaction on the site.
- [React](https://react.dev) used for web and native user interfaces
- [Git](https://git-scm.com) used for version control. (`git add`, `git commit`, `git push`)
- [GitHub](https://github.com) used for secure online code storage.
- [Vercel](https://pages.github.com) used for hosting the deployed front-end site.
- [EmailJS](https://www.emailjs.com) create a secure fully functional Direct form submission.
- [Discord](https://discord.com) used for connect face swap and create image.
- [Midjourney](https://www.midjourney.com/home?callbackUrl=%2Fexplore) used as middle-man to face swap.
- [Picsi.AI](https://www.picsi.ai) used for face swap avatar.
- [DALL·E](https://openai.com/dall-e-3) used for crate avatar and icons.
- [Devicon](https://devicon.dev) used icon for skills page

## Project Structure

The project follows a well-organized structure, promoting maintainability and scalability:

```
├── .gitignore
├── README.md
├── documentation
    ├── oldREADME.md
    └── readme
    │   ├── mockup.png
    │   ├── new-about.png
    │   ├── new-contact.png
    │   ├── new-hackathons.png
    │   ├── new-notfound.png
    │   ├── new-projects.png
    │   ├── new-skills.png
    │   ├── old-about.png
    │   ├── old-contact.png
    │   ├── old-hackathons.png
    │   ├── old-projects.png
    │   └── old-skills.png
├── package-lock.json
├── package.json
├── public
    ├── favicon.ico
    ├── index.html
    └── robots.txt
├── src
    ├── App.js
    ├── api
    │   └── openai.js
    ├── assets
    │   ├── astronaut-helmet.png
    │   ├── avatar-image.png
    │   ├── avatar-image.webp
    │   ├── background-transition.mp4
    │   ├── bg-universe.mp4
    │   ├── dead-eye.png
    │   ├── eagle-emblem.png
    │   ├── envelope.png
    │   ├── fallback-image.webp
    │   ├── github.png
    │   ├── global.png
    │   ├── hawk-emblem.png
    │   ├── linkedin.png
    │   ├── moebius-triangle.png
    │   ├── robot-bot.png
    │   ├── stack.png
    │   ├── the-uprising.mp3
    │   ├── triple-corn.png
    │   └── upgrade.png
    ├── components
    │   ├── avatar
    │   │   └── Avatar.jsx
    │   ├── background
    │   │   └── Background.jsx
    │   ├── music
    │   │   └── MusicPlayer.jsx
    │   ├── nav
    │   │   ├── HamburgerMenu.jsx
    │   │   ├── Nav.jsx
    │   │   └── NavMenu.jsx
    │   ├── playerStats
    │   │   └── PlayerStats.jsx
    │   └── shadowOverlay
    │   │   └── ShadowOverlay.jsx
    ├── data
    │   ├── chatData.js
    │   ├── hackathonsData.js
    │   ├── navData.js
    │   ├── pageTitles.js
    │   ├── projectsData.js
    │   ├── skillsData.js
    │   └── subheadingsData.js
    ├── hooks
    │   ├── useAbout.js
    │   ├── useActiveProject.js
    │   ├── useAvatar.js
    │   ├── useChatbot.js
    │   ├── useChatbotUI.js
    │   ├── useContactForm.js
    │   ├── useEmailGate.js
    │   ├── useMetaTitle.js
    │   ├── usePlayerStats.js
    │   ├── useSkills.js
    │   └── useWebGLAninimation.js
    ├── index.js
    ├── pages
    │   ├── 404page
    │   │   ├── NotFound.jsx
    │   │   └── NotFoundMenu.jsx
    │   ├── about
    │   │   ├── About.jsx
    │   │   ├── AboutMenu.jsx
    │   │   ├── AboutMenuItems.jsx
    │   │   └── AboutSubheading.jsx
    │   ├── chatbot
    │   │   ├── Chatbot.jsx
    │   │   ├── ChatbotMenu.jsx
    │   │   └── EmailGate.jsx
    │   ├── contact
    │   │   ├── Contact.jsx
    │   │   └── ContactMenu.jsx
    │   ├── hackathons
    │   │   ├── Hackathons.jsx
    │   │   └── HackathonsMenu.jsx
    │   ├── projects
    │   │   ├── Projects.jsx
    │   │   └── ProjectsMenu.jsx
    │   └── skills
    │   │   ├── Skills.jsx
    │   │   └── SkillsMenu.jsx
    ├── reportWebVitals.js
    ├── setupTests.js
    ├── styles
    │   ├── ShadowOverlay.css
    │   ├── aboutMenu.css
    │   ├── app.css
    │   ├── avatar.css
    │   ├── background.css
    │   ├── chatbot.css
    │   ├── contact.css
    │   ├── nav.css
    │   ├── notFound.css
    │   ├── playerStats.css
    │   ├── projects.css
    │   └── skillsMenu.css
    └── utils
    │   ├── calculateAge.js
    │   ├── handleProjectWheel.js
    │   ├── handleWheelScroll.js
    │   └── updateMetaTitle.js
└── vercel.json
```

## Installation and Setup

1. **Clone the repository:** `git clone <repository_url>`
2. **Navigate to the project directory:** `cd react-portfolio`
3. **Install dependencies:** `npm install`
4. **Start the development server:** `npm start`

This will start the application in development mode. You can then view the portfolio in your web browser.

**Note:** You will need to set environment variables (`.env.local`) for EmailJS to function correctly. Refer to the EmailJS documentation for setup instructions.

## Features: Detailed Overview

### About/Landing Page

This section provides a concise yet compelling introduction to my background and skills. The design is clean and visually appealing, immediately engaging the visitor. The avatar features a subtle fade-in animation.

![screenshot](documentation/readme/new-about.png)

### Skills Section

The skills section uses a visually appealing skill tree metaphor, enhancing engagement and providing a unique way to present my proficiencies. Clicking on a skill category triggers a smooth transition and animation.

![screenshot](documentation/readme/new-skills.png)

### Projects and Hackathons Sections

These sections showcase a selection of my projects and hackathon contributions. Each project/hackathon includes:

- A high-quality image.
- A concise description.
- A list of technologies used.
- Links to the GitHub repository and live demo (if available).

Navigation between projects/hackathons is smooth and intuitive, thanks to integrated mouse wheel scrolling and arrow buttons, providing a user-friendly experience.

![Projects Page Screenshot](documentation/readme/new-projects.png)
![Hackathons Page Screenshot](documentation/readme/new-hackathons.png)

### Contact Section

The contact section features a clean and simple form with built-in validation to ensure accuracy. The submission is handled securely via EmailJS. A success message confirms successful submission.

![Contact Page Screenshot](documentation/readme/new-contact.png)

### 404 Page

The custom 404 page provides a memorable and engaging experience when a user encounters a broken link, using WebGL to create a dynamic, animated background, enhanced by background music that activates when the central blob is clicked.

![404 Page Screenshot](documentation/readme/new-notfound.png)

## Contact

You can reach me at [your email address] or connect with me on [LinkedIn](https://www.linkedin.com/in/johnny-trinh-dev/) and [GitHub](https://github.com/JohnnySonTrinh).

## Credits

I am grateful for the variety of resources and people that gave me feedback for how to improve to version 2 to the successful completion of this project!
