import Header from './Header'
import Head from 'next/head'


const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD',
  height: 200
}

const Layout = (props) => (
  <div>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
    </Head>
    <style jsx global>{`
                  
                  * { box-sizing: border-box; margin: 0; padding: 0 }
                  
  
                  body { 
                      background: #000;
                      font: 16px menlo;
                      color: #fff;
                  }
                  `}</style>
    <div style={layoutStyle}>
      {props.children}
    </div>
  </div>
)

export default Layout