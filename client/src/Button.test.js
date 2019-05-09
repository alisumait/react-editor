import React from 'react';
import renderer from 'react-test-renderer';
import Button from '../src/Button/Button';

test('test if onClick method works', () => {
  const component = renderer.create(
    <Button onClick={(e) => console.log("works!")}>Test</Button>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  tree.props.onClick();
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});