import React, { Component } from 'react'
import PropTypes from 'prop-types'
import omit from 'lodash/omit'
import { connect } from 'react-redux'
import { fromImpression } from 'store/selectors'
import { impressionDetailReadRequest } from 'store/actions'

import Chart from 'components/Chart'

class ChartContainer extends Component {
  static propTypes = {
    readImpressionDetail: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.readImpressionDetail()
  }

  render() {
    return <Chart {...this.props} />
  }
}

const mapStateToProps = state => ({
  impressions: omit(fromImpression.getDetail(state), 'title'),
})

const mapDispatchToProps = dispatch => ({
  readImpressionDetail: () => dispatch(impressionDetailReadRequest(2)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ChartContainer)
