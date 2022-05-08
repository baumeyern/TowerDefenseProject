import { shallow, configure, mount } from "enzyme";
import React from "react";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { Router } from "react-router-dom";

const { default: GamePage } = require("../components/pages/GamePage");
configure({ adapter: new Adapter() });

jest.mock("../components/ui/Draggable", () => () => {
  const MockName = "draggable-mock";
  return <MockName />;
});
jest.mock("../components/objects/enemy", () => () => {
  const MockName = "enemy-mock";
  return <MockName />;
});
jest.mock("../components/objects/projectile", () => () => {
  const MockName = "projectile-mock";
  return <MockName />;
});
jest.mock("../components/objects/tower", () => () => {
  const MockName = "tower-mock";
  return <MockName />;
});
jest.mock("../components/objects/block", () => () => {
  const MockName = "block-mock";
  return <MockName />;
});
jest.mock("../components/ui/audio", () => () => {
  const MockName = "audio-mock";
  return <MockName />;
});
jest.mock("../components/utils/utils", () => {
  const originalModule = jest.requireActual("../components/utils/utils");
  const mockImage = [3];
  return {
    __esModule: true,
    ...originalModule,
    getImage: jest.fn(() => mockImage),
  };
});

//Test #2
it("renders login page with header and buttons", () => {
  const location = { pathname: "/game" };
  const wrapper = mount(
    <Router location={location}>
      <GamePage />
    </Router>
  );
  const header = "<h1>Game Page</h1>";
  const button = "Play</button>";

  //Jest has problems rendering the html for some reason so this test fails
  expect(wrapper.html().indexOf(header)).toBeGreaterThanOrEqual(0);
  expect(wrapper.html().indexOf(button)).toBeGreaterThanOrEqual(0);
});
