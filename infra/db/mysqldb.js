async function getConnection(){
    if(global.connection && global.connection.state == 'disconnected'){
        return global.connection;
    }

    const mysql = await require('mysql2/promise');
    const con = await mysql.createConnection('mysql://root:root@localhost:3306/loja');
    global.connection = con;
    return con;

}
module.exports = {getConnection}