class Querybuilder{

 insert(table , fillable){
   return  `INSERT INTO ${table} (${fillable}) VALUES  ?`;
 }
}

module.exports = new Querybuilder()