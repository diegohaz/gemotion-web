// https://github.com/diegohaz/arc/wiki/Storybook
import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Video from '.'


storiesOf('Video', module)
  .add('default', () => (
    <Video />
  ))
