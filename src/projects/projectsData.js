// Importing necessary modules and assets
import projectOne from "../assets/project-1.webp" // Project 1 image
import projectTwo from "../assets/project-2.webp" // Project 2 image
import projectThree from "../assets/project-3.webp" // Project 3 image

// function to get the projects data
const projects = {
  1: {
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
      </>
    ),
    github: "https://github.com/JohnnySonTrinh/valorant-tic-tac-tactics",
    live: "https://johnnysontrinh.github.io/valorant-tic-tac-tactics/",
  },
  2: {
    title: "Coach Profile",
    image: projectTwo,
    description: (
      <>
        <p>
          This project is more than just a portfolio; it's a vibrant showcase of
          gaming passion, skills, and experiences.
        </p>
      </>
    ),
    github: "https://github.com/JohnnySonTrinh/a-gamers-portfolio-site",
    live: "https://johnnysontrinh.github.io/a-gamers-portfolio-site",
  },
  3: {
    title: "Event App",
    image: projectThree,
    description: (
      <>
        <p>
          Book and learn helpful tips from 3,168+ mentors in world-class
          companies with our global community.
        </p>
      </>
    ),
    github: "https://github.com/JohnnySonTrinh/modern-car-showcase-app",
    live: "https://event-app-pink-eight.vercel.app/",
  },
}

// Exporting the projects data
export default projects
