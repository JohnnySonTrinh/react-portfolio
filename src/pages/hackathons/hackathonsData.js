import hackathonOne from "../../assets/hackathon-1.webp";
import hackathonTwo from "../../assets/hackathon-2.webp";
import hackathonThree from "../../assets/hackathon-3.webp";

const hackathons = [
  {
    team: "Quizmas Elves",
    title: "12 Days of Quizmas",
    image: hackathonOne,
    description: (
      <>
        <p>
          Frontend developer and UX/UI designer I was responsible for designing
          and implementing the user interface to ensure an engaging and
          intuitive experience for users.
        </p>
        <p className="hover-description">
          This game is designed to test your knowledge about Christmas
          traditions, history, songs, movies, and more. Challenge yourself or
          play with friends and family to see who knows the most about the
          festive season! Multiple-choice questions about various
          Christmas-related topics. Interactive and user-friendly interface.
          Scores and leaderboard to track performance. Levels or difficulty
          settings for different player experiences.
        </p>
      </>
    ),
    github: "https://github.com/ogc1231/festive-quiz-game",
    demo: "https://ogc1231.github.io/festive-quiz-game",
  },
  {
    team: "The Sabersmiths",
    title: "Jedi Blades",
    image: "https://i.imgur.com/a6X3EDW.png",
    description: (
      <>
        <p>
          Fullstack developer with a focus on frontend development and design. I
          played a crucial role in bringing the vision to life and also took the
          role of co-scrum master.
        </p>
        <p className="hover-description">
          This project involves creating a festive quiz game where users can
          test their knowledge about Christmas traditions, history, songs,
          movies, and more.
        </p>
      </>
    ),
    github: "https://github.com/lucia2007/love-letter-generator",
    demo: "https://lucia2007.github.io/love-letter-generator",
  },
  {
    team: "Fund Frontier",
    title: "Fund Frontier",
    image: hackathonTwo,
    description: (
      <>
        <p>
          Frontend developer for the "Fund Frontier" project, I was responsible
          for creating an intuitive and visually appealing user interface.
          Additionally, I contributed to the project's documentation,
          particularly the README.md file.
        </p>
        <p className="hover-description">
          NPV Calculator designed to empower users in making informed investment
          decisions. This program facilitates the evaluation of the Net Present
          Value (NPV) for up to three projects simultaneously, enabling a
          comprehensive analysis of their financial viability. The Net Present
          Value, a crucial financial metric, considers the time value of money
          to assess the profitability of an investment by calculating the
          present value of future cash flows.
        </p>
      </>
    ),
    github: "https://github.com/sean-meade/fund-frontier",
    demo: "https://fund-frontier.vercel.app",
  },
  {
    team: "Health Guardians",
    title: "RemindiCare",
    image: "https://i.imgur.com/P7oIdHM.png",
    description: (
      <>
        <p>
          As the frontend developer and UX/UI designer, utilizing Figma, I
          designed the user interface, emphasizing user experience and
          accessibility. My design process included wireframing, prototyping,
          and conducting user testing to gather feedback and iterate on designs.
        </p>
        <p className="hover-description">
          A Medication Reminder and Tracker app helps patients manage their
          medications, ensuring they take the right doses at the right times.
          This can be crucial for patients with chronic conditions, those on
          complex medication regimens, or elderly patients who might forget to
          take their medications.
        </p>
      </>
    ),
    github: "https://github.com/JohnnySonTrinh/remindicare",
    demo: "https://remindicare-c84864436945.herokuapp.com/",
  },
  {
    team: "Cupid's Helpers",
    title: "Cupid's Quill",
    image: hackathonThree,
    description: (
      <>
        <p>
          A web application that helps users find the perfect gift for their
          loved ones based on their personality and interests.
        </p>
        <p className="hover-description">
          A web application that helps users find the perfect gift for their
          loved ones based on their personality and interests.
        </p>
      </>
    ),
    github: "https://github.com/lucia2007/love-letter-generator",
    demo: "https://lucia2007.github.io/love-letter-generator/",
  },
];

export default hackathons;
