var users = require('./models/user')
// speed motor
var speedMotors = require('./models/speedMotor')
var speedMotor_1s = require('./models/speedMotor_1')
var speedMotor_2s = require('./models/speedMotor_2')
var speedMotor_3s = require('./models/speedMotor_3')
// power Generate
var solarPowers = require('./models/solarPower')
var solarPower_1s = require('./models/solarPower_1')
var solarPower_2s = require('./models/solarPower_2')
var solarPower_3s = require('./models/solarPower_3')
// Power Usage
var solarPowerUsages = require('./models/solarPowerUsage')
var solarPowerUsage_1s = require('./models/solarPowerUsage_1')
var solarPowerUsage_2s = require('./models/solarPowerUsage_2')
var solarPowerUsage_3s = require('./models/solarPowerUsage_3')
// Power Remain
var solarPowerRemains = require('./models/solarPowerRemain')
var solarPowerRemain_1s = require('./models/solarPowerRemain_1')
var solarPowerRemain_2s = require('./models/solarPowerRemain_2')
var solarPowerRemain_3s = require('./models/solarPowerRemain_3')
// app/routes.js
module.exports = function (app, passport) {

    // =====================================
    // Trang chủ (có các url login) ========
    // =====================================

    app.get(['/login'], function (req, res) {
        res.render('index.ejs', { message: req.flash('loginMessage') })
    });
    // =====================================
    // Đăng nập ===============================
    // =====================================
    // hiển thị form đăng nhập
    // app.get('/', function (req, res) {
    //     res.render('login.ejs', { message: req.flash('loginMessage') });
    // });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/mainDashboard',
        failureRedirect: '/',
        failureFlash: true
    }));

    // =====================================
    // Đăng ký ==============================
    // =====================================
    // hiển thị form đăng ký
    app.get('/signup', function (req, res) {
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // Xử lý form đăng ký
    app.post('/signup', async function (req, res) {
        var note = '';
        await users.findOne({ email: req.body.email }, async function (err, user) {
            if (user) {
                note = 0;
            } else {
                var newUser = new users();
                newUser.email = req.body.email;
                newUser.password = newUser.generateHash(req.body.password);
                newUser.isAdmin = req.body.role == "isAdmin" ? true : false;
                await newUser.save(function (err) {
                    if (err)
                        throw err;
                    note = 1;
                });
                note = 1
            }
        });
        res.status(200).send(note.toString());
    });

    // =====================================
    // Main dashboard  =====================
    // =====================================
    app.get(['/mainDashboard', '/'], isLoggedIn, function (req, res) {
        res.render('mainDashboard.ejs', {
            user: req.user // truyền đối tượng user cho profile.ejs để hiển thị lên view
        });
    });

    // =====================================
    // dash board_0  =====================
    // =====================================
    app.get(['/dashboard', '/'], isLoggedIn, function (req, res) {
        res.render('dashboard.ejs', {
            user: req.user // truyền đối tượng user cho profile.ejs để hiển thị lên view
        });
    });

    // =====================================
    // dash board_1  =====================
    // =====================================
    app.get(['/dashboard_1', '/'], isLoggedIn, function (req, res) {
        res.render('dashboard_1.ejs', {
            user: req.user // truyền đối tượng user cho profile.ejs để hiển thị lên view
        });
    });

    // =====================================
    // dash board_2  =====================
    // =====================================
    app.get(['/dashboard_2', '/'], isLoggedIn, function (req, res) {
        res.render('dashboard_2.ejs', {
            user: req.user // truyền đối tượng user cho profile.ejs để hiển thị lên view
        });
    });
    // =====================================
    // dash board_3  =====================
    // =====================================
    app.get(['/dashboard_3', '/'], isLoggedIn, function (req, res) {
        res.render('dashboard_3.ejs', {
            user: req.user // truyền đối tượng user cho profile.ejs để hiển thị lên view
        });
    });
    // =====================================
    // Control_0 =====================
    // =====================================
    app.get(['/control'], isLoggedIn, function (req, res) {
        res.render('control.ejs', {
            user: req.user // truyền đối tượng user cho profile.ejs để hiển thị lên view
        });
    });

    // =====================================
    // Control_1 =====================
    // =====================================
    app.get(['/control_1'], isLoggedIn, function (req, res) {
        res.render('control_1.ejs', {
            user: req.user // truyền đối tượng user cho profile.ejs để hiển thị lên view
        });
    });
    // =====================================
    // Control_2 =====================
    // =====================================
    app.get(['/control_2'], isLoggedIn, function (req, res) {
        res.render('control_2.ejs', {
            user: req.user // truyền đối tượng user cho profile.ejs để hiển thị lên view
        });
    });
    // =====================================
    // Control_3 =====================
    // =====================================
    app.get(['/control_3'], isLoggedIn, function (req, res) {
        res.render('control_3.ejs', {
            user: req.user // truyền đối tượng user cho profile.ejs để hiển thị lên view
        });
    });
    // =====================================
    // Charts ==============================
    // =====================================
    // app.get('/charts', isLoggedIn, function (req, res) {
    //     res.render('charts.ejs', {
    //         user: req.user // truyền đối tượng user cho profile.ejs để hiển thị lên view
    //     });
    // });
    // =====================================
    // Map ==============================
    // =====================================
    app.get('/map', isLoggedIn, function (req, res) {
        res.render('map.ejs', {
            user: req.user // truyền đối tượng user cho profile.ejs để hiển thị lên view
        });
    });
    // =====================================
    // Alarm ==============================
    // =====================================
    // app.get('/alarm', isLoggedIn, function (req, res) {
    //     res.render('alarm.ejs', {
    //         user: req.user // truyền đối tượng user cho profile.ejs để hiển thị lên view
    //     });
    // });
    // =====================================
    // Report ==============================
    // =====================================
    app.get('/report', isLoggedIn, async function (req, res) {
        res.render('report.ejs', {
            user: req.user // truyền đối tượng user cho profile.ejs để hiển thị lên view
        });
    });
    // app.get('/randomspeed', function (req, res) {
    //     var month= parseInt(req.query.month);
    //     var start = parseInt(req.query.start) ;
    //     var end = parseInt(req.query.end);
    //     var row = parseInt(req.query.row);
    //     for (let i =  start; i <= end; i++) {
    //         for (let index = 0; index <row; index++) {
    //            var message = Math.floor(Math.random() * 1500) + 1;
    //            var date=new Date(month+"/"+i+"/2019");
    //            date.setHours(Math.floor(Math.random() * 12) + 1,Math.floor(Math.random() * 60) + 1,Math.floor(Math.random() * 60) + 1);
    //             var speedMotor1            = new speedMotor1s();
    //             speedMotor1.time     = date.toLocaleString();
    //             speedMotor1.equipment = 'Motor 1';
    //             speedMotor1.speed    = parseFloat(message);
    //             if (parseFloat(message)>=0.0 && parseFloat(message) < 300.0) {
    //                 speedMotor1.status = 'Low Low'
    //             } else if(parseFloat(message)>=300.0 && parseFloat(message) < 900.0) {
    //                 speedMotor1.status = 'Low'
    //             }else if(parseFloat(message)>=900.0 && parseFloat(message) < 1300.0){
    //                 speedMotor1.status = 'High'
    //             }else{
    //                 speedMotor1.status = 'High High'
    //             }

    //              speedMotor1.save(  function(err) {
    //                 if (err)
    //                     throw err;   
    //             });

    //         }
    //     }
    //     res.status(200).send("1");

    // });



    // =====================================
    // ERROR admin  ===============================
    // =====================================
    app.get('/error_notification', function (req, res) {
        var content = '';
        switch (req.query.content) {
            case '0':
                content = '';
            case '1':
                content = " You might not have enough permissions to access administrator"
        }
        res.render('404.ejs', {
            message: content
        });
    });

    // =====================================
    // Admin Đăng nập ===============================
    // =====================================
    var requiresAdmin = function () {
        return [
            isLoggedIn,
            function (req, res, next) {
                if (req.user && req.user.isAdmin === true) {
                    next();
                }
                else {
                    res.redirect('/error_notification?content=' + '1');
                }
            }
        ]
    };
    // =====================================
    // danh sách account ===================
    // =====================================
    app.get('/admin', requiresAdmin(), async function (req, res) {
        var user = []
        await users.find({}, function (err, results) {
            if (err) throw err;
            results.forEach(function (row) {
                user.push(row);
            });
        })
        res.render('adminAccounts.ejs', { user: user });
    });
    // =====================================
    // Delete account ===================
    // =====================================
    app.post('/delete', function (req, res) {
        var delEmail = req.body.delEmail;
        users.findByIdAndRemove(delEmail).exec();
        res.redirect('/admin');
    });
    // =====================================
    // Chang password ===================
    // =====================================
    app.post('/editPass', async function (req, res) {
        var inputIdEmail = req.body.inputIdEmail;
        var nameEmail = req.body.nameEmail;
        var newPassword = req.body.newPassword;
        await users.findById(inputIdEmail, function (err, doc) {
            if (err) return false;
            doc.password = doc.generateHash(req.body.newPassword);
            doc.save(function (err) {
                if (err)
                    throw err;
            });
        });

        res.redirect('back');
    });
    // =====================================
    // Đăng xuất ===========================
    // =====================================
    app.get('/logout', function (req, res) {
        // req.logout();
        // res.redirect('/login');  // địa chỉ khi logout trả về
        req.session.destroy(function (err) {
            res.redirect('/login'); //Inside a callback… bulletproof!
        });
    });
    // =====================================
    // Month year Power Generate report ===================
    // =====================================
    app.get('/datepicker', async function (req, res) {
        var temp_power = [];

        // find power 
        await solarPowers.find({ month: req.query.month, year: req.query.year }, function (err, results) {
            if (err) throw err;
            results.forEach(function (row) {
                temp_power.push({ "day": row.day, 'power': row.power,'fullyear': row.fullyear,'month': row.month,'year': row.year })
            });
            res.status(200).send(temp_power);
        })
    });
    // =====================================
    // Month year Power Generate report 1 ===================
    // =====================================
    app.get('/datepicker_1', async function (req, res) {
        var temp_power_1 = [];

        // find power 
        await solarPower_1s.find({ month: req.query.month, year: req.query.year }, function (err, results) {
            if (err) throw err;
            results.forEach(function (row) {
                temp_power_1.push({ "day": row.day, 'power': row.power,'fullyear': row.fullyear,'month': row.month,'year': row.year })
            });
            res.status(200).send(temp_power_1);
        })
    });
    // =====================================
    // Month year Power Generate report 2 ===================
    // =====================================
    app.get('/datepicker_2', async function (req, res) {
        var temp_power_2 = [];

        // find power 
        await solarPower_2s.find({ month: req.query.month, year: req.query.year }, function (err, results) {
            if (err) throw err;
            results.forEach(function (row) {
                temp_power_2.push({ "day": row.day, 'power': row.power,'fullyear': row.fullyear,'month': row.month,'year': row.year })
            });
            res.status(200).send(temp_power_2);
        })
    });
    // =====================================
    // Month year Power Generate report 3 ===================
    // =====================================
    app.get('/datepicker_3', async function (req, res) {
        var temp_power_3 = [];

        // find power 
        await solarPower_3s.find({ month: req.query.month, year: req.query.year }, function (err, results) {
            if (err) throw err;
            results.forEach(function (row) {
                temp_power_3.push({ "day": row.day, 'power': row.power,'fullyear': row.fullyear,'month': row.month,'year': row.year })
            });
            res.status(200).send(temp_power_3);
        })
    });
    // =====================================
    // Month year Power Usage report ===================
    // =====================================
    app.get('/datepicker_powerUsage', async function (req, res) {
        var temp_power_usage = [];

        // find power usage
        await solarPowerUsages.find({ month: req.query.month, year: req.query.year }, function (err, results) {
            if (err) throw err;
            results.forEach(function (row) {
                temp_power_usage.push({ "day": row.day, 'power': row.power,'fullyear': row.fullyear,'month': row.month,'year': row.year })
            });
            res.status(200).send(temp_power_usage);
        })
    });
    // =====================================
    // Month year Power Usage report 1 ===================
    // =====================================
    app.get('/datepicker_powerUsage_1', async function (req, res) {
        var temp_power_usage_1 = [];

        // find power usage
        await solarPowerUsage_1s.find({ month: req.query.month, year: req.query.year }, function (err, results) {
            if (err) throw err;
            results.forEach(function (row) {
                temp_power_usage_1.push({ "day": row.day, 'power': row.power,'fullyear': row.fullyear,'month': row.month,'year': row.year })
            });
            res.status(200).send(temp_power_usage_1);
        })
    });
    // =====================================
    // Month year Power Usage report 2 ===================
    // =====================================
    app.get('/datepicker_powerUsage_2', async function (req, res) {
        var temp_power_usage_2 = [];

        // find power usage
        await solarPowerUsage_2s.find({ month: req.query.month, year: req.query.year }, function (err, results) {
            if (err) throw err;
            results.forEach(function (row) {
                temp_power_usage_2.push({ "day": row.day, 'power': row.power,'fullyear': row.fullyear,'month': row.month,'year': row.year })
            });
            res.status(200).send(temp_power_usage_2);
        })
    });
    // =====================================
    // Month year Power Usage report 3 ===================
    // =====================================
    app.get('/datepicker_powerUsage_3', async function (req, res) {
        var temp_power_usage_3 = [];

        // find power usage
        await solarPowerUsage_3s.find({ month: req.query.month, year: req.query.year }, function (err, results) {
            if (err) throw err;
            results.forEach(function (row) {
                temp_power_usage_3.push({ "day": row.day, 'power': row.power,'fullyear': row.fullyear,'month': row.month,'year': row.year })
            });
            res.status(200).send(temp_power_usage_3);
        })
    });
    // =====================================
    // Month year Power Remain report ===================
    // =====================================
    app.get('/datepicker_powerRemain', async function (req, res) {
        var temp_power_remain = [];

        // find power usage
        await solarPowerRemains.find({ month: req.query.month, year: req.query.year }, function (err, results) {
            if (err) throw err;
            results.forEach(function (row) {
                temp_power_remain.push({ "day": row.day, 'power': row.power,'fullyear': row.fullyear,'month': row.month,'year': row.year })
            });
            res.status(200).send(temp_power_remain);
        })
    });
    // =====================================
    // Month year Power Remain report 1 ===================
    // =====================================
    app.get('/datepicker_powerRemain_1', async function (req, res) {
        var temp_power_remain_1 = [];

        // find power usage
        await solarPowerRemain_1s.find({ month: req.query.month, year: req.query.year }, function (err, results) {
            if (err) throw err;
            results.forEach(function (row) {
                temp_power_remain_1.push({ "day": row.day, 'power': row.power,'fullyear': row.fullyear,'month': row.month,'year': row.year })
            });
            res.status(200).send(temp_power_remain_1);
        })
    });
    // =====================================
    // Month year Power Remain report 2 ===================
    // =====================================
    app.get('/datepicker_powerRemain_2', async function (req, res) {
        var temp_power_remain_2 = [];

        // find power usage
        await solarPowerRemain_2s.find({ month: req.query.month, year: req.query.year }, function (err, results) {
            if (err) throw err;
            results.forEach(function (row) {
                temp_power_remain_2.push({ "day": row.day, 'power': row.power,'fullyear': row.fullyear,'month': row.month,'year': row.year })
            });
            res.status(200).send(temp_power_remain_2);
        })
    });
    // =====================================
    // Month year Power Remain report 3 ===================
    // =====================================
    app.get('/datepicker_powerRemain_3', async function (req, res) {
        var temp_power_remain_3 = [];

        // find power usage
        await solarPowerRemain_3s.find({ month: req.query.month, year: req.query.year }, function (err, results) {
            if (err) throw err;
            results.forEach(function (row) {
                temp_power_remain_3.push({ "day": row.day, 'power': row.power,'fullyear': row.fullyear,'month': row.month,'year': row.year })
            });
            res.status(200).send(temp_power_remain_3);
        })
    });
    // =====================================
    //  Speed report ===================
    // =====================================
    app.get('/timeSpeed', async function (req, res) {
        var temp_speed = [];
        // find speed
        await speedMotors.find({ day: req.query.today }, function (err, results) {
            if (err) throw err;
            results.forEach(function (row) {
                temp_speed.push({ 'day': row.day, 'time': row.time, 'speed': row.speed, 'status': row.status })
            });
            res.status(200).send(temp_speed);
        })

    });
    // =====================================
    //  Speed report 1 ===================
    // =====================================
    app.get('/timeSpeed_1', async function (req, res) {
        var temp_speed_1 = [];
        // find speed
        await speedMotor_1s.find({ day: req.query.today }, function (err, results) {
            if (err) throw err;
            results.forEach(function (row) {
                temp_speed_1.push({ 'day': row.day, 'time': row.time, 'speed': row.speed, 'status': row.status })
            });
            res.status(200).send(temp_speed_1);
        })

    });
    // =====================================
    //  Speed report 2 ===================
    // =====================================
    app.get('/timeSpeed_2', async function (req, res) {
        var temp_speed_2 = [];
        // find speed
        await speedMotor_2s.find({ day: req.query.today }, function (err, results) {
            if (err) throw err;
            results.forEach(function (row) {
                temp_speed_2.push({ 'day': row.day, 'time': row.time, 'speed': row.speed, 'status': row.status })
            });
            res.status(200).send(temp_speed_2);
        })

    });
    // =====================================
    //  Speed report 3 ===================
    // =====================================
    app.get('/timeSpeed_3', async function (req, res) {
        var temp_speed_3 = [];
        // find speed
        await speedMotor_3s.find({ day: req.query.today }, function (err, results) {
            if (err) throw err;
            results.forEach(function (row) {
                temp_speed_3.push({ 'day': row.day, 'time': row.time, 'speed': row.speed, 'status': row.status })
            });
            res.status(200).send(temp_speed_3);
        })

    });
    // 
};

// Hàm được sử dụng để kiểm tra đã login hay chưa
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login')
}
