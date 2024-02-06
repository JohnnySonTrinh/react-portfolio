# [PORTFOLIO](https://react-portfolio-wine-six.vercel.app/)

![Landing page](https://i.imgur.com/uSr4R1c.png)

Halo theme portfolio, using DALL·E to create amazing AI-generated art assets and Avatar then using Midjourney and the Picsi.AI by InsightFaceSwap Bot to face swap, react useState hooks, dynamic background, build modern website designs with CSS3, ClassNames to create dynamic class names, and create a secure fully functional Direct form submission using EmailJS.

## UX

### Colors Scheme

I used [coolors.co](https://coolors.co/540351-3627b1-25afce) to generate my colour palette.

![Add Project](https://i.imgur.com/OkDzIWE.png)

```css
/* Root Variables */
:root {
  --purple: #540351;
  --blue: #3627b1;
  --cyan: #25afce;
  /* Commonly used CSS properties for consistency */
  --transparent: #00000000;
  --radius-left: 3rem 0 0 3rem;
  --radius-right: 0 3rem 3rem 0;
}
```

### Typography

For the portfolio, I've chosen Russo One fonts to create "Mass effect vibe" engaging and readable user interface. The fonts were selected for their clarity and legibility.

#### Implementation in CSS

The fonts are included at the beginning of our main CSS file using the `@import` rule from Google Fonts. This method ensures that the fonts are available as soon as the CSS is loaded, maintaining a consistent typographic experience throughout portfolio.

```css
/* Importing Google Fonts */
@import url("https://fonts.googleapis.com/css2?family=Russo+One&display=swap");
```

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

## Features

### Landing Page

The landing page presents a dynamic and visually compelling interface, designed to showcase the professional profile

![screenshot](https://i.imgur.com/oVrc3gT.png)

### Skills

The skills are displayed in a split format, with a unique visual metaphor that borrows from the skill trees commonly found in video games, reinforcing the user's gaming background.

![screenshot](https://i.imgur.com/BzrqtkD.png)

### Projects

Projects page is a thoughtful fusion of personal interests and professional showcase, geared towards engaging the viewer with both visual appeal and interactive elements.

![screenshot](https://i.imgur.com/VVetZh1.png)

### Hackathons

Maintains the cosmic theme established throughout the site, which complements the forward-thinking and innovative spirit of hackathons. It's a testament involvement in collaborative and competitive coding events.

![screenshot](https://i.imgur.com/FzUikpk.png)

### Contact

Contact page is a fusion of functionality and thematic design, offering a straightforward user experience without sacrificing the portfolio's overarching aesthetic.

![screenshot](https://i.imgur.com/fiTaATW.png)

## TESTING

## Lighthouse Audit

I've tested my deployed project using the Lighthouse Audit tool to check for any major issues.

| Page       | Mobile                                         | Desktop                                        | Notes                                                                                                                                                                                               |
| ---------- | ---------------------------------------------- | ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Home       | ![screenshot](https://i.imgur.com/tY3vePH.png) | ![screenshot](https://i.imgur.com/0qDj0XX.png) | The performance is solid across devices; however, consider revising SEO strategies to improve visibility. No PWA implementation noted.                                                              |
| Skills     | ![screenshot](https://i.imgur.com/4NbyHSC.png) | ![screenshot](https://i.imgur.com/lVGytbd.png) | Desktop Best Practices indicate an image optimization issue. Review image formats and sizes for improvements.                                                                                       |
| Projects   | ![screenshot](https://i.imgur.com/e6BtHGm.png) | ![screenshot](https://i.imgur.com/VJqNpTP.png) | Consistent performance with other pages, minor SEO and Best Practices warnings suggest room for refinement.                                                                                         |
| Hackathons | ![screenshot](https://i.imgur.com/Q8LnA8B.png) | ![screenshot](https://i.imgur.com/URzaSrx.png) | Scores are consistent with minor warnings; assess details to perfect these metrics.                                                                                                                 |
| Contact    | ![screenshot](https://i.imgur.com/KgiYYas.png) | ![screenshot](https://i.imgur.com/KgiYYas.png) | Excellent performance on mobile; desktop SEO and Best Practices could be improved following the same suggestions as other pages. Note 'asd' appears out of context, needs clarification or removal. |

## Credits

I am grateful for the various resources and individuals who contributed to the successful completion of this project:

### Content

- **[webdecoded](https://youtu.be/hYv6BM2fWd8?si=F-GU1qYnUUM0vYBJ)** inspiration from **webdecoded** youtbue channel how to build personalize portfolio.

- **[Howfinity](https://youtu.be/LkjmwuP7Z1Q?si=SFNeGS-NrG57zppR)** Midjourney and the Picsi.AI by InsightFaceSwap Bot to face swap.
