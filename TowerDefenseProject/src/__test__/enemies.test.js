import { Enemy } from "../components/objects/enemy";

/**
 * @jest-environment jsdom
 */

//Test #8
test("should instantiate enemy", () => {
  expect(new Enemy(0, 1, 1)).toBeDefined();
});

//Test #13.5
test("should draw type 1", () => {
  const type1 = new Enemy(1, 2, 1);
  const drawImage = jest.fn();

  type1.draw({ drawImage });

  expect(drawImage).toHaveBeenCalledTimes(1);
  expect(drawImage.mock.calls[0][0].tagName.toLowerCase()).toBe("img");
});

//Test #13.5
test("should draw type 2", () => {
  const type2 = new Enemy(1, 2, 2);
  const drawImage = jest.fn();

  type2.draw({ drawImage });

  expect(drawImage).toHaveBeenCalledTimes(1);
  expect(drawImage.mock.calls[0][0].tagName.toLowerCase()).toBe("img");
});

//Test #13.5
test("should draw type 3", () => {
  const type3 = new Enemy(1, 2, 3);
  const drawImage = jest.fn();

  type3.draw({ drawImage });

  expect(drawImage).toHaveBeenCalledTimes(1);
  expect(drawImage.mock.calls[0][0].tagName.toLowerCase()).toBe("img");
});

//Test #13.5
test("should draw type 4", () => {
  const type4 = new Enemy(1, 2, 4);
  const drawImage = jest.fn();

  type4.draw({ drawImage });

  expect(drawImage).toHaveBeenCalledTimes(1);
  expect(drawImage.mock.calls[0][0].tagName.toLowerCase()).toBe("img");
});

//Test #10
test("should have basic stats", () => {
  const type1 = {
    atk: 1,
    currentDot: 0,
    dead: false,
    distance: 0,
    dotTimer: null,
    speedUp: false,
    end: false,
    health: 150,
    height: 50,
    maxHealth: 150,
    mid: {
      x: 25,
      y: 26,
    },
    scaled: false,
    score: 10,
    slowSpeed: 0,
    slowed: false,
    speed: 0.5,
    type: 1,
    value: 2,
    waypoint: 0,
    width: 50,
    x: 0,
    y: 1,
  };

  expect(new Enemy(0, 1, 1)).toEqual(type1);
});

//Test #11
test("should have fast stats", () => {
  const type2 = {
    atk: 1,
    currentDot: 0,
    dead: false,
    distance: 0,
    dotTimer: null,
    speedUp: false,
    end: false,
    health: 100,
    height: 50,
    maxHealth: 100,
    mid: {
      x: 25,
      y: 26,
    },
    scaled: false,
    score: 20,
    slowSpeed: 0,
    slowed: false,
    speed: 2,
    type: 2,
    value: 4,
    waypoint: 0,
    width: 50,
    x: 0,
    y: 1,
  };

  expect(new Enemy(0, 1, 2)).toEqual(type2);
});

//Test #12
test("should have Tanky stats", () => {
  const type3 = {
    atk: 1,
    currentDot: 0,
    dead: false,
    distance: 0,
    dotTimer: null,
    speedUp: false,
    end: false,
    health: 200,
    height: 50,
    maxHealth: 200,
    mid: {
      x: 25,
      y: 26,
    },
    scaled: false,
    score: 40,
    slowSpeed: 0,
    slowed: false,
    speed: 0.4,
    type: 3,
    value: 4,
    waypoint: 0,
    width: 50,
    x: 0,
    y: 1,
  };

  expect(new Enemy(0, 1, 3)).toEqual(type3);
});

//Test #13
test("should have Boss stats", () => {
  const type4 = {
    atk: 5,
    currentDot: 0,
    dead: false,
    distance: 0,
    dotTimer: null,
    speedUp: false,
    end: false,
    health: 500,
    height: 50,
    maxHealth: 500,
    mid: {
      x: 25,
      y: 26,
    },
    scaled: false,
    score: 100,
    slowSpeed: 0,
    slowed: false,
    speed: 0.7,
    type: 4,
    value: 10,
    waypoint: 0,
    width: 50,
    x: 0,
    y: 1,
  };

  expect(new Enemy(0, 1, 4)).toEqual(type4);
});

//Test #27
test("should be able to scale enemies per round", () => {
  const enemy = new Enemy(1, 2, 1);
  enemy.scale(5);

  expect(enemy.health).toBe(150 * 1.4);
});
