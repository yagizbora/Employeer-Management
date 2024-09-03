
const express = require('express');
const bodyParser = require('body-parser');
const { getPool } = require('./database');
const employeerRoutes = require('./routes/employeerRoutes');
const DepartmantRoutes = require('./routes/DepartmantRoutes');
const ReportRoutes = require('./routes/ReportRoutes');
const OrderRoutes = require('./routes/OrderRoutes');
const cors = require('cors');

const app = express();
const PORT = 44392;

app.use(cors());

getPool()
    .then(() => {
        app.use(bodyParser.json());
        app.use('/api', OrderRoutes);
        app.use('/api', employeerRoutes);
        app.use('/api', DepartmantRoutes);
        app.use('/api', ReportRoutes);

        app.listen(PORT, () => {
            console.log(`Sunucu http://localhost:${PORT} adresinde çalýþýyor`);
        });
    })
    .catch(err => {
        console.error('Bir Hata oluþtu', err);
        process.exit(1);
    });
