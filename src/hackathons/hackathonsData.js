import hackathonOne from "../assets/hackathon-1.webp"
import hackathonTwo from "../assets/hackathon-2.webp"

const hackathons = {
  1: {
    title: "TEAM: Quizmas Elves",
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
    Demo: "https://ogc1231.github.io/festive-quiz-game/",
  },
  2: {
    title: "TEAM: Fund Frontier",
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
    Demo: "https://fund-frontier.vercel.app",
  },
}

export default hackathons
