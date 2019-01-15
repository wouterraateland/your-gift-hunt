import React, { Component } from 'react'
import _ from 'utils'

const getTouches = event => event.touches
  ? [].slice.call(event.touches).map(touch => ({
      x: touch.clientX,
      y: touch.clientY,
    }))
  : [{
      x: event.clientX,
      y: event.clientY,
    }]

class ItemDragContainer extends Component {
  state = {
    x: 0,
    y: 0,
    prevTouches: [],
  }

  handleOnDragStart = (event) => {
    event.dataTransfer && event.dataTransfer.setDragImage(new Image(), 0, 0)

    this.setState({ prevTouches: getTouches(event) })
  }

  handleOnDrag = (event) => {
    if (event.clientX === 0 && event.clientY === 0) { return }

    const touches = getTouches(event)
    const prevTouches = this.state.prevTouches.slice(0, touches.length)
    const nextTouches = touches.slice(0, prevTouches.length)
    const l = prevTouches.length

    const dx = l > 0
      ? _.mean(nextTouches.map(t => t.x)) - _.mean(prevTouches.map(t => t.x))
      : 0

    const dy = l > 0
      ? _.mean(nextTouches.map(t => t.y)) - _.mean(prevTouches.map(t => t.y))
      : 0

    this.setState(({ x, y }) => ({
      x: x + dx, y: y + dy,
      prevTouches: touches
    }))
  }

  handleOnDragEnd = () => {
    this.setState({
      x: 0,
      y: 0,
      prevTouches: []
    })
  }

  shouldComponentUpdate(_, nextState) {
    return (
      this.state.x !== nextState.x ||
      this.state.y !== nextState.y
    )
  }

  render() {
    const { x, y, prevTouches } = this.state

    return (
      <div
        draggable
        style={{
          transform: `
            translate(${x}px, ${y}px)
          `,
          opacity: prevTouches.length > 0 ? .5 : 1
        }}
        onDragStart={this.handleOnDragStart}
        onTouchStart={this.handleOnDragStart}
        onDrag={this.handleOnDrag}
        onTouchMove={this.handleOnDrag}
        onDragEnd={this.handleOnDragEnd}
        onTouchEnd={this.handleOnDragEnd}
      >
        {this.props.children}
      </div>
    )
  }
}

export default ItemDragContainer
