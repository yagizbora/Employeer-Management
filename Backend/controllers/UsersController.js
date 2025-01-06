const { getPool } = require('../database');
const sql = require('mssql');
const bcrypt = require('bcrypt');
const path = require('path'); 
const jwt = require('jsonwebtoken');
const verifyToken = require('../Middleware/verifyToken'); 
const multer = require("multer");
const fs = require("fs");


const firstregistercontroller = async (req, res) => {
    const query = `SELECT COUNT(*) as count FROM Users WHERE is_aktif = 1`
    try {
        const pool = await getPool();
        const result = await pool.request()
            .query(query)
        if (result.recordset[0].count > 0) {
            res.status(200).json({ status: 'false'})
        }
        else {
            res.status(200).json({status:'true'})
        }
    } catch (error) {
        res.status(500).json({ message: 'Database error: ' + error.message });
    }
}



const firstregister = async (req, res) => {
    const { username, password} = req.body

    const checkuser = async () => {
        const query = `SELECT COUNT(*) as count FROM Users WHERE is_aktif = 1`
        const pool = await getPool();
        const result = await pool.request()
            .query(query)
        return result.recordset[0].count
    }
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }


    const checkUsernameQuery = async () => {
        const query = `SELECT COUNT(*) AS count FROM Users WHERE username = @username`;
        const pool = await getPool();
        const result = await pool.request()
            .input('username', sql.VarChar, username)
            .query(query);
        return result.recordset[0].count;
    };
    try {
        const usernameCount = await checkUsernameQuery();
        if (usernameCount > 0) {
            return res.status(500).json({ message: 'Username already exists, please use a different username' });
        }


        const isregisteredfirstuser = await checkuser()
        console.log(isregisteredfirstuser)
        if (isregisteredfirstuser > 0) {
            return res.status(500).json({status: 'false',message: 'Sorry this api or url ONLY for first registration'})
        }
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const insertQuery = `INSERT INTO Users (username, password, is_aktif, is_admin,is_logged,super_admin) VALUES (@username, @password,1,1,0,1)`;
        const pool = await getPool();
        await pool.request()
            .input('username', sql.VarChar, username)
            .input('password', sql.VarChar, hashedPassword)
            .query(insertQuery);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Database error: ' + error.message });
    }
}


const register = async (req, res) => {
    const tokenCheck = await verifyToken(req);
    if (!tokenCheck.status) {
        return res.status(401).json({ message: tokenCheck.message });
    }

    const { username, password, is_admin, email,user_id } = req.body;

    
    if (!username || !password || is_admin == null || user_id == null) {
        return res.status(400).json({ message: 'Username and password are required'});
    }

    let checkadminstatus

    const checkuseradmin = async () => {
        const query = `SELECT is_admin FROM Users WHERE id = @user_id AND is_aktif = 1`
        const pool = await getPool();
        const result = await pool.request()
            .input( 'user_id', sql.Int, user_id )

            .query(query)
        return result.recordset.length > 0 ? result.recordset[0].is_admin : null;
    }


    const checkUsernameQuery = async () => {
        const query = `SELECT COUNT(*) AS count FROM Users WHERE username = @username`;
        const pool = await getPool();
        const result = await pool.request()
            .input('username', sql.VarChar, username)
            .query(query);
        return result.recordset[0].count; 
    };

    try {
        checkadminstatus = await checkuseradmin();
        if (!checkadminstatus) {
            res.status(400).json({ message: "You're not admin you cannot create this user!!" });
            return;
        }

        const usernameCount = await checkUsernameQuery(); 
        if (usernameCount > 0) {
            return res.status(400).json({ message: 'Username already exists, please use a different username' });
        }

        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const insertQuery = `INSERT INTO Users (username, password,email,is_aktif, is_admin,is_logged,super_admin) VALUES (@username, @password,@email, 1, @is_admin,0,0)`;
        const pool = await getPool();
        await pool.request()
            .input('username', sql.VarChar, username)
            .input('is_admin', sql.Bit, is_admin)
            .input('password', sql.VarChar, hashedPassword)
            .input('email', sql.VarChar, email)
            .query(insertQuery);

        res.status(201).json({ message: `${username}, user created succesfully  ${username} password: ${password}` });
    } catch (error) {
        res.status(500).json({ message: 'Database error: ' + error.message });
    }
};

const listusers = async (req, res) => {
    const tokenCheck = await verifyToken(req);
    if (!tokenCheck.status) {
        return res.status(401).json({ message: tokenCheck.message });
    }

    const { is_logged } = req.body;
    const userId = req.headers['user_id'];


    const checkuseradmin = async () => {
        const query = `SELECT is_admin FROM Users WHERE id = @user_id`;
        const pool = await getPool();
        const result = await pool.request()
            .input('user_id', sql.Int, userId)
            .query(query)
        return result.recordset[0]
    }

    if (is_logged === null || is_logged === undefined) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    let sqllogged = ""; 
    if (is_logged !== null && is_logged !== undefined) {
        sqllogged += ` AND is_logged = @is_logged`;
    }

    const query = `SELECT 
    ISNULL(name, '') + ' ' + ISNULL(surname, '') AS [Name-Surname],
    username, 
    is_admin, 
    id, 
    is_logged,
    image_path,
    email FROM Users WHERE is_aktif = 1${sqllogged}`;

    try {
        let checkuseradminstatus = await checkuseradmin()
        if (!checkuseradminstatus.is_admin)
        {
            return res.status(200).json({ status: false, message:"You are not admin you cannot see user :)" })
        }
        const pool = await getPool();
        const result = await pool.request()
            .input('is_logged', sql.Bit, is_logged)
            .query(query);
        res.status(200).json({ data: result.recordset });
    } catch (error) {
        res.status(500).json({ message: 'Database error', error: error.message });
    }
};


const changepassword = async (req, res) => {
    const tokenCheck = await verifyToken(req);
    if (!tokenCheck.status) {
        return res.status(401).json({ message: tokenCheck.message });
    }

    const { id, password } = req.body;
    const query = `UPDATE Users SET password = @hashedpassword WHERE id = @id`;

    try {
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const pool = await getPool();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .input('hashedpassword', sql.VarChar, hashedPassword)
            .query(query);

        if (result.rowsAffected[0] > 0) {
            const resetTokenQuery = `UPDATE Users SET token = '' WHERE id = @id`;
            const tokenResult = await pool.request()
                .input('id', sql.Int, id)
                .query(resetTokenQuery);

            if (tokenResult.rowsAffected[0] > 0) {
                return res.status(200).json({ message: 'Password changed and token reset successfully.' });
            } else {
                return res.status(200).json({ message: 'Password changed, but failed to reset token.' });
            }
        } else {
            return res.status(404).json({ message: 'User ID not found or password not changed.' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Database error: ' + error.message });
    }
};

const uploadprofilephoto = async (req, res) => {

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            const uploadPath = path.join("uploads", "profilephoto");
            if (!fs.existsSync(uploadPath)) {
                fs.mkdirSync(uploadPath, { recursive: true });
            }
            cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
            const ext = path.extname(file.originalname);
            cb(null, Date.now() + ext);
        }
    });
    const upload = multer({
        storage: storage,
        fileFilter: (req, file, cb) => {
            const allowedTypes = ['image/jpeg', 'image/png', 'image/png'];
            if (!allowedTypes.includes(file.mimetype)) {
                return cb(new Error('Invalid file type. Only jpeg, png, and gif are allowed.'));
            }
            cb(null, true);
        }
    });

    upload.single('photo')(req, res, async (err) => {
        if (err) {
            return res.status(400).send({ message: err.message }); 
        }

        const tokenCheck = await verifyToken(req);
        if (!tokenCheck.status) {
            return res.status(401).json({ message: tokenCheck.message });
        }

        const { id } = req.body;
        const photo = req.file;
        if (!photo) {
            return res.status(400).send({ message: 'No file uploaded.' });
        }

        const uploadPath = path.join("uploads", "profilephoto", photo.filename);

        try {
            const pool = await getPool();
            const result = await pool.request()
                .input("id", sql.Int, id)
                .input("imagePath", sql.NVarChar, uploadPath) 
                .query("UPDATE Users SET image_path = @imagePath WHERE id = @id");

            res.status(200).send({ message: "Profil foto�raf� ba�ar�yla y�klendi." });
        } catch (error) {
            console.error("Hata:", error);
            res.status(500).send("Bir hata olu�tu.");
        }
    });
};


const usersurnamechange  = async (req, res) => {
    const tokenCheck = await verifyToken(req);
    if (!tokenCheck.status) {
        return res.status(401).json({ message: tokenCheck.message });
    }
    const { name, surname, id } = req.body;

    const query = `UPDATE Users SET name = @name, surname = @surname WHERE is_aktif = 1 AND id = @id`;

    const usernameget = async () => {
        const usernamequery = `SELECT username From Users WHERE id = @id`;
        const pool = await getPool();
        const result = await pool.request()
            .input("id", sql.Int, id)
            .query(usernamequery);
        return result.recordset[0]
    }
    try {
        const pool = await getPool();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .input('name', sql.VarChar, name)
            .input('surname', sql.VarChar, surname)
            .query(query);

        const response = result.rowsAffected[0];
        // console.log('Result:', JSON.stringify(result));
        // console.log('Rows affected:', response);

        if (response > 0) {
            let username = await usernameget();
            return res.status(200).json({ message: `Okay, Name and Surname is changed of this user ${username.username}` });
        } else {
            return res.status(400).json({ message: 'No rows were updated' });
        }
    } catch (e) {
        return res.status(500).json({ message: 'Database error: ' + e.message });
    }
};


const changeusername = async (req, res) => {
    const tokenCheck = await verifyToken(req);
    if (!tokenCheck.status) {
        return res.status(401).json({ message: tokenCheck.message });
    }

    const { id, username } = req.body;
    const query = `UPDATE Users SET username = @username WHERE id = @id`;

    try {
        const pool = await getPool();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .input('username', sql.VarChar, username)
            .query(query);

        if (result.rowsAffected[0] > 0) {
            const resettokenQuery = `UPDATE Users SET token = '' WHERE id = @id`;
            const tokenResult = await pool.request()
                .input('id', sql.Int, id)
                .query(resettokenQuery);

            if (tokenResult.rowsAffected[0] > 0) {
                return res.status(200).json({ message: 'Username changed and token reset successfully.' });
            } else {
                return res.status(200).json({ message: 'Username changed, but failed to reset token.' });
            }
        } else {
            return res.status(404).json({ message: 'Username not changed. User ID may not exist.' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Database error: ' + error.message });
    }
};


const getalldatausers = async (req, res) => {
    const tokenCheck = await verifyToken(req);
    if (!tokenCheck.status) {
        return res.status(401).json({ message: tokenCheck.message });
    }

    const { id } = req.query

    if (!id) {
        return res.status(400).json({ message: 'User ID is required.' });
    }

    const query = `SELECT username,id,name,surname,email FROM Users WHERE id = @id AND is_aktif = 1`;
    try {
        const pool = await getPool();
        const result = await pool.request()
           .input('id', sql.Int, id)
            .query(query);
        if (result.rowsAffected[0] > 0) { 
            return res.status(200).json({...result.recordset[0]});
        }
        else {
            return res.status(404).json({ message: 'User ID may not exist.' });
        }
    } catch (err) { 

    }
}


const deactiveusers = async (req, res) => {
    const tokenCheck = await verifyToken(req);
    if (!tokenCheck.status) {
        return res.status(401).json({ message: tokenCheck.message });
    }
    const { id, user_id } = req.body

    const query = `UPDATE Users SET is_aktif = 0 WHERE id = @id`

    const usernamequery = `SELECT username FROM Users WHERE id = @id`

    const username = async () =>
    {
        const pool = await getPool();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query(usernamequery)
        const response = result.recordset[0]
        return response
    }

    let deletedusername

    let checkadminstatus

    const checkuseradmin = async () => {
        const query = `SELECT is_admin FROM Users WHERE id = @user_id AND is_aktif = 1`
        const pool = await getPool();
        const result = await pool.request()
            .input('user_id', sql.Int, user_id)
            .query(query)
        return result.recordset.length > 0 ? result.recordset[0].is_admin : null;
    }

    try {
        checkadminstatus = await checkuseradmin();
        if (!checkadminstatus)
        {
            res.status(400).json({ message: "You're not admin you cannot delete this user!!" });
            return;
        }
        deletedusername = await username();
        const pool = await getPool();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query(query)
        const response = result
        if (response.rowsAffected[0] > 0) {
            res.status(200).json({ message: `Operation is succesfull. ${deletedusername.username} is deleted` })
        }
        else {
            res.status(404).json({ message: 'User is not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Database error: ' + error.message });
    }
}
const login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json({ message: 'All fields is required' })
        return
    }
    try {
        const pool = await getPool();
        const result = await pool.request()
            .input('username', sql.VarChar, username)
            .query('SELECT * FROM Users WHERE username = @username AND is_aktif = 1');

        const user = result.recordset[0];

        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const token = jwt.sign({ id: user.id, username: user.username }, 'YOUR_SECRET_KEY', { expiresIn: '90m' });

        await pool.request()
            .input('token', sql.VarChar, token)
            .input('id', sql.Int, user.id)
            .query('UPDATE Users SET token = @token, is_logged = 1 WHERE id = @id');
        res.status(200).json({ message: 'Login successful', token: token, user_id: user.id, username: user.username, is_admin: user.is_admin, super_admin: user.super_admin });
    } catch (error) {
        res.status(500).json({ message: 'Database error: ' + error.message });
    }
};

const logout = async (req, res) => { 
    const tokenCheck = await verifyToken(req);
    if (!tokenCheck.status) {
        return res.status(401).json({ message: tokenCheck.message });
    }
    const { user_id } = req.body 
    if (!user_id) {
        res.status(400).json({ message: 'User ID is required' });
    }
    const query = `Update Users SET token = '' , is_logged = 0 WHERE id = @user_id AND is_aktif  = 1`
    try {
        const pool = await getPool();
        const result = await pool.request()
           .input('user_id', sql.Int, user_id)
            .query(query)
        if (result.rowsAffected[0] > 0) {
            const usercheckquery = `Select username from Users where id = @user_id AND is_aktif = 1`
            const userresult = await pool.request()
                .input('user_id', sql.Int, user_id)
                .query(usercheckquery)
            if (userresult.recordset.length > 0) {
                res.status(200).json({ message: 'User ' + userresult.recordset[0].username + ' logged out successfully' });
                return 
             }
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Database error: '+ error.message });
    }
}


const getemail = async (req, res) => {
    const tokenCheck = await verifyToken(req);
    if (!tokenCheck.status) {
        return res.status(401).json({ message: tokenCheck.message });
    }
    const { id } = req.query;

    if (!id) {
       return res.status(500).json({message:'Id is required'})
    }

    let query = `SELECT email,id FROM Users WHERE id = @id AND is_aktif = 1`

    try {
        const pool = await getPool();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query(query)

        if (result.recordset && result.recordset.length > 0) {
            res.status(200).json(result.recordset);
        } else {
            res.status(404).json({ message: 'No records found' });
        }

    }
    catch (error) {
    return res.status(500).json({ message: 'Database error: ' + error.message });
    }
}

    const changeemail = async (req, res) => {
        const tokenCheck = await verifyToken(req);
        if (!tokenCheck.status) {
            return res.status(401).json({ message: tokenCheck.message });
        }

        const { user_id, email, id } = req.body;

        if (!user_id) {
            return res.status(500).json({ message: 'We cannot auth your admin status please contact IT department' });
        }

        if (!email || !id) {
            return res.status(500).json({ message: 'All fields required' });
        }

        const getUsername = async () => {
            const usernameQuery = `SELECT username FROM Users WHERE id = @id`;

            const pool = await getPool();
            const result = await pool.request()
                .input('id', sql.Int, id)
                .query(usernameQuery);

            const response = result.recordset[0];
            return response ? response.username : null;  
        };

        const checkUserAdmin = async () => {
            const query = `SELECT is_admin FROM Users WHERE id = @user_id AND is_aktif = 1`;
            const pool = await getPool();
            const result = await pool.request()
                .input('user_id', sql.Int, user_id)
                .query(query);

            return result.recordset.length > 0 ? result.recordset[0].is_admin : null;
        };

        const updateEmailQuery = `UPDATE Users SET email = @email WHERE is_aktif = 1 AND id = @id`;

        try {
            const username = await getUsername();
            if (!username) {
                return res.status(404).json({ message: 'User not found.' });
            }

            const isAdmin = await checkUserAdmin();
            if (!isAdmin) {
                return res.status(500).json({ status: '500', message: `You're not an admin; you cannot update ${username} email data.`  });
            }
            const pool = await getPool();
            const result = await pool.request()
                .input('email', sql.VarChar, email)
                .input('id', sql.Int, id)
                .query(updateEmailQuery);

            if (result.rowsAffected > 0) {
                return res.status(200).json({ message: `${username}'s email has been updated!` });
            } else {
                return res.status(500).json({ message: 'Operation unsuccessful, please contact IT department.' });
            }
        } catch (error) {
            return res.status(500).json({ message: 'Database error: ' + error.message });
        }
    };


const adminstatus = async (req, res) => {
    const tokenCheck = await verifyToken(req);
    if (!tokenCheck.status)
    {
        return res.status(401).json({ message: tokenCheck.message });
    }

    const { id, is_admin, user_id } = req.body;
    const updateQuery = `UPDATE Users SET is_admin = @is_admin, token = '' WHERE id = @id`;

    let checkUserActive;
    let checkAdminStatus;

    const checkUserActiveController = async () => {
        const query = `SELECT is_logged, username FROM Users WHERE id = @id AND is_aktif = 1`;
        const pool = await getPool();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query(query);

        return result.recordset.length > 0 ? result.recordset[0] : null;
    };

    const checkUserAdmin = async () => {
        const query = `SELECT is_admin FROM Users WHERE id = @user_id AND is_aktif = 1`;
        const pool = await getPool();
        const result = await pool.request()
            .input('user_id', sql.Int, user_id)
            .query(query);

        return result.recordset.length > 0 ? result.recordset[0].is_admin : null;
    };

    try {
        checkAdminStatus = await checkUserAdmin();
        if (!checkAdminStatus) {
            return res.status(400).json({ message: "You're not an admin; you cannot update this user's admin status." });
        }

        checkUserActive = await checkUserActiveController();
        if (checkUserActive && checkUserActive.is_logged) {
            return res.status(400).json({
                message: `${checkUserActive.username} is currently logged in and cannot be edited. Please contact IT if changes are urgent.`
            });
        }

        const pool = await getPool();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .input('is_admin', sql.Bit, is_admin)
            .query(updateQuery);

        if (result.rowsAffected[0] > 0) {
            return res.status(200).json({ message: `${checkUserActive.username} admin status changed` });
        } else {
            return res.status(404).json({ message: 'User not found.' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Database error: ' + error.message });
    }
};

const getprofilephoto = async(req, res) =>
{
    const tokenCheck = await verifyToken(req);
    if (!tokenCheck.status) {
        return res.status(401).json({ message: tokenCheck.message });
    }

    const { id } = req.query;

    let query = `SELECT image_path,id FROM Users WHERE id = @id AND is_aktif = 1`

    try {
        const pool = await getPool();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query(query)

        if (result.recordset && result.recordset.length > 0) {
            res.status(200).json(result.recordset);
        } else {
            res.status(404).json({ message: 'No records found' });
        }

    }
    catch (error) {
        return res.status(500).json({ message: 'Database error: ' + error.message });
    }
    
}

const profilephoto = async (req, res) => {
    const tokenCheck = await verifyToken(req);
    if (!tokenCheck.status) {
        return res.status(401).json({ message: tokenCheck.message });
    }

    const { user_id } = req.body

    if (!user_id) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    const query = `SELECT image_path FROM Users WHERE id = @user_id`;

    try {
        const pool = await getPool();
        const result = await pool.request()
            .input('user_id', sql.Int, user_id)
            .query(query);

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: 'Image successfully fetched',
            data: result.recordset[0]
        });
    } catch (error) {
        return res.status(500).json({ message: 'Database error: ' + error.message });
    }
};


const logoutuserforsuperadmin = async (req, res) => {
    const tokenCheck = await verifyToken(req);
    if (!tokenCheck.status) {
        return res.status(401).json({ message: tokenCheck.message });
    }



    const { id, user_id, token } = req.body;
    if (id == user_id) {
        return res.status(400).json({ message: 'You cannot logout yourself in this page!!!' })
    }
    if (!id || !user_id || !token) {
        return res.status(400).json({message:'All fields is required'})
    }

    const checksuperadmin = async () => {
        const query = `
            SELECT COUNT(super_admin) AS count 
            FROM users 
            WHERE id = @user_id AND token = @token AND super_admin = 1
        `;
        const pool = await getPool();
        const result = await pool.request()
            .input('user_id', sql.Int, user_id)
            .input('token', sql.VarChar, token)
            .query(query);
        return result.recordset[0];
    };


    const isuserloggedin = async () => {
        const query = `
        SELECT COUNT(is_logged) AS count
        FROM users
        WHERE id = @id AND is_logged = 1
        `
        const pool = await getPool();
        const result = await pool.request()
        .input('id', sql.Int, id)
            .query(query)
        return result.recordset[0]
    }


    try {
        const checksuperadminResult = await checksuperadmin();

        if (checksuperadminResult.count === 0) {
            return res.status(400).json({ message: 'You are not a super admin' });
        }


        const isuserloggedinResult = await isuserloggedin()
        if (isuserloggedinResult.count === 0) {
            return res.status(400).json({message:'User is not logged'})
        }
        const query = `UPDATE Users SET token = '', is_logged = 0 WHERE id = @id`;
        const pool = await getPool();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query(query);

        if (result.rowsAffected[0] > 0) {
            return res.status(200).json({ message: 'User is logged out' });
        } else {
            return res.status(200).json({ message: 'Something went wrong. Please contact the IT department.' });
        }
    } catch (error) {
        console.error('Database error:', error.message);
        return res.status(500).json({ message: 'An internal server error occurred' });
    }
};




module.exports = {
    login,
    logout,
    register,
    listusers,
    deactiveusers,
    adminstatus,
    changepassword,
    firstregister,
    changeusername,
    firstregistercontroller,
    changeemail,
    usersurnamechange,
    uploadprofilephoto,
    profilephoto,
    getprofilephoto,
    getemail,
    getalldatausers,
    logoutuserforsuperadmin
};