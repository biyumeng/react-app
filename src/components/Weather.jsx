import React, { Component } from 'react'

export default class Weather extends Component {
    constructor(props) {
        super(props)
        this.state = { isHot: false }
    }

    change = () => {
        this.setState({ isHot: !this.state.isHot })
    }

    render() {
        return (
            <div>
                <div>今日天气 {this.state.isHot ? '炎热' : '凉爽'}</div>
                <button onClick={this.change}>切换</button>
            </div>
        )
    }
}
