import astronautHelmet from "../../assets/astronaut-helmet.png";
import deadEye from "../../assets/dead-eye.png";
import stack from "../../assets/stack.png";
import global from "../../assets/global.png";
import envelope from "../../assets/envelope.png";

// Navigation data array containing information about each navigation item
const navData = [
  {
    to: "/",
    imgSrc: astronautHelmet,
    altText: "astronaut helmet icon",
    navClass: "nav-about",
    title: "ABOUT",
  },
  {
    to: "/skills",
    imgSrc: deadEye,
    altText: "deadEye icon",
    navClass: "nav-skills",
    title: "SKILLS",
  },
  {
    to: "/projects",
    imgSrc: stack,
    altText: "stack icon",
    navClass: "nav-projects",
    title: "PROJECTS",
  },
  {
    to: "/hackathons",
    imgSrc: global,
    altText: "global icon",
    navClass: "nav-hackathons",
    title: "HACKATHONS",
  },
  {
    to: "/contact",
    imgSrc: envelope,
    altText: "envelope icon",
    navClass: "nav-contact",
    title: "CONTACT",
  },
  {
    to: "/skilltree",
    imgSrc: deadEye,
    altText: "deadEye Icon",
    navClass: "nav-contact",
    title: "Tree",
  },
];

export default navData;
