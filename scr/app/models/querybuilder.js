class Querybuilder {
  insert(table, fillable) {
    return `INSERT INTO ${table} (${fillable}) VALUES  ?`;
  }

  get(table) {
    return `SELECT * FROM ${table}`;
  }

  update(table, fillable) {
    return `UPDATE ${table} SET ${fillable[0]} = ?  WHERE  ${fillable[0]} = ?`;
  }

  delete(table, fillable) {
    return `DELETE FROM ${table} WHERE ${fillable} = ?`;
  }

  whereColum(table, fillable, compare) {
    return `SELECT * FROM ${table} WHERE ${fillable}  ${compare}  ? `;
  }

  whereOrColum(table, fillable, compare) {
    return `SELECT * FROM ${table} WHERE  ${fillable[0]}  ${compare[0]} ? OR ${fillable[1]}  ${compare[1]} ? `;
  }

  whereAndColum(table, fillable, compare) {
    return `SELECT * FROM ${table} WHERE  ${fillable[0]}  ${compare[0]}  ? AND ${fillable[1]}  ${compare[1]}  ? `;
  }

  hasOne(){

  }
  // dung de phaan trang
}

module.exports = new Querybuilder();
