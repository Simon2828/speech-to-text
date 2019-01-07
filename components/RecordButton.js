const RecordButton = ({ onClick }) => {
  // click startListening

  return (
    <button onClick={onClick}>
      <i className="icon-record">
        <svg
          width="14px"
          height="19px"
          viewBox="0 0 14 19"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          {" "}
          <g
            id="Page-1"
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd"
          >
            <path
              d="M7,12 C8.66,12 9.99,10.66 9.99,9 L10,3 C10,1.34 8.66,0 7,0 C5.34,0 4,1.34 4,3 L4,9 C4,10.66 5.34,12 7,12 Z M12.3,9 C12.3,12 9.76,14.1 7,14.1 C4.24,14.1 1.7,12 1.7,9 L0,9 C0,12.41 2.72,15.23 6,15.72 L6,19 L8,19 L8,15.72 C11.28,15.24 14,12.42 14,9 L12.3,9 Z"
              id="mic"
              className="mic"
              fill="#FFFFFF"
              fillRule="nonzero"
            />{" "}
          </g>{" "}
        </svg>
      </i>

      <style jsx>{`
        button {
          background-color: transparent;
          border: 0;
        }

        .icon-record {
          margin-bottom: 5px;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 0;
          padding: 0;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background-color: #f44040;
          box-sizing: border-box;
          transition: background-color 0.2s, opacity 0.2s, transform 0.2s;
          box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
          transition: all 0.2s ease-in-out;
          position: absolute;
          top: 170px;
          left: 385px;
        }

        .icon-record:hover {
          transform: scale(1.1);
        }
      `}</style>
    </button>
  );
};

export default RecordButton;
