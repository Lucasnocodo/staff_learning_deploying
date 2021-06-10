import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '../src/theme'
import Layout from '../components/layout'

export default function MyApp(props) {
  // const [state, setstate] = useState(initialState)
  const { Component, pageProps } = props
  const router = useRouter()

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.remove()
    }
  }, [])
  const isDraw = () => {
    if (router.pathname.startsWith('/Draws')) {
      return true
    }
    return false
  }
  return (
    <>
      <Head>
        <title>快樂學習看樂譜</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {isDraw() ? (
          <Component {...pageProps} />
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </ThemeProvider>
    </>
  )
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
}
