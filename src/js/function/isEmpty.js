const isEmpty = (data) => {
    let result = data.match(/[^\s]/);

    if (result === null) {
        return true;

    } else {
        switch (data) {
            case "":
            case 0:
            case "0":
            case " ":
                return true;
        }
    } 

    return false;
}

