import Pager from '..';
import React from 'react';

describe('Pager', () => {
  it('should exist', () => {
    Pager.should.be.a('function');
  });

  it('renders a component', () => {
    (<Pager/>).should.be.an('object');
  });

  it('is a react component', () => {
    const defaultSceneIndex = 0;
    (new Pager(defaultSceneIndex)).should.be.an.instanceOf(React.Component);
  });

  describe('onNextClick, onPreviousClick', () => {
    it('calls changeIndex', () => {});
  });

  describe('indexClicked', () => {
    it('calls changeIndex', () => {});
  });
});
