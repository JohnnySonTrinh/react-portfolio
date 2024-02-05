# [PORTFOLIO](https://react-portfolio-wine-six.vercel.app/)

![Landing page](https://i.imgur.com/4z276Ex.png)

Mass Effect theme portfolio, using Lexica.art to create amazing AI-generated art assets and Avatar from a reference picture, react useState hooks, dynamic background, build modern website designs with CSS3, ClassNames to create dynamic class names, and create a secure fully functional Direct form submission using EmailJS.

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

## Features

### Landing Page

The landing page presents a dynamic and visually compelling interface, designed to showcase the professional profile

![screenshot](https://i.imgur.com/4z276Ex.png)

### Skills

The skills are displayed in a split format, with a unique visual metaphor that borrows from the skill trees commonly found in video games, reinforcing the user's gaming background.

![screenshot](https://i.imgur.com/greyOIo.png)

### Projects

Projects page is a thoughtful fusion of personal interests and professional showcase, geared towards engaging the viewer with both visual appeal and interactive elements.

![screenshot](https://i.imgur.com/hJdfLDY.png)

### Contact

Contact page is a fusion of functionality and thematic design, offering a straightforward user experience without sacrificing the portfolio's overarching aesthetic.

![screenshot](https://i.imgur.com/P6SgMIO.png)
