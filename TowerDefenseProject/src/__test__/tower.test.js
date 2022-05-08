import { Tower } from "../components/objects/tower";

/**
 * @jest-environment jsdom
 */
//Test #14.25
test("should instantiate", () => {
  expect(new Tower(0, 1, 1)).toBeDefined();
});

//Test #14.5
test("should draw basic tower", () => {
  const basicTower = new Tower(1, 2, 1);
  const drawImage = jest.fn();

  basicTower.draw({ drawImage });

  expect(drawImage).toHaveBeenCalledTimes(1);
  expect(drawImage.mock.calls[0][0].tagName.toLowerCase()).toBe("img");
});
//Test #14.5
test("should draw slow tower", () => {
  const slowTower = new Tower(1, 2, 2);
  const drawImage = jest.fn();

  slowTower.draw({ drawImage });

  expect(drawImage).toHaveBeenCalledTimes(1);
  expect(drawImage.mock.calls[0][0].tagName.toLowerCase()).toBe("img");
});
//Test #14.5
test("should draw aoe tower", () => {
  const aoeTower = new Tower(1, 2, 3);
  const drawImage = jest.fn();

  aoeTower.draw({ drawImage });

  expect(drawImage).toHaveBeenCalledTimes(1);
  expect(drawImage.mock.calls[0][0].tagName.toLowerCase()).toBe("img");
});
//Test #14.5
test("should draw sniper Tower", () => {
  const sniperTower = new Tower(1, 2, 4);
  const drawImage = jest.fn();

  sniperTower.draw({ drawImage });

  expect(drawImage).toHaveBeenCalledTimes(1);
  expect(drawImage.mock.calls[0][0].tagName.toLowerCase()).toBe("img");
});
//Test #14.5
test("should draw poison Tower", () => {
  const poisonTower = new Tower(1, 2, 5);
  const drawImage = jest.fn();

  poisonTower.draw({ drawImage });

  expect(drawImage).toHaveBeenCalledTimes(1);
  expect(drawImage.mock.calls[0][0].tagName.toLowerCase()).toBe("img");
});
//Test #14.5
test("should draw Bit Coin Bank", () => {
  const BitcoinBank = new Tower(1, 2, 6);
  const drawImage = jest.fn();

  BitcoinBank.draw({ drawImage });

  expect(drawImage).toHaveBeenCalledTimes(1);
  expect(drawImage.mock.calls[0][0].tagName.toLowerCase()).toBe("img");
});

//Test #15
test("should have basic stats", () => {
  const basicTower = {
    fire: true,
    fireRate: 1,
    height: 50,
    mid: { x: 25, y: 26 },
    price: 10,
    projectile: 1,
    range: 150,
    sold: false,
    timer: Date.now(),
    type: 1,
    width: 50,
    x: 0,
    y: 1,
  };

  expect(new Tower(0, 1, 1)).toEqual(basicTower);
});

//Test #16
test("should have slow stats", () => {
  const slowTower = {
    fire: true,
    fireRate: 1.5,
    height: 50,
    mid: { x: 25, y: 26 },
    price: 20,
    projectile: 2,
    range: 110,
    sold: false,
    timer: Date.now(),
    type: 2,
    width: 50,
    x: 0,
    y: 1,
  };

  expect(new Tower(0, 1, 2)).toEqual(slowTower);
});

//Test #17
test("should have AOE stats", () => {
  const aoeTower = {
    fire: true,
    fireRate: 1,
    height: 50,
    mid: { x: 25, y: 26 },
    price: 30,
    projectile: 3,
    range: 130,
    sold: false,
    timer: Date.now(),
    type: 3,
    width: 50,
    x: 0,
    y: 1,
  };

  expect(new Tower(0, 1, 3)).toEqual(aoeTower);
});

//Test #18
test("should have sniper stats", () => {
  const sniperTower = {
    fire: true,
    fireRate: 3,
    height: 50,
    mid: { x: 25, y: 26 },
    price: 40,
    projectile: 4,
    range: 400,
    sold: false,
    timer: Date.now(),
    type: 4,
    width: 50,
    x: 0,
    y: 1,
  };

  expect(new Tower(0, 1, 4)).toEqual(sniperTower);
});

//Test #19
test("should have poison stats", () => {
  const poisonTower = {
    fire: true,
    fireRate: 2,
    height: 50,
    mid: { x: 25, y: 26 },
    price: 30,
    projectile: 5,
    range: 120,
    sold: false,
    timer: Date.now(),
    type: 5,
    width: 50,
    x: 0,
    y: 1,
  };

  expect(new Tower(0, 1, 5)).toEqual(poisonTower);
});

//Test #20
test("should have bank stats", () => {
  const BitcoinBank = {
    fire: true,
    height: 50,
    mid: { x: 25, y: 26 },
    price: 40,
    range: 0,
    sold: false,
    timer: Date.now(),
    type: 6,
    width: 50,
    x: 0,
    y: 1,
  };

  expect(new Tower(0, 1, 6)).toEqual(BitcoinBank);
});
