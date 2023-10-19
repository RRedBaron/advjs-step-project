const postVisit = async (body) => {
    try{
        return await instance.post('/', body);
    } catch(err) {
        console.log('Error', err);
    }
    
}