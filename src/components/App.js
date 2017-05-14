import React from 'react'
import styled, { injectGlobal, ThemeProvider } from 'styled-components'

import Chart from './Chart'
import Video from './Video'

// https://github.com/diegohaz/arc/wiki/Styling
import theme from './theme'

injectGlobal`
  body {
    margin: 0;
  }
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const VideoWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #000;
`

class App extends React.Component {
  state = {
    percent: 0,
  }

  handleUpdate = (percent) => {
    this.setState({
      percent,
    })
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Wrapper>
          <VideoWrapper>
            <Video width={960} onUpdate={this.handleUpdate} />
          </VideoWrapper>
          <Chart percent={this.state.percent} />
        </Wrapper>
      </ThemeProvider>
    )
  }
}

export default App
