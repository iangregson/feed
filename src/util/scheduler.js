export default function every(xSeconds, doThis, ...using) {
    let time = xSeconds * 1000
    doThis(...using)
    setTimeout(() => every(xSeconds, doThis, ...using), time);
}
