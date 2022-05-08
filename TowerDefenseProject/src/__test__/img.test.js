import { shallow, configure, mount } from "enzyme";
import React from "react";
import { ImageTest, Projectile } from "../components/objects/projectile";
import fireImage from "../assets/images/circle.png";
import basicImage from "../components/assets/images/Basic_Amo.png";

jest.mock("../components/assets/images/Type1.png", () => "Type1.png");

/**
 * @jest-environment jsdom
 */

describe("test suites", () => {
  //   const wrapper = mount(<Projectile variant="img" />);
  //   const elem = wrapper.find("img");
  //   console.log(elem);
  it("onload", (done) => {
    const callback = jest.fn((status) => {
      expect(status).toBe(true);
      done();
    });

    const image = basicImage;
    const img = ImageTest(image, callback);
    if (img.onload) {
      const event = {};
      img.onload(event);
    }
  });

  it("onerror", (done) => {
    const consoleLogSpyOn = jest.spyOn(console, "log");
    const callback = jest.fn((status) => {
      expect(status).toBe(false);
      done();
    });

    const image = basicImage;
    const img = ImageTest(image, callback);
    if (img.onerror) {
      const event = { message: "some error" };
      img.onerror(event);
      expect(consoleLogSpyOn).toBeCalledWith(event);
    }
    consoleLogSpyOn.mockRestore();
  });
});
