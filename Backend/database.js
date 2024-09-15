const sql = require('mssql');

let poolPromise;
let isFirstConnection = true;

const config = {
    user: 'admin',
    password: 'B.bora1907',
    server: 'localhost',
    database: 'Employeer_List',
    options: {
        encrypt: false,
        trustServerCertificate: true,
    },
    port: 1433,
};

const getPool = async () => {
    if (!poolPromise) {
        poolPromise = sql.connect(config).then(pool => {
            if (isFirstConnection) {
                console.log('Veritaban�na ba�land�!');
                isFirstConnection = false; 
            }
            return pool;
        }).catch(err => {
            console.error('Veritaban� ba�lant� hatas�:', err.message);
            throw err;
        });
    }
    return poolPromise;
};



module.exports = { getPool };