const Button = (props) => (
    <button className={ 'large' in props && 'large' }>
       { props.children }
       <style jsx>{`
          button {
            padding: 20px;
            background: #eee;
            color: #999
          }
          @media (max-width: 768px) {
            button {
                background: lightblue;
            }
          }
          .large {
            padding: 50px
          }
       `}</style>
    </button>
  )

  export default Button;