import React from 'react'
import PropTypes from 'prop-types'

import video from './video.mov'

class Video extends React.Component {
  static propTypes = {
    onUpdate: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.video.addEventListener('timeupdate', this.handleUpdate)
  }

  componentWillUnmount() {
    this.video.removeEventListener('timeupdate', this.handleUpdate)
  }

  handleUpdate = (evt) => {
    const { currentTime, duration } = evt.target
    this.props.onUpdate(currentTime / duration)
  }

  render() {
    return (
      <video
        src={video}
        ref={video => { this.video = video }}
        width="100%"
        controls
        {...this.props}
      />
    )
  }
}

export default Video
