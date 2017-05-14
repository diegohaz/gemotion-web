// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'
import PropTypes from 'prop-types'
import { LineChart, XAxis, YAxis, Line } from 'recharts'
import moment from 'moment'
import styled from 'styled-components'
import { font } from 'styled-theme'
import { prop } from 'styled-tools'
import pull from 'lodash/pull'

import Field from '../Field'

const StyledLineChart = styled(LineChart)`
  font-family: ${font('primary')};
  font-size: 0.8rem;
`

const Cara = styled.div`
  > div {
    margin: 0 !important;
  }
  label {
    color: ${prop('foo')} !important;
    padding: 0;
    margin: 0;
    line-height: 1.24;
  }
`

const data = []

const types = [
  { id: 1, name: 'Interesse', color: '#F44336', key: 'interest' },
  { id: 2, name: 'Foco', color: '#795548', key: 'focus' },
  { id: 3, name: 'Estresse', color: '#000000', key: 'stress' },
  { id: 4, name: 'Engajamento', color: '#009688', key: 'engagement' },
  { id: 5, name: 'Excitação', color: '#FF9800', key: 'excitement' },
  { id: 6, name: 'Relaxamento', color: '#2196F3', key: 'relaxation' },
  { id: 7, name: 'Alegria', color: '#CDDC39', key: 'joy' },
  { id: 8, name: 'Raiva', color: '#9E9E9E', key: 'anger' },
  { id: 9, name: 'Desgosto', color: '#607D8B', key: 'disgust' },
]

const totalSeconds = 86

const random = (min, max) => (Math.random() * (max - min)) + min

const generateNextNum = (num) => {
  const newNum = num + (random(-0.1, 0.1))
  if (newNum > 1) {
    return 1
  } else if (newNum < 0) {
    return 0
  }
  return newNum
}

const completeWithRemainSeconds = (seconds, lastNum = 0.5) => {
  const array = []
  for (let i = 0; i < totalSeconds - seconds; i += 1) {
    const pqpqp = generateNextNum(lastNum)
    array.push(pqpqp)
    lastNum = pqpqp
  }
  return array
}

class Chart extends React.Component {
  static propTypes = {
    percent: PropTypes.string.isRequired,
    impressions: PropTypes.object.isRequired,
  }

  state = {
    selected: [1],
  }

  handleCheckboxChange = (evt) => {
    const { value } = evt.target
    const { selected } = this.state
    if (!selected.includes(+value)) {
      this.setState({
        selected: selected.concat(+value),
      })
    } else {
      this.setState({
        selected: pull(selected, +value),
      })
    }
  }

  render() {
    const { percent, impressions } = this.props
    const { selected } = this.state

    if (!impressions.interest) return null

    if (!data.length) {
      Object.keys(impressions).forEach((key) => {
        if (impressions[key].length < totalSeconds - 1) {
          impressions[key] = impressions[key].concat(completeWithRemainSeconds(impressions[key].length - 1, impressions[key][impressions[key].length - 1]))
        }
      })
      for (let i = 0; i < totalSeconds; i += 1) {
        const obj = { name: moment().startOf('day')
              .seconds(i)
              .format('mm:ss') }
        types.filter(type => Object.keys(impressions).includes(type.key))
          .forEach(type => {
            obj[type.name] = impressions[type.key][i]
          })
        data.push(obj)
      }
    }

    return (
      <div style={{ position: 'relative', marginLeft: -170 }}>
        <StyledLineChart width={702} height={200} data={data}>
          <XAxis dataKey="name" interval={10} />
          <YAxis />
          <rect x={(632 * percent) + 66} y={5} width={0.5} stroke="black" height={160} />
          <rect width={632} height={160} fill="white" y={4} x={(632 * percent) + 66} />
          {types.filter(type => selected.includes(type.id)).map(type => (
            <Line
              key={type.name}
              type="linear"
              dataKey={type.name}
              stroke={type.color}
              dot={false}
            />
          ))}
        </StyledLineChart>
        <div style={{ position: 'absolute', height: 140, top: 20, right: -170, overflow: 'auto', paddingRight: 20 }}>
          {types.filter(type => Object.keys(impressions).includes(type.key)).map((type) => (
            <Cara foo={type.color}>
              <Field
                key={type.id}
                type="checkbox"
                name={type.name}
                value={type.id}
                onChange={this.handleCheckboxChange}
                checked={selected.includes(type.id)}
                label={type.name}
              />
            </Cara>
          ))}
        </div>
      </div>
    )
  }
}

export default Chart
