// https://github.com/diegohaz/arc/wiki/Storybook
import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Chart from '.'

storiesOf('Chart', module)
  .add('default', () => (
    <Chart />
  ))
