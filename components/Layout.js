import Header from './Header'
import Head from 'next/head'
import MobileMenu from './MobileMenu'

const layoutStyle = {
  margin: 20,
  padding: 20,
  minHeight: 100
}


const Layout = (props) => (
  <div>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
    </Head>
  <Header />
  <MobileMenu />

        <style jsx global>{`
                  
                  * { box-sizing: border-box; margin: 0; padding: 0 }
                  
  
                  body { 
                      font: 16px menlo;
                  }
                  `}</style>
    <div style={layoutStyle}>
      {props.children}
    </div>


  </div>
)

export default Layout