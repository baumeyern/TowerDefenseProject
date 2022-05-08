import React from "react";
import "regenerator-runtime/runtime";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import Audio from "../components/ui/Audio";

/**
 * @jest-environment jsdom
 */
//This is so we dont get flags for undifined functions
beforeEach(() => {
  window.HTMLMediaElement.prototype.load = () => {
    /* do nothing */
  };
  window.HTMLMediaElement.prototype.play = () => {
    /* do nothing */
  };
  window.HTMLMediaElement.prototype.pause = () => {
    /* do nothing */
  };
  window.HTMLMediaElement.prototype.addTextTrack = () => {
    /* do nothing */
  };
});

//Test #32
test("should render", () => {
  const history = createMemoryHistory();
  render(
    <Router location={history.location} navigator={history}>
      <Audio />
    </Router>
  );
});

//Test #32.5
test("should play audio", async () => {
  const history = createMemoryHistory();
  const playAudio = jest.fn();
  window.HTMLMediaElement.prototype.play = playAudio;
  render(
    <Router location={history.location} navigator={history}>
      <Audio />
    </Router>
  );

  await waitFor(() => screen.findByText("Toggle for audio"));

  fireEvent.click(screen.getByTitle("Toggle audio"));

  expect(playAudio).toHaveBeenCalled();
});
