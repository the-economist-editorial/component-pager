import React from 'react';
import Icon from '@economist/component-icon';

export default class Pager extends React.Component {

  static get propTypes() {
    return {
      sceneTotal: React.PropTypes.number,
      defaultSceneIndex: React.PropTypes.number,
      prevNext: React.PropTypes.string,
      icon: React.PropTypes.object,
      onChangeIndex: React.PropTypes.func,
    };
  }

  static get defaultProps() {
    return {
      sceneTotal: 5,
      defaultSceneIndex: 0,
      icon: {
        color: '#DADADA',
        background: 'transparent',
      },
      prevNext: 'arrows',
    };
  }

  // Set default state:
  constructor(props) {
    super(props);
    this.state = { sceneIndex: props.defaultSceneIndex };
  }

  // EVENT LISTENERS
  prevNext(arrow) {
    let index = this.state.sceneIndex;
    if (arrow === 'left') {
      if (index > 0) {
        index--;
      }
    } else if (index < (this.props.sceneTotal - 1)) {
      index++;
    }

    this.changeIndex(index);
  }
  // page indexes:
  indexClicked(index) {
    this.changeIndex(index);
  }
  //
  changeIndex(newIndex) {
    if (this.props.onChangeIndex) {
      this.props.onChangeIndex(newIndex, this.state.sceneIndex);
    }
    this.setState({ sceneIndex: newIndex });
  }


  // RENDER
  render() {
    const sceneIndex = this.state.sceneIndex;
    const sceneTotal = this.props.sceneTotal;
    // Left and right arrows
    // Class strings to hide at start/finish
    let leftClass = 'Pager-previous';
    let rightClass = 'Pager-next';
    if (sceneIndex === 0) {
      leftClass += ' Pager-arrow-hidden';
    } else if (sceneIndex === (sceneTotal - 1)) {
      rightClass += ' Pager-arrow-hidden';
    }
    let previous;
    let next;
    if (this.props.prevNext === 'arrows') {
      previous = (
        <li className={leftClass} key="left" onClick = {this.prevNext.bind(this, 'left')}>
          <Icon icon="left" background={this.props.icon.background} color={this.props.icon.color}/>
        </li>
      );
      next = (
        <li className={rightClass} key="right" onClick = {this.prevNext.bind(this, 'right')}>
          <Icon icon="right" background={this.props.icon.background} color={this.props.icon.color}/>
        </li>
      );
    }
    if (this.props.prevNext === 'strings') {
      previous = (
        <li className={leftClass} key="left" onClick = {this.prevNext.bind(this, 'left')}>
          previous
        </li>
      );
      next = (
        <li className={rightClass} key="right" onClick = {this.prevNext.bind(this, 'right')}>
          next
        </li>
      );
    }

    // Page index
    const index = [];
    for (let i = 0; i < sceneTotal; i++) {
      // Class to highlight current index
      let indexClass;
      if (i === sceneIndex) {
        indexClass = 'Pager-index-selected';
      }
      index.push(
        <li key={i} onClick={this.indexClicked.bind(this, i)}>
          <span className={indexClass}>{i + 1}</span>
        </li>
      );
    }
    // Glue it all together
    return (
      <div className="Pager">
        <ul>
          {previous}
          {index}
          {next}
        </ul>
      </div>
    );
  }
}
