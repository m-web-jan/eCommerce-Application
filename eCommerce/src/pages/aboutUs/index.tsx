import { About, Courses, PersonalInfo } from './style';

export const AboutPage = () => {
  return (
    <About>
      <PersonalInfo>
        <div className="content">
          <h3>Hello, I’m</h3>
          <h2>Mark Lis</h2>
          <h3>
            And I’m a Front-End <span>Developer</span>
          </h3>
          <p>
            I'm 19 years old, living in Brest, and currently finishing college with a major in
            Business and Law, specializing in Software Development for Information Technologies.
          </p>
          <a href="https://github.com/m-web-jan" target="_blank">
            GitHub
          </a>
        </div>
        <img src="../images/personalImg.png" alt="myImg" />
      </PersonalInfo>
      <Courses>
        <div className="row">
          <p>Courses</p>
          <a href="https://rs.school/" target='_blank'>
          <img src="../images/logo-rsschool.png" alt="rsschoolLogo" />
          </a>
        </div>
        <div className="row">
          <p>2023-2024</p>
          <p>RSSchool</p>
          <p>JavaScript/Front-end 2023Q4</p>
        </div>
        <h2>
          The application leverages the exceptional Commercetools service, providing the backend and
          API support for developing various commercial start-ups.
        </h2>
        <ul>
          <p>To boost development efficiency, I employed the following tools:</p>
          <li>Work coordination and progress tracking were managed using Jira.</li>
          <li>The project was built with REACT, Redux, and TypeScript.</li>
          <li>Styled-components library was utilized for styling the application.</li>
          <li>Vite was chosen as the bundler for the project, preferred over the more traditional Webpack.</li>
          <li>ESLint with the Airbnb configuration and Prettier were used for linting and formatting automation.</li>
          <li>The React-toastify library was implemented to display pop-up notifications.</li>
        </ul>
      </Courses>
    </About>
  );
};
