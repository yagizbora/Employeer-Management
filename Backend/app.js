const express = require('express');
const ratelimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const { getPool } = require('./database');
const path = require('path'); 
const employeerRoutes = require('./routes/employeerRoutes');
const DepartmantRoutes = require('./routes/DepartmantRoutes');
const ReportRoutes = require('./routes/ReportRoutes');
const OrderRoutes = require('./routes/OrderRoutes');
const ComplaintRoutes = require('./routes/ComplaintRoutes');
const NotesRoutes = require('./routes/NotesRoutes');
const NeedRoutes = require('./routes/NeedRoutes');
const CustomerRoutes = require('./routes/CustomerRoutes');
const ProjectRoutes = require('./routes/ProjectRoutes');
const UsersRoutes = require( './routes/UsersRoutes' );
const CommunactionHistoryRoutes = require( './routes/CommunactionHistoryRoutes' )
const cors = require('cors');
const app = express();
const PORT = 44392;

const limiter = ratelimit({
    windowMs: 5 * 60 * 1000, 
    limit: 1000, 
    standardHeaders: true, 
    legacyHeaders: false, 
    message: {
        message: 'Too many request attempts, please try again later.'
    },
});


app.use(cors());
getPool()
    .then(() => {
        app.use(limiter);
        app.use(bodyParser.json());
        app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
        app.use('/api', OrderRoutes);
        app.use('/api', employeerRoutes);
        app.use('/api', DepartmantRoutes);
        app.use('/api', ReportRoutes);
        app.use('/api', ComplaintRoutes);
        app.use('/api', NotesRoutes);
        app.use('/api', NeedRoutes);
        app.use('/api', CustomerRoutes);
        app.use('/api', ProjectRoutes);
        app.use( '/api', UsersRoutes );
        app.use( '/api', CommunactionHistoryRoutes )
        app.listen(PORT, () => {
            console.log(`Sunucu http://localhost: ${PORT} adresinde �al���yor`);
        });
    })
    .catch(err => {
    console.error('Bir Hata olu�tu', err);
    process.exit(1);
});
