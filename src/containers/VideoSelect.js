import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fromVideo } from 'store/selectors'
import { videoListReadRequest, videoSelect } from 'store/actions'

import VideoSelect from 'components/VideoSelect'

class VideoSelectContainer extends Component {
  static propTypes = {
    readVideoList: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.readVideoList()
  }

  render() {
    return <VideoSelect {...this.props} />
  }
}

const mapStateToProps = state => ({
  videos: fromVideo.getList(state),
  selected: fromVideo.getSelected(state),
})

const mapDispatchToProps = dispatch => ({
  readVideoList: () => dispatch(videoListReadRequest()),
  onChange: (id) => dispatch(videoSelect(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(VideoSelectContainer)
