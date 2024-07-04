import hackathonOne from "../../assets/hackathon-1.webp";
import hackathonTwo from "../../assets/hackathon-2.webp";
import hackathonThree from "../../assets/hackathon-3.webp";

const hackathons = [
  {
    title: "12 Days of Quizmas",
    image: hackathonOne,
    description: (
      <>
        <p>
          Test your knowledge about Christmas traditions, history, songs,
          movies, and more.
        </p>
      </>
    ),
    github: "https://github.com/ogc1231/festive-quiz-game",
    demo: "https://ogc1231.github.io/festive-quiz-game/",
  },
  {
    title: "Fund Frontier",
    image: hackathonTwo,
    description: (
      <>
        <p>
          The Net Present Value (NPV) calculator designed to empower users in
          making informed investment decisions, enabling a comprehensive
          analysis of their financial viability.
        </p>
      </>
    ),
    github: "https://github.com/sean-meade/fund-frontier",
    demo: "https://fund-frontier.vercel.app",
  },
  {
    title: "Cupid's Helpers",
    image: hackathonThree,
    description: (
      <>
        <p>
          A web application that helps users find the perfect gift for their
          loved ones based on their personality and interests.
        </p>
      </>
    ),
    github: "",
    demo: "",
  },
];

export default hackathons;
