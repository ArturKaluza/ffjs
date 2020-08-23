// map: execute funtion and return new Functor
// fold: execute function and return value

const Functor = (x) => ({
    map: f => Functor(f(x)),
    fold: f => f(x),
    toString: `Functor(${x})`
});


const first = xs => xs[0];

const halfTheFirstLargeNumber = xs => {
    const found = xs.filter(x => x >= 20)
    const answer = first(found) / 2;
    return `The answer is ${answer}`;
}

// refactored function
const halfTheFirstLargeNumber2 = xs => 
    Functor(xs)
    .map(xs => xs.filter(x => x >= 20))
    .map(x => first(x) / 2)
    .fold(x => `The answer is ${x}`)


const compose = (f, g) => x => Functor(x).map(g).fold(f);

const res = halfTheFirstLargeNumber([1, 4, 50]);
console.log(res);

const res2 = halfTheFirstLargeNumber2([1, 4, 50]);
console.log(res2);

// example 2
const moneyTofloat = str => parseFloat(str.replace(/\$/, ""));

// refatored function
const moneyTofloat2 = str => 
    Functor(str)
    .map(str => str.replace(/\$/, ""))
    .fold(parseFloat);

// example 3
const percentToFloat_ = str => {
    const float = parseFloat(str.replace(/\$/, ""))
    return float * 0.0100
}    

// refactored function
const percentToFloat = str => 
Functor(str)
.map(str => str.replace(/\$/, ""))
.map(parseFloat)
.fold(float => float * 0.0100)


// example 4
const applyDiscount_ = (price, discount) => {
    const cents = moneyTofloat(price);
    const savings = percentToFloat(discount);
    return cents - (cents * savings);
}

// refactored function
const applyDiscount = (price, discount) => 
    Functor(moneyTofloat(price))
        .fold(cetns => Functor(percentToFloat(discount))
            .fold(savings => cetns - (cetns * savings))
        )


console.log(applyDiscount("5$", "20%"));