import React from 'react';
import Icon from '@economist/component-icon';

export default class Pager extends React.Component {

  static get propTypes() {
    return {
      sceneTotal: React.PropTypes.number,
      defaultSceneIndex: React.PropTypes.number,
      showArrows: React.PropTypes.bool,
      clickableIndexes: React.PropTypes.bool,
      icon: React.PropTypes.object,
      onChangeIndex: React.PropTypes.func,
    };
  }

  static get defaultProps() {
    return {
      sceneTotal: 5,
      defaultSceneIndex: 0,
      icon: {
        color: 'red',
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
  onPreviousClick() {
    let index = this.state.sceneIndex;
    if (index === 0) {
      index = this.props.sceneTotal;
    } else {
      index--;
    }
    this.changeIndex(index);
  }

  // EVENT LISTENERS
  onNextClick() {
    let index = this.state.sceneIndex;
    if (index < (this.props.sceneTotal - 1)) {
      index++;
    }
    this.changeIndex(index);
  }

  indexClicked(index) {
    this.changeIndex(index);
  }

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
    let leftClass = 'Pager-previous';
    let rightClass = 'Pager-next';
    if (sceneIndex === 0) {
      leftClass += ' Pager-arrow-hidden';
    } else if (sceneIndex === (sceneTotal - 1)) {
      rightClass += ' Pager-arrow-hidden';
    }
    let previousArrow;
    let nextArrow;
    let previousBtn;
    let nextBtn;
    if (this.props.showArrows) {
      previousArrow = <Icon icon="left" background={this.props.icon.background} color={this.props.icon.color}/>;
      nextArrow = <Icon icon="right" background={this.props.icon.background} color={this.props.icon.color}/>;
    }
    previousBtn = (
      <li className={leftClass} key="left" onClick={this.onPreviousClick.bind(this)}>
        {previousArrow}
        <span>previous</span>
      </li>
    );
    nextBtn = (
      <li className={rightClass} key="right" onClick={this.onNextClick.bind(this)}>
        {nextArrow}
        <span>next</span>
      </li>
    );

    // Page index
    const index = [];
    for (let i = 0; i < sceneTotal; i++) {
      // Class to highlight current index
      let indexClass;
      if (i === sceneIndex) {
        indexClass = 'Pager-index-selected';
      }
      if (this.props.clickableIndexes) {
        index.push(
          <li key={i} onClick={this.indexClicked.bind(this, i)} className="Pager-index-clickable">
            <span className={indexClass}>{i + 1}</span>
          </li>
        );
      } else {
        index.push(
          <li key={i}>
            <span className={indexClass}>{i + 1}</span>
          </li>
        );
      }
    }
    // Glue it all together
    return (
      <div className="Pager">
        <ul>
          {previousBtn}
          {index}
          {nextBtn}
        </ul>
      </div>
    );
  }
}
