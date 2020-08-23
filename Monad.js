const moneyTofloat = str => 
    Box(str)
    .map(str => str.replace(/\$/, ""))
    .fold(parseFloat);

    const percentToFloat = str => 
    Box(str)
    .map(str => str.replace(/\$/, ""))
    .map(parseFloat)
    .fold(float => float * 0.0100)

// chain: || flatMap: flatten the boxes
const Box = (x) => ({
    map: f => Box(f(x)),
    chain: f => f(x),
    fold: f => f(x),
    toString: `Functor(${x})`
});

const applyDiscount = (price, discount) => 
    Box(moneyTofloat(price))
    .chain(cetns => Box(percentToFloat(discount))
        .map(savings => cetns - (cetns * savings))
    ).fold(x => x);

console.log(applyDiscount("5$", "20%"));