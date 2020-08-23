const fs = require("fs");

const getPort_ = () => {
    try {
        const str = fs.readFileSync("conf.json");
        const config = JSON.parse(str);
        return config;
    } catch (e) {
        return 3000;
    }
}

const tryCatch = f => {
    try {
        return Right(f());
    } catch (e) {
        return Left(e);
    }
}

// wrtie this becouse don't want to give passibility of invoking fs.readFile without try catch
const readFileSync = path => tryCatch(() => fs.readFileSync(path));

const getPort = () => tryCatch(() => readFileSync("conf.json"))
    .map(JSON.parse)
    .map(config => config.port)
    .fold(() => 3000, x => x)

// next step 
const parseJSON = content => tryCatch(() => JSON.parse(content))    

const Right = x => ({
    chain: f => f(x),
    map: f => Right(f(x)),
    fold: (f, g) => g(x),
    toString: `Right(${x})`
});

const Left = x => ({
    chain: f => Left(x),
    map: f => Left(x),
    fold: (f, g) => f(x),
    toString: `Left(${x})`
});

const getPort = () => tryCatch(() => readFileSync("conf.json"))
    .chain(parseJSON)
    .map(config => config.port)
    .fold(() => 3000, x => x)

// exapmle
const street_ = user => {
    const address = user.address;

    if (address) {
        return address.street
    } else {
        return "no street";
    }
}    

const fromNullable = x => x != null ? Right(x) : Left()

const street__ = user => 
    fromNullable(user.address)
    .fold(() => "no street", address => address.street)
    

// complex example
const streetName = user => {
    const address = user.address

    if (address) {
        const street = address.street

        if (street) {
            return street.name
        }
    }

    return "no street";
}

const street___ = user => 
    fromNullable(user.address)
    .chain(address => fromNullable(address.street))
    .map(street => street.name)
    .fold(() => "no street", x => x)

// if user not exist 
const street = user => 
fromNullable(user)
.chain(user => fromNullable(user.address))
.chain(address => fromNullable(address.street))
.map(street => street.name)
.fold(() => "no street", x => x)
