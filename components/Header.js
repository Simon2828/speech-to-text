import Link from "next/link";
import { LoConsumer } from "./LearningObjectiveProvider";

const linkStyle = {
  marginLeft: "auto"
};

const Header = ({ toggleMenu }) => (
  <div className="flex">
    <Link href="/">
      <a>Steps To Success</a>
    </Link>
    <div style={linkStyle}>
    <LoConsumer>
      {({ toggleMenu, state }) => {
        return (
          <div>
          {state.mobileMenu && (
            <div
            className="hamburger-menu"
            onClick={toggleMenu}
            >
                <svg
                  viewBox="0 0 50 50"
                  version="1.1"
                  width="25px"
                  height="25px"
                  >
                  <g id="surface1">
                    <path d="M 0 7.5 L 0 12.5 L 50 12.5 L 50 7.5 Z M 0 22.5 L 0 27.5 L 50 27.5 L 50 22.5 Z M 0 37.5 L 0 42.5 L 50 42.5 L 50 37.5 Z " />
                  </g>
                </svg>
              </div>
            )}
            {!state.mobileMenu && (
              <div
              className="hamburger-menu"
              onClick={toggleMenu}
              style={linkStyle}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 50 50"
                  version="1.1"
                  width="25px"
                  height="25px"
                  >
                  <g id="surface1">
                    <path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z " />
                  </g>
                </svg>
              </div>
            )}
          </div>
        );
      }}
    </LoConsumer>
    </div>
    <style jsx>{`
      a {
        margin-left: 20px;
      }

      .hamburger-menu {
        margin-right: 20px;
      }

      .hamburger-menu:hover {
        cursor: pointer;
      }

      .flex {
        display: flex;
        background-color: rgb(255, 229, 100, 0.3);
        border-bottom: rgb(255, 229, 100, 1) 3px solid;
        padding: 20px;
      }
    `}</style>
  </div>
);

export default Header;
