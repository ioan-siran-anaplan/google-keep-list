let arr = [
    {ceas:"rolex"},
    {ceas:"armani"},
    {ceas:"becali"},
]

//imutable
arr = [ ...arr, {ceas: "nouObiect"}]


// mutable
arr.push({ceas: "nouObiect"})