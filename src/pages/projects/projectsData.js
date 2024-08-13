import projectOne from "../../assets/project-1.webp";
import projectTwo from "../../assets/project-2.webp";

const projects = [
  {
    title: "Tic Tac Tactics",
    image: projectOne,
    description: (
      <>
        <p>
          Valorant Tic-Tac-Tactics combines the strategic gameplay of Valorant
          with the simplicity and charm of Tic-Tac-Toe. This project aims to
          provide a fun, engaging, and interactive gaming experience for both
          Valorant enthusiasts and casual gamers alike.
        </p>
        <p className="hover-description">Tech stack: HTML, CSS, JavaScript</p>
      </>
    ),
    github: "https://github.com/JohnnySonTrinh/valorant-tic-tac-tactics",
    live: "https://johnnysontrinh.github.io/valorant-tic-tac-tactics/",
  },
  {
    title: "Star Review",
    image:
      "https://github.com/JohnnySonTrinh/review-app/raw/main/documentation/update-mockup.png",
    description: (
      <>
        <p>
          Star Review is the ultimate platform for developers to collaborate,
          review, and enhance code quality through seamless peer feedback.
          Whether you're a beginner seeking guidance or an experienced coder
          looking to refine your skills.
        </p>
        <p className="hover-description">Tech stack: HTML, CSS, JavaScript</p>
      </>
    ),
    github: "https://github.com/JohnnySonTrinh/review-api",
    live: "https://star-review-app-fb4aac8cda63.herokuapp.com",
  },

  {
    title: "Coach Profile",
    image: projectTwo,
    description: (
      <>
        <p>
          This project is more than just a portfolio; it's a vibrant showcase of
          gaming passion, skills, and experiences.
        </p>
        <p className="hover-description">Tech stack: HTML, CSS, JavaScript</p>
      </>
    ),
    github: "https://github.com/JohnnySonTrinh/a-gamers-portfolio-site",
    live: "https://johnnysontrinh.github.io/a-gamers-portfolio-site",
  },
  {
    title: "Snake",
    image:
      "https://raw.githubusercontent.com/JohnnySonTrinh/snake-game/main/documentation/mockup.png",
    description: (
      <>
        <p>
          Snake game implemented in Python. which runs in mock terminal on
          Heroku. The games features a fun and interactive rendition of the
          classic snake game we all know and love.
        </p>
        <p className="hover-description">Tech stack: HTML, CSS, JavaScript</p>
      </>
    ),
    github: "https://github.com/JohnnySonTrinh/snake-game",
    live: "https://snake-eat-food-game-b47e36d72bf2.herokuapp.com",
  },
  {
    title: "eBuddies",
    image:
      "https://github.com/JohnnySonTrinh/ebuddies/raw/main/documentation/mockup.png",
    description: (
      <>
        <p>
          Community platform designed to connect gamers with shared interests
          and hobbies. Our mission is to create a welcoming space where users
          can find and interact with like-minded peers, share experiences, and
          build meaningful connections.
        </p>
        <p className="hover-description">Tech stack: HTML, CSS, JavaScript</p>
      </>
    ),
    github: "https://github.com/JohnnySonTrinh/ebuddies",
    live: "https://ebuddies-42967ce5447d.herokuapp.com",
  },
  {
    title: "Portfolio",
    image: "https://i.imgur.com/uSr4R1c.png",
    description: (
      <>
        <p>
          Personal portfolio site designed to showcase my projects, skills, and
          experiences. This project serves as a digital resume and interactive
          platform for potential employers and collaborators.
        </p>
        <p className="hover-description">Tech stack: HTML, CSS, JavaScript</p>
      </>
    ),
    github: "https://github.com/JohnnySonTrinh/react-portfolio",
    live: "https:/johnnytrinh.se",
  },
];

export default projects;
