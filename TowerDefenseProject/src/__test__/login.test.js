import { shallow, configure } from 'enzyme';
import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Router } from 'react-router-dom';
const { default: LoginPage } = require("../components/pages/LoginPage");
configure({ adapter: new Adapter() });

//Test #1
it("renders login page with header and buttons", () => {
    const location = { pathname: '/login' };
    const wrapper = shallow(<Router location={location}><LoginPage /></Router>);
    const header = "<h2>Enter Name</h2>";
    const button = "Begin</button>"

    expect(wrapper.html().indexOf(header)).toBeGreaterThanOrEqual(0);
    expect(wrapper.html().indexOf(button)).toBeGreaterThanOrEqual(0);

});