import { shallow, configure, mount } from "enzyme";
import React from "react";
import Tower from "../components/objects/TowerLogic";
import fireImage from "../assets/images/circle.png";

//jest.mock("../components/assets/images/Type1.png", () => "Type1.png");

// describe("fire IMG", () => {
//   it("renders an img", () => {
//     const fireImg = shallow(fireImage);

//     expect(fireImg.find("img").not.toBe(null));
//   });
// });
//const test1 = Tower.Towerfunc(50, 50, 1);
const Towerfunc = require("../components/objects/TowerLogic");
jest.mock("../components/objects/tower", () => () => {
  const MockName = "tower-mock";
  return <MockName />;
});
describe("Tower 1", () => {
  test("Towers prop ", () => {
    expect(Towerfunc(50, 50, 1).toBe(!null));
  });
});
