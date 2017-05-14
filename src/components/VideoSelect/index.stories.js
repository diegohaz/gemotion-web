// https://github.com/diegohaz/arc/wiki/Storybook
import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import VideoSelect from '.'

const videos = [
  { id: 1, name: 'Show da Xuxa' },
  { id: 2, name: 'Caldeirão do Huck' },
  { id: 3, name: 'Falcão abre terminal' },
]

storiesOf('VideoSelect', module)
  .add('default', () => (
    <VideoSelect videos={videos} onChange={action('change')} />
  ))
