// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'
import PropTypes from 'prop-types'
import { LineChart, XAxis, YAxis, CartesianGrid, Line } from 'recharts'
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

const types = [
  { id: 1, name: 'Interesse', color: 'red' },
  { id: 2, name: 'Foco', color: 'blue' },
  { id: 3, name: 'Estresse', color: 'pink' },
  { id: 4, name: 'Engajamento', color: 'yellow' },
  { id: 5, name: 'Excitação', color: 'green' },
  { id: 6, name: 'Relaxamento', color: 'orange' },
]
const seconds = 86
const data = []

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

const lastNum = {}

for (let i = 0; i < seconds; i += 1) {
  const obj = { name: moment().startOf('day')
        .seconds(i)
        .format('mm:ss') }
  types.forEach((type) => {
    obj[type.name] = generateNextNum(lastNum[type.name] || 0.5)
    lastNum[type.name] = obj[type.name]
  })
  data.push(obj)
}

class Chart extends React.Component {
  static propTypes = {
    percent: PropTypes.string.isRequired,
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
    const { percent } = this.props
    const { selected } = this.state
    return (
      <div style={{ position: 'relative', marginLeft: -170 }}>
        <StyledLineChart width={702} height={200} data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="1 1" />
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
        <div style={{ position: 'absolute', top: 20, right: -150 }}>
          {types.map((type) => (
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
