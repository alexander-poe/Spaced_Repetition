
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import chai from 'chai';
import Counter from '../../client/js/pages/pieces/counter';
const should = chai.should();

describe('counter piece', () => {
	it('should be a div element', () => {
		const count = 1;
        const renderer = TestUtils.createRenderer();
        renderer.render(<Counter count={count} />);
        const result = renderer.getRenderOutput();
        
        result.type.should.equal('div');
        result.props.className.should.equal('counter-box');

        const child = result.props.children;
        child.type.should.equal('span');
        
        const grandchild = child.props.children;
        grandchild.type.should.equal('h3');
        grandchild.props.children.should.equal(count);
    });
})
