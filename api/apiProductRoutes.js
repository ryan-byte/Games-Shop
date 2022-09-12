const database = require("../server/database/database");


function api_getAllProducts(req,res){
    let data = database.getAllData();
    res.status(200);
    res.json(data);
}
function api_getOneProduct(req,res){
    let id = req.params.id;
    let data = database.getOneData(id);
    if (data == -1){
        res.sendStatus(404);
    }else{
        res.status(200).json(data);
    }
}

module.exports = {api_getAllProducts,api_getOneProduct}