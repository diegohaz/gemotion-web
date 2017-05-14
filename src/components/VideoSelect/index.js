import React from 'react'
import PropTypes from 'prop-types'

import Input from '../Input'

const handleChange = onChange => evt => onChange(evt.target.value)

const VideoSelect = ({ videos, selected, onChange }) => {
  return (
    <Input type="select" value={selected || ''} onChange={handleChange(onChange)}>
      <option>Selecione um vídeo</option>
      {videos.map(video => <option key={video.id} value={video.id}>{video.name}</option>)}
    </Input>
  )
}

VideoSelect.propTypes = {
  videos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })).isRequired,
  selected: PropTypes.number,
  onChange: PropTypes.func.isRequired,
}

VideoSelect.defaultProps = {
  selected: '',
}

export default VideoSelect
