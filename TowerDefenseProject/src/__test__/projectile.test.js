import { Projectile } from "../components/objects/projectile";

/**
 * @jest-environment jsdom
 */

test("should instantiate", () => {
    expect(new Projectile(0, 1, 4, {})).toBeDefined();
});

test("should move to end", () => {
    const bullet = new Projectile(1, 2, 4);

    expect(bullet.end).toBe(false);

    bullet.move();

    expect(bullet.end).toBe(true);
});

test("should draw basic bullet", () => {
    const bullet = new Projectile(1, 2, 1);
    const drawImage = jest.fn();

    bullet.draw({ drawImage });

    expect(drawImage).toHaveBeenCalledTimes(1);
    expect(drawImage.mock.calls[0][0].tagName.toLowerCase()).toBe("img");
});

test("should draw slow bullet", () => {
    const bullet = new Projectile(1, 2, 2);
    const drawImage = jest.fn();

    bullet.draw({ drawImage });

    expect(drawImage).toHaveBeenCalledTimes(1);
    expect(drawImage.mock.calls[0][0].tagName.toLowerCase()).toBe("img");
});

test("should draw aoe", () => {
    const bullet = new Projectile(1, 2, 3);
    const drawImage = jest.fn();

    bullet.draw({ drawImage });

    expect(drawImage).toHaveBeenCalledTimes(1);
    expect(drawImage.mock.calls[0][0].tagName.toLowerCase()).toBe("img");
});

test("should draw sniper bullet", () => {
    const bullet = new Projectile(1, 2, 4);
    const drawImage = jest.fn();

    bullet.draw({ drawImage });

    expect(drawImage).toHaveBeenCalledTimes(1);
    expect(drawImage.mock.calls[0][0].tagName.toLowerCase()).toBe("img");
});

test("should draw poison bullet", () => {
    const bullet = new Projectile(1, 2, 1);
    const drawImage = jest.fn();

    bullet.draw({ drawImage });

    expect(drawImage).toHaveBeenCalledTimes(1);
    expect(drawImage.mock.calls[0][0].tagName.toLowerCase()).toBe("img");
});