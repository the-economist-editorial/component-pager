import React from 'react';

export default class Pager extends React.Component {

  static get propTypes() {
    return {
      indxLength: React.PropTypes.number.isRequired,
      defaultSceneIndex: React.PropTypes.number,
      clickableIndexes: React.PropTypes.bool,
      onChangeIndex: React.PropTypes.func,
    };
  }

  static get defaultProps() {
    return {
      indxLength: 5,
      defaultSceneIndex: 0,
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
      index = this.props.indxLength;
    } else {
      index--;
    }
    this.changeIndex(index);
  }

  // EVENT LISTENERS
  onNextClick() {
    let index = this.state.sceneIndex;
    if (index < (this.props.indxLength - 1)) {
      index++;
    }
    this.changeIndex(index);
  }

  indexClicked(e) {
    const item = e.target.dataset.item;
    if (item === 'previous') {
      this.onPreviousClick();
    } else if (item === 'next') {
      this.onNextClick();
    } else if (this.props.clickableIndexes) {
      this.changeIndex(parseInt(item, 10));
    }
  }

  changeIndex(index) {
    if (typeof this.props.onChangeIndex !== 'undefined') {
      this.props.onChangeIndex(index, this.state.sceneIndex);
    }
    this.setState({ sceneIndex: index });
  }

  // RENDER
  render() {
    const sceneIndex = this.state.sceneIndex;
    const indxLength = this.props.indxLength;
    let previousClass = 'Pager-previous';
    let nextClass = 'Pager-next';
    if (sceneIndex === 0) {
      previousClass += ' Pager-elm-hidden';
    } else if (sceneIndex === (indxLength - 1)) {
      nextClass += ' Pager-elm-hidden';
    }
    let previousBtn;
    let nextBtn;
    let clickableClass;
    if (this.props.clickableIndexes) {
      clickableClass = 'Pager-index-clickable';
    }
    previousBtn = (
      <li className={previousClass} key="previous" data-item="previous">
        <span data-item="previous">previous</span>
      </li>
    );
    nextBtn = (
      <li className={nextClass} key="next" data-item="next">
        <span data-item="next">next</span>
      </li>
    );

    // Page index
    const index = [];
    for (let i = 0; i < indxLength; i++) {
      // Class to highlight current index
      let indexClass = 'Pager-index';
      if (i === sceneIndex) {
        indexClass += ' Pager-index-selected';
      }
      index.push(
        <li className={indexClass} key={i} data-item={i}>
          <span data-item={i}>{i + 1}</span>
        </li>
      );
    }
    // Glue it all together
    return (
      <div className="Pager">
        <ul onClick={this.indexClicked.bind(this)} className={clickableClass}>
          {previousBtn}
          {index}
          {nextBtn}
        </ul>
      </div>
    );
  }
}
