import { LoConsumer } from "./LearningObjectiveProvider";

const MobileMenu = () => (
  // if hidden
  // display: none;

  <LoConsumer>
    {({ state }) => (
      <div className={state.mobileMenu ? `mobile-menu-hidden` : `mobile-menu`}>
        <p>Steps to Success help you achieve your learning objective.</p>
        <br />
        <ol>
          <li>Type in your learning objective.</li>
          <li>Record your steps to success. </li>
          <li>Do your writing.</li>
          <li>When finished, tick the steps you have achieved.</li>
        </ol>
<p>          
            Edit a step by saying, 'Change step...' and the number of the step.
          </p>
        <style jsx>{`
          p {
            margin-bottom: 20px;
          }

          li {
            margin-left: 20px;
          }

          .mobile-menu {
            padding: 20px;
            background-color: #fff;
            box-shadow: 0 2px 0 0 rgba(0, 161, 218, 0.004),
              0 4px 3px 0 rgba(0, 0, 0, 0.1);
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            -webkit-flex-direction: column;
            -ms-flex-direction: column;
            flex-direction: column;
            height: calc(100vh - 50px);
            width: 100%;
            overflow-y: auto;
            position: fixed;
            right: 0;
            z-index: 1000;
          }

          .mobile-menu-hidden {
            display: none;
          }
        `}</style>
      </div>
    )}
  </LoConsumer>
);

export default MobileMenu;
