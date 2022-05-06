import { shallow, configure } from 'enzyme';
import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Router } from 'react-router-dom';
const { default: ScoresPage } = require("../components/pages/ScoresPage");
import 'regenerator-runtime/runtime'
configure({ adapter: new Adapter() });

//Test #3
it("renders login page with header and buttons", () => {
    const location = { pathname: '/scores/' };
    const wrapper = shallow(<Router location={location}><ScoresPage /></Router>);
    const header = "<th>Name</th>";
    const button = "Home</Button>"

    //Jest has problems rendering the html for some reason so this test fails
    expect(wrapper.html().indexOf(header)).toBeGreaterThanOrEqual(0);
    expect(wrapper.html().indexOf(button)).toBeGreaterThanOrEqual(0);

});