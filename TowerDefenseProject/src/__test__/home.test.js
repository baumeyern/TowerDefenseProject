import { shallow, configure } from 'enzyme';
import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

const { default: HomePage } = require("../components/pages/HomePage");
configure({ adapter: new Adapter() });

//Test #4
it("renders login page with header and buttons", () => {
    const wrapper = shallow(<HomePage />);
    const header = <h1>Tower<br />Defense</h1>;
    expect(wrapper.contains(header)).toEqual(true);
});