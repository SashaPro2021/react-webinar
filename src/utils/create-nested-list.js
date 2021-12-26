export const unflat = (arr) => {
    let flatArr = []
    for (let i = 0; i < arr.length; i++) {
        flatArr[i] = {};
        flatArr[i]._id = arr[i]._id
        flatArr[i].title = arr[i].title
        flatArr[i].parent = arr[i].parent
    }
    let unflatten = [];
    flatArr.forEach((el) => {
        if (el.parent === null) {
            unflatten.push(el);
            return;
        }
    });
    const addChild = (arr, obj) => {
        obj.forEach((elem) => {
            elem.children = [];
            arr.forEach((el) => {
                if (el.parent != null && el.parent._id === elem._id) {
                    elem.children.push(el);
                    addChild(arr, elem.children);
                }
            });
        })
    }
    addChild(flatArr, unflatten)
    return unflatten
}

export const nestedList = (nested, symNum, symChar) => {
    let accum = [];
    const mod = (nested, symNum, symChar) => {
        nested.forEach((el) => {
            let temp = {
                _id: el._id,
                title: symChar.repeat(symNum) + el.title
            };
            accum.push(temp);
            if (el.children) {
                mod(el.children, symNum + 1, symChar)
            }
        })
    }
    mod(nested, symNum, symChar);
    return accum;
}
