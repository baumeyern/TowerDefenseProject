import { shallow, configure, render } from "enzyme";
import React from "react";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { useRadio } from "../components/ui/Audio";

const audio = require("../components/ui/Audio");

jest.mock("../components/ui/Audio");

//test
test("Plays audio", () => {
  const spy = jest.spyOn(audio, "useRadio");
  const isPlaying = audio.useRadio();

  expect(spy).toHaveBeenCalled();
  expect(isPlaying).toBe(true);
});

jest.mock("../components/ui/audio", () => () => {
  const MockName = "audio-mock";
  return <MockName />;
});

const audioMock = jest.fn();
const testAudio = new audioMock();
console.log(audioMock.mock.instances);

const mockFn = jest.fn();
mockFn();

//Test
describe("Test audio functionality", () => {
  it("Plays sound ", () => {
    expect(mockFn).toHaveBeenCalled();
  });
});
