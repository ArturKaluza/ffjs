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

const findColor_ = name => ({ 
    blue: "blue",
    red: "red",
    yellow: "yellow"
 }[name]);

 const findColor = name => {
    const found = { 
        blue: "blue",
        red: "red",
        yellow: "yellow"
    }[name];
    return found ? Right(found) : Left("dunno");
}

const res = findColor("red").map(x => x.toUpperCase());

// if color not found all maps afeter invocking function are skiped, 
// goes immiedietly to fold which handling err,
// if color found do all opertaions and return value 
const res2 = () => 
    findColor("reds")
    .map(x => x.toUpperCase())
    .map(x => x.slice(1))
    .fold(
        () => "no color!",
        color => color
    )

 console.log(res);
 console.log(res2());

 // fromNullable
 const fromNullable = x => x != null ? Right(x) : Left()


 const findColor__ = name => fromNullable({ 
        blue: "blue",
        red: "red",
        yellow: "yellow"
    }[name]);  
   
