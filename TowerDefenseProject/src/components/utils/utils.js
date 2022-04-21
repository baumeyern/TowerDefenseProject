
export function collision(box1, box2) {
    if (box1.x < box2.x + box2.width &&
        box1.x + box1.width > box2.x &&
        box1.y < box2.y + box2.height &&
        box1.y + box1.height > box2.y) {
        return true;
    }
    else {
        return false;
    }
}

export function inRange(obj, target, range) {
    return (obj.x - target.x) * (obj.x - target.x) + (obj.y - target.y) * (obj.y - target.y) < range * range;
}