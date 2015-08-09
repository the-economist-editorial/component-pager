import Pager from './../index.es6';
import React from 'react/addons';
const TestUtils = React.addons.TestUtils;
const TestEvents = React.addons.TestUtils.Simulate;
describe('Rendering', () => {
  const renderer = TestUtils.createRenderer();
  let component;
  beforeEach(() => {
    component = renderer.render(React.createElement(Pager, {
      className: 'Pager',
      clickableIndexes: true,
      sceneTotal: '5',
    }));
    component = renderer.getRenderOutput();
  });

  it('renders a div.Pager', () => {
    component
      .should.have.property('type', 'div');
    component
      .should.have.deep.property('props.className', 'Pager');
  });

  it('renders a ul', () => {
    component.props.children
      .should.have.property('type', 'ul');
  });

  it('renders a ul.Pager-index-clickable if the clickableIndexes prop is set', () => {
    component
      .should.have.deep.property('props.children').property('props.className', 'Pager-index-clickable');
  });

  it('renders the previous li element with class name .Pager-previous .Pager-elm-hidden', () => {
    component
      .should.have.deep
        .property('props.children.props.children[0]')
        .property('props.className', 'Pager-previous Pager-elm-hidden');
    component
      .should.have.deep
        .property('props.children.props.children[0]')
        .property('props.data-item', 'previous');
  });

  it('renders next li element with class name .Pager-next data attribute data-item=next', () => {
    component
      .should.have.deep
        .property('props.children.props.children[2]')
        .property('props.className', 'Pager-next');
    component
      .should.have.deep
        .property('props.children.props.children[2]')
        .property('props.data-item', 'next');
  });

  it('renders a ul with 5 indexes if sceneTotal prop is set to 5', () => {
    component
      .should.have.deep.property('props.children.props.children[1]').with.lengthOf(5);
  });

  it('renders 1 li element with classname .Pager-index, data attr data-item=0 if sceneTotal prop is set to 1', () => {
    component = renderer.render(React.createElement(Pager, { sceneTotal: '1' }));
    component = renderer.getRenderOutput();
    component
      .should.have.deep.property('props.children.props.children[1][0]')
      .property('props.className', 'Pager-index Pager-index-selected');
    component
      .should.have.deep.property('props.children.props.children[1][0]')
      .property('props.data-item', 0);
  });

  it('renders an element with a child with data attr data-item=0 if sceneTotal prop is set to 1', () => {
    component = renderer.render(React.createElement(Pager, { sceneTotal: '1' }));
    component = renderer.getRenderOutput();
    component
      .should.have.deep.property('props.children.props.children[1][0].props.children')
      .property('props.data-item', 0);
  });

  it('simulate click on the next button sets the Pager-index-selected on the second element', () => {
    const element = TestUtils.renderIntoDocument(React.createElement(Pager, { sceneTotal: '5' }));
    const pagerNext = TestUtils.findRenderedDOMComponentWithClass(element, 'Pager-next');
    TestEvents.click(pagerNext);
    const secondIndex = TestUtils.findRenderedDOMComponentWithClass(element, 'Pager-index-selected');
    secondIndex
      .should.have.deep.property('props.data-item', 1);
  });
});
