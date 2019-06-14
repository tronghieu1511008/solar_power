// server.js
var express = require('express');
var app = express();
var port = 8080;
//var http = require('http').Server(app);

var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var server = app.listen(port);
var configDB = require('./config/database.js');

// get Mongoose speedMotor
var speedMotors = require('./app/models/speedMotor')
var speedMotor_1s = require('./app/models/speedMotor_1')
var speedMotor_2s = require('./app/models/speedMotor_2')
var speedMotor_3s = require('./app/models/speedMotor_3')
// get Mongoose Power generate
var solarPowers = require('./app/models/solarPower')
var solarPower_1s = require('./app/models/solarPower_1')
var solarPower_2s = require('./app/models/solarPower_2')
var solarPower_3s = require('./app/models/solarPower_3')
// get mongoose power usage
var solarPowerUsages = require('./app/models/solarPowerUsage')
var solarPowerUsage_1s = require('./app/models/solarPowerUsage_1')
var solarPowerUsage_2s = require('./app/models/solarPowerUsage_2')
var solarPowerUsage_3s = require('./app/models/solarPowerUsage_3')
// get mongoose power remain
var solarPowerRemains = require('./app/models/solarPowerRemain')
var solarPowerRemain_1s = require('./app/models/solarPowerRemain_1')
var solarPowerRemain_2s = require('./app/models/solarPowerRemain_2')
var solarPowerRemain_3s = require('./app/models/solarPowerRemain_3')
// socket io
var io = require('socket.io')(server);
// MQTT khai báo kết nối
const mqtt = require('mqtt')
const options = {
    port: 13103,
    host: 'mqtt://m24.cloudmqtt.com',
    clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
    keepalive: 60,
    reconnectPeriod: 1000,
    protocolId: 'MQIsdp',
    protocolVersion: 3,
    username: "pzzdaszj",
    password: "BREOiwV6R9hC",
    clean: true,
    encoding: 'utf8'
};
const client = mqtt.connect('mqtt://m24.cloudmqtt.com',options)
// const client = mqtt.connect('mqtt://192.168.1.5')
mongoose.connect(configDB.url); // connect tới database 

require('./config/passport')(passport); // 

// public css....
app.use(express.static(__dirname + '/public'));
// Cấu hình ứng dụng express
app.use(morgan('dev')); // sử dụng để log mọi request ra console
app.use(cookieParser()); // sử dụng để đọc thông tin từ cookie
app.use(bodyParser()); // lấy thông tin từ form HTML

app.set('view engine', 'ejs'); // chỉ định view engine là ejs


app.use(session({ name: 'for logging', secret: 'xxxxxxxxxxxxx', maxAge: 30 * 24 * 60 * 60 * 1000 }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./app/routes.js')(app, passport); // load các routes từ các nguồn

//khai báo conect tới Server SocketIO
io.on('connection', function (socket) {
    // ===========================
    // = Publish motor Station 0 =
    // ===========================
    //  Server receive Start/stop from client
    socket.on('client-send-data-start/stop', function (data) {
        client.publish("server-to-plc-star/stop", data, { qos: 2 })
    });
    // Server receive data SetSpeed from Client
    socket.on('client-send-data-setSpeed', function (data) {
        client.publish("server-to-plc-setSpeed", data, { qos: 2 });
        // io.sockets.emit('server-send-data-setSpeed',data)
    });
    // ===========================
    // = Publish motor Station 1 =
    // ===========================
    //  Server receive Start/stop from client
    socket.on('client-send-data-start/stop-1', function (data) {
        client.publish("server-to-plc-star/stop-1", data, { qos: 2 })
    });
    // Server receive data SetSpeed from Client
    socket.on('client-send-data-setSpeed-1', function (data) {
        client.publish("server-to-plc-setSpeed-1", data, { qos: 2 });
    });
    // ===========================
    // = Publish motor Station 2 =
    // ===========================
    //  Server receive Start/stop from client
    socket.on('client-send-data-start/stop-2', function (data) {
        client.publish("server-to-plc-star/stop-2", data, { qos: 2 })
    });
    // Server receive data SetSpeed from Client
    socket.on('client-send-data-setSpeed-2', function (data) {
        client.publish("server-to-plc-setSpeed-2", data, { qos: 2 });
    });
    // ===========================
    // = Publish motor Station 3 =
    // ===========================
    //  Server receive Start/stop from client
    socket.on('client-send-data-start/stop-3', function (data) {
        client.publish("server-to-plc-star/stop-3", data, { qos: 2 })
    });
    // Server receive data SetSpeed from Client
    socket.on('client-send-data-setSpeed-3', function (data) {
        client.publish("server-to-plc-setSpeed-3", data, { qos: 2 });
    });

    // end
});
// khai báo sử dụng MQTT
client.on('connect', function () { // When connected

                            //==============================
                            //==== Motor Station 0 =========
                            //==============================

    // receive current speed from plc
    client.subscribe('plc-to-broker-current-speed', function () {
        // when a message arrives, do something with it
        client.on('message', function (topic, message) {
            if (topic == 'plc-to-broker-current-speed') {
                io.emit('server-send-speed-data', message.toString())
                // save data speedmotor1

                var speedMotor = new speedMotors();
                speedMotor.time = (new Date()).toLocaleTimeString("en-US", {timeZone: "Asia/Jakarta"});
                speedMotor.day = today;
                speedMotor.speed = parseFloat(message);
                if (parseFloat(message) >= 0.0 && parseFloat(message) < 300.0) {
                    speedMotor.status = 'Low Low';
                } else if (parseFloat(message) >= 300.0 && parseFloat(message) < 900.0) {
                    speedMotor.status = 'Low'
                } else if (parseFloat(message) >= 900.0 && parseFloat(message) < 1300.0) {
                    speedMotor.status = 'High'
                } else {
                    speedMotor.status = 'High High'
                }
                if (speedMotor.status != temp_status) {
                    temp_status = speedMotor.status;
                    speedMotor.save(function (err) {
                        if (err)
                            throw err;
                    });
                }
            }
        });
    });
    // receive status controlbyWeb inverter from plc
    client.subscribe('plc-to-broker-status-controlByWeb', function () {
        // when a message arrives, do something with it
        client.on('message', function (topic, message) {
            if (topic == 'plc-to-broker-status-controlByWeb') {
                io.emit('server-send-status-controlByWeb', message.toString())
            }
        });
    });
    // receive status active inverter from plc
    client.subscribe('plc-to-broker-status-active', function () {
        // when a message arrives, do something with it
        client.on('message', function (topic, message) {
            if (topic == 'plc-to-broker-status-active') {
                io.emit('server-send-status-active', message.toString())
            }
        });
    });
    // receive Fault inverter from plc
    client.subscribe('plc-to-broker-fault-active', function () {
        // when a message arrives, do something with it
        client.on('message', function (topic, message) {
            if (topic == 'plc-to-broker-fault-active') {
                io.emit('server-send-fault-active', message.toString())
            }
        });
    });
    //  received setpoint Speed from plc
    client.subscribe('plc-to-broker-setpoint-speed', function () {
        // when a message arrives, do something with it
        client.on('message', function (topic, message) {
            if (topic == 'plc-to-broker-setpoint-speed') {
                io.emit('server-send-setpoint-speed', message.toString())
            }
        });
    });
                            //==============================
                            //==== Motor Station 1 =========
                            //==============================
    // receive current speed 1 from plc
    client.subscribe('plc-to-broker-current-speed-1', function () {
        // when a message arrives, do something with it
        client.on('message', function (topic, message) {
            if (topic == 'plc-to-broker-current-speed-1') {
                io.emit('server-send-speed-data-1', message.toString())
                // save data speedmotor1

                var speedMotor = new speedMotor_1s();
                speedMotor.time = (new Date()).toLocaleTimeString("en-US", {timeZone: "Asia/Jakarta"});
                speedMotor.day = today;
                speedMotor.speed = parseFloat(message);
                if (parseFloat(message) >= 0.0 && parseFloat(message) < 300.0) {
                    speedMotor.status = 'Low Low';
                } else if (parseFloat(message) >= 300.0 && parseFloat(message) < 900.0) {
                    speedMotor.status = 'Low'
                } else if (parseFloat(message) >= 900.0 && parseFloat(message) < 1300.0) {
                    speedMotor.status = 'High'
                } else {
                    speedMotor.status = 'High High'
                }
                if (speedMotor.status != temp_status_1) {
                    temp_status_1 = speedMotor.status;
                    speedMotor.save(function (err) {
                        if (err)
                            throw err;
                    });
                }
            }
        });
    });
    // receive status controlbyWeb inverter 1 from plc
    client.subscribe('plc-to-broker-status-controlByWeb-1', function () {
        // when a message arrives, do something with it
        client.on('message', function (topic, message) {
            if (topic == 'plc-to-broker-status-controlByWeb-1') {
                io.emit('server-send-status-controlByWeb-1', message.toString())
            }
        });
    });
    // receive status active inverter 1 from plc
    client.subscribe('plc-to-broker-status-active-1', function () {
        // when a message arrives, do something with it
        client.on('message', function (topic, message) {
            if (topic == 'plc-to-broker-status-active-1') {
                io.emit('server-send-status-active-1', message.toString())
            }
        });
    });
    // receive Fault inverter 1 from plc
    client.subscribe('plc-to-broker-fault-active-1', function () {
        // when a message arrives, do something with it
        client.on('message', function (topic, message) {
            if (topic == 'plc-to-broker-fault-active-1') {
                io.emit('server-send-fault-active-1', message.toString())
            }
        });
    });
    //  received setpoint Speed 1 from plc
    client.subscribe('plc-to-broker-setpoint-speed-1', function () {
        // when a message arrives, do something with it
        client.on('message', function (topic, message) {
            if (topic == 'plc-to-broker-setpoint-speed-1') {
                io.emit('server-send-setpoint-speed-1', message.toString())
            }
        });
    });
                            //==============================
                            //==== Motor Station 2 =========
                            //==============================
    // receive current speed 2 from plc
    client.subscribe('plc-to-broker-current-speed-2', function () {
        // when a message arrives, do something with it
        client.on('message', function (topic, message) {
            if (topic == 'plc-to-broker-current-speed-2') {
                io.emit('server-send-speed-data-2', message.toString())
                // save data speedmotor2

                var speedMotor = new speedMotor_2s();
                speedMotor.time = (new Date()).toLocaleTimeString("en-US", {timeZone: "Asia/Jakarta"});
                speedMotor.day = today;
                speedMotor.speed = parseFloat(message);
                if (parseFloat(message) >= 0.0 && parseFloat(message) < 300.0) {
                    speedMotor.status = 'Low Low';
                } else if (parseFloat(message) >= 300.0 && parseFloat(message) < 900.0) {
                    speedMotor.status = 'Low'
                } else if (parseFloat(message) >= 900.0 && parseFloat(message) < 1300.0) {
                    speedMotor.status = 'High'
                } else {
                    speedMotor.status = 'High High'
                }
                if (speedMotor.status != temp_status_2) {
                    temp_status_2 = speedMotor.status;
                    speedMotor.save(function (err) {
                        if (err)
                            throw err;
                    });
                }
            }
        });
    });
    // receive status controlbyWeb inverter 2 from plc
    client.subscribe('plc-to-broker-status-controlByWeb-2', function () {
        // when a message arrives, do something with it
        client.on('message', function (topic, message) {
            if (topic == 'plc-to-broker-status-controlByWeb-2') {
                io.emit('server-send-status-controlByWeb-2', message.toString())
            }
        });
    });
    // receive status active inverter 2 from plc
    client.subscribe('plc-to-broker-status-active-2', function () {
        // when a message arrives, do something with it
        client.on('message', function (topic, message) {
            if (topic == 'plc-to-broker-status-active-2') {
                io.emit('server-send-status-active-2', message.toString())
            }
        });
    });
    // receive Fault inverter 2 from plc
    client.subscribe('plc-to-broker-fault-active-2', function () {
        // when a message arrives, do something with it
        client.on('message', function (topic, message) {
            if (topic == 'plc-to-broker-fault-active-2') {
                io.emit('server-send-fault-active-2', message.toString())
            }
        });
    });
    //  received setpoint Speed 2 from plc
    client.subscribe('plc-to-broker-setpoint-speed-2', function () {
        // when a message arrives, do something with it
        client.on('message', function (topic, message) {
            if (topic == 'plc-to-broker-setpoint-speed-2') {
                io.emit('server-send-setpoint-speed-2', message.toString())
            }
        });
    });
                            //==============================
                            //==== Motor Station 3 =========
                            //==============================
// receive current speed 3 from plc
client.subscribe('plc-to-broker-current-speed-3', function () {
    // when a message arrives, do something with it
    client.on('message', function (topic, message) {
        if (topic == 'plc-to-broker-current-speed-3') {
            io.emit('server-send-speed-data-3', message.toString())
            // save data speedmotor3

            var speedMotor = new speedMotor_3s();
            speedMotor.time = (new Date()).toLocaleTimeString("en-US", {timeZone: "Asia/Jakarta"});
            speedMotor.day = today;
            speedMotor.speed = parseFloat(message);
            if (parseFloat(message) >= 0.0 && parseFloat(message) < 300.0) {
                speedMotor.status = 'Low Low';
            } else if (parseFloat(message) >= 300.0 && parseFloat(message) < 900.0) {
                speedMotor.status = 'Low'
            } else if (parseFloat(message) >= 900.0 && parseFloat(message) < 1300.0) {
                speedMotor.status = 'High'
            } else {
                speedMotor.status = 'High High'
            }
            if (speedMotor.status != temp_status_3) {
                temp_status_3 = speedMotor.status;
                speedMotor.save(function (err) {
                    if (err)
                        throw err;
                });
            }
        }
    });
});
// receive status controlbyWeb inverter 3 from plc
client.subscribe('plc-to-broker-status-controlByWeb-3', function () {
    // when a message arrives, do something with it
    client.on('message', function (topic, message) {
        if (topic == 'plc-to-broker-status-controlByWeb-3') {
            io.emit('server-send-status-controlByWeb-3', message.toString())
        }
    });
});
// receive status active inverter 3 from plc
client.subscribe('plc-to-broker-status-active-3', function () {
    // when a message arrives, do something with it
    client.on('message', function (topic, message) {
        if (topic == 'plc-to-broker-status-active-3') {
            io.emit('server-send-status-active-3', message.toString())
        }
    });
});
// receive Fault inverter 3 from plc
client.subscribe('plc-to-broker-fault-active-3', function () {
    // when a message arrives, do something with it
    client.on('message', function (topic, message) {
        if (topic == 'plc-to-broker-fault-active-3') {
            io.emit('server-send-fault-active-3', message.toString())
        }
    });
});
//  received setpoint Speed 3 from plc
client.subscribe('plc-to-broker-setpoint-speed-3', function () {
    // when a message arrives, do something with it
    client.on('message', function (topic, message) {
        if (topic == 'plc-to-broker-setpoint-speed-3') {
            io.emit('server-send-setpoint-speed-3', message.toString())
        }
    });
});

                            //==============================
                            //==== Solar power Station 0 ===
                            //==============================
    // received power from plc
    client.subscribe('plc-to-broker-power', function () {
        // when a message arrives, do something with it
        client.on('message', function (topic, message) {
            if (topic == 'plc-to-broker-power') {
                io.emit('server-send-power', message.toString())
            }
        });
    });
    // received voltage from plc
    client.subscribe('plc-to-broker-voltage', function () {
        // when a message arrives, do something with it
        client.on('message', function (topic, message) {
            if (topic == 'plc-to-broker-voltage') {
                io.emit('server-send-voltage', message.toString())
            }
        });
    });
    // received ampe from plc
    client.subscribe('plc-to-broker-ampe', function () {
        // when a message arrives, do something with it
        client.on('message', function (topic, message) {
            if (topic == 'plc-to-broker-ampe') {
                io.emit('server-send-ampe', message.toString())
            }
        });
    });
    // received power-generate from plc
    client.subscribe('plc-to-broker-power-generate', function () {
        // when a message arrives, do something with it
        client.on('message', function (topic, message) {
            if (topic == 'plc-to-broker-power-generate') {
                io.emit('server-send-powerGenerate', message.toString())

                // save data Power Generator from plc to Mongoose
                var temp_power = parseFloat(message);

                solarPowers.findOneAndUpdate({ year: temp_year, month: temp_month, day: temp_day, fullyear: fullyear }, { $set: { power: temp_power } }, { upsert: true }, function (err, doc) {

                    if (err) return false;

                });

            }
        });
    });
    // received Power Usage from plc
    client.subscribe('plc-to-broker-power-usage', function () {
        // when a message arrives, do something with it
        client.on('message', function (topic, message) {
            if (topic == 'plc-to-broker-power-usage') {
                io.emit('server-send-power-usage', message.toString())

                // save data Power Usage from plc to Mongoose
                var temp_power_usage = parseFloat(message);

                solarPowerUsages.findOneAndUpdate({ year: temp_year, month: temp_month, day: temp_day, fullyear: fullyear}, { $set: { power: temp_power_usage } }, { upsert: true }, function (err, doc) {

                    if (err) return false;

                });
            }
        });
    });
    // received Power Remain from plc
    client.subscribe('plc-to-broker-power-remain', function () {
        // when a message arrives, do something with it
        client.on('message', function (topic, message) {
            if (topic == 'plc-to-broker-power-remain') {
                io.emit('server-send-power-remain', message.toString())

                // save data Power Remain from plc to Mongoose
                var temp_power_remain = parseFloat(message);

                solarPowerRemains.findOneAndUpdate({ year: temp_year, month: temp_month, day: temp_day, fullyear: fullyear}, { $set: { power: temp_power_remain } }, { upsert: true }, function (err, doc) {

                    if (err) return false;

                });
            }
        });
    });
                                //==============================
                                //==== Solar power Station 1 ===
                                //==============================
    
    // received power from plc
    client.subscribe('plc-to-broker-power-1', function () {
        // when a message arrives, do something with it
        client.on('message', function (topic, message) {
            if (topic == 'plc-to-broker-power-1') {
                io.emit('server-send-power-1', message.toString())
            }
        });
    });
    // received voltage from plc
    client.subscribe('plc-to-broker-voltage-1', function () {
        // when a message arrives, do something with it
        client.on('message', function (topic, message) {
            if (topic == 'plc-to-broker-voltage-1') {
                io.emit('server-send-voltage-1', message.toString())
            }
        });
    });
    // received ampe from plc
    client.subscribe('plc-to-broker-ampe-1', function () {
        // when a message arrives, do something with it
        client.on('message', function (topic, message) {
            if (topic == 'plc-to-broker-ampe-1') {
                io.emit('server-send-ampe-1', message.toString())
            }
        });
    });
    // received power-generate from plc
    client.subscribe('plc-to-broker-power-generate-1', function () {
        // when a message arrives, do something with it
        client.on('message', function (topic, message) {
            if (topic == 'plc-to-broker-power-generate-1') {
                io.emit('server-send-powerGenerate-1', message.toString())

                // save data Power Generator from plc to Mongoose
                var temp_power_1 = parseFloat(message);

                solarPower_1s.findOneAndUpdate({ year: temp_year, month: temp_month, day: temp_day, fullyear: fullyear}, { $set: { power: temp_power_1 } }, { upsert: true }, function (err, doc) {

                    if (err) return false;

                });

            }
        });
    });
    // received Power Usage from plc
    client.subscribe('plc-to-broker-power-usage-1', function () {
        // when a message arrives, do something with it
        client.on('message', function (topic, message) {
            if (topic == 'plc-to-broker-power-usage-1') {
                io.emit('server-send-power-usage-1', message.toString())

                // save data Power Usage from plc to Mongoose
                var temp_power_usage_1 = parseFloat(message);

                solarPowerUsage_1s.findOneAndUpdate({ year: temp_year, month: temp_month, day: temp_day, fullyear: fullyear}, { $set: { power: temp_power_usage_1 } }, { upsert: true }, function (err, doc) {

                    if (err) return false;

                });
            }
        });
    });
    // received Power Remain from plc
    client.subscribe('plc-to-broker-power-remain-1', function () {
        // when a message arrives, do something with it
        client.on('message', function (topic, message) {
            if (topic == 'plc-to-broker-power-remain-1') {
                io.emit('server-send-power-remain-1', message.toString())

                // save data Power Remain from plc to Mongoose
                var temp_power_remain_1 = parseFloat(message);

                solarPowerRemain_1s.findOneAndUpdate({ year: temp_year, month: temp_month, day: temp_day, fullyear: fullyear}, { $set: { power: temp_power_remain_1 } }, { upsert: true }, function (err, doc) {

                    if (err) return false;

                });
            }
        });
    });
                            //==============================
                            //==== Solar power Station 2 ===
                            //==============================
    // received power from plc
    client.subscribe('plc-to-broker-power-2', function () {
        // when a message arrives, do something with it
        client.on('message', function (topic, message) {
            if (topic == 'plc-to-broker-power-2') {
                io.emit('server-send-power-2', message.toString())
            }
        });
    });
    // received voltage from plc
    client.subscribe('plc-to-broker-voltage-2', function () {
        // when a message arrives, do something with it
        client.on('message', function (topic, message) {
            if (topic == 'plc-to-broker-voltage-2') {
                io.emit('server-send-voltage-2', message.toString())
            }
        });
    });
    // received ampe from plc
    client.subscribe('plc-to-broker-ampe-2', function () {
        // when a message arrives, do something with it
        client.on('message', function (topic, message) {
            if (topic == 'plc-to-broker-ampe-2') {
                io.emit('server-send-ampe-2', message.toString())
            }
        });
    });
    // received power-generate from plc
    client.subscribe('plc-to-broker-power-generate-2', function () {
        // when a message arrives, do something with it
        client.on('message', function (topic, message) {
            if (topic == 'plc-to-broker-power-generate-2') {
                io.emit('server-send-powerGenerate-2', message.toString())

                // save data Power Generator from plc to Mongoose
                var temp_power_2 = parseFloat(message);

                solarPower_2s.findOneAndUpdate({ year: temp_year, month: temp_month, day: temp_day, fullyear: fullyear}, { $set: { power: temp_power_2 } }, { upsert: true }, function (err, doc) {

                    if (err) return false;

                });

            }
        });
    });
    // received Power Usage from plc
    client.subscribe('plc-to-broker-power-usage-2', function () {
        // when a message arrives, do something with it
        client.on('message', function (topic, message) {
            if (topic == 'plc-to-broker-power-usage-2') {
                io.emit('server-send-power-usage-2', message.toString())

                // save data Power Usage from plc to Mongoose
                var temp_power_usage_2 = parseFloat(message);

                solarPowerUsage_2s.findOneAndUpdate({ year: temp_year, month: temp_month, day: temp_day, fullyear: fullyear}, { $set: { power: temp_power_usage_2 } }, { upsert: true }, function (err, doc) {

                    if (err) return false;

                });
            }
        });
    });
    // received Power Remain from plc
    client.subscribe('plc-to-broker-power-remain-2', function () {
        // when a message arrives, do something with it
        client.on('message', function (topic, message) {
            if (topic == 'plc-to-broker-power-remain-2') {
                io.emit('server-send-power-remain-2', message.toString())

                // save data Power Remain from plc to Mongoose
                var temp_power_remain_2 = parseFloat(message);

                solarPowerRemain_2s.findOneAndUpdate({ year: temp_year, month: temp_month, day: temp_day, fullyear: fullyear}, { $set: { power: temp_power_remain_2 } }, { upsert: true }, function (err, doc) {

                    if (err) return false;

                });
            }
        });
    });
                            //==============================
                            //==== Solar power Station 3 ===
                            //==============================
    // received power from plc
    client.subscribe('plc-to-broker-power-3', function () {
        // when a message arrives, do something with it
        client.on('message', function (topic, message) {
            if (topic == 'plc-to-broker-power-3') {
                io.emit('server-send-power-3', message.toString())
            }
        });
    });
    // received voltage from plc
    client.subscribe('plc-to-broker-voltage-3', function () {
        // when a message arrives, do something with it
        client.on('message', function (topic, message) {
            if (topic == 'plc-to-broker-voltage-3') {
                io.emit('server-send-voltage-3', message.toString())
            }
        });
    });
    // received ampe from plc
    client.subscribe('plc-to-broker-ampe-3', function () {
        // when a message arrives, do something with it
        client.on('message', function (topic, message) {
            if (topic == 'plc-to-broker-ampe-3') {
                io.emit('server-send-ampe-3', message.toString())
            }
        });
    });
    // received power-generate from plc
    client.subscribe('plc-to-broker-power-generate-3', function () {
        // when a message arrives, do something with it
        client.on('message', function (topic, message) {         
            if (topic == 'plc-to-broker-power-generate-3') {
                io.emit('server-send-powerGenerate-3', message.toString())
                // save data Power Generator from plc to Mongoose
                var temp_power_3 = parseFloat(message);

                solarPower_3s.findOneAndUpdate({ year: temp_year, month: temp_month, day: temp_day, fullyear: fullyear}, { $set: { power: temp_power_3 } }, { upsert: true }, function (err, doc) {

                    if (err) return false;

                });

            }
        });
    });
    // received Power Usage from plc
    client.subscribe('plc-to-broker-power-usage-3', function () {
        // when a message arrives, do something with it
        client.on('message', function (topic, message) {
            if (topic == 'plc-to-broker-power-usage-3') {
                io.emit('server-send-power-usage-3', message.toString())

                // save data Power Usage from plc to Mongoose
                var temp_power_usage_3 = parseFloat(message);

                solarPowerUsage_3s.findOneAndUpdate({ year: temp_year, month: temp_month, day: temp_day, fullyear: fullyear}, { $set: { power: temp_power_usage_3 } }, { upsert: true }, function (err, doc) {

                    if (err) return false;

                });
            }
        });
    });
    // received Power Remain from plc
    client.subscribe('plc-to-broker-power-remain-3', function () {
        // when a message arrives, do something with it
        client.on('message', function (topic, message) {
            if (topic == 'plc-to-broker-power-remain-3') {
                io.emit('server-send-power-remain-3', message.toString())

                // save data Power Remain from plc to Mongoose
                var temp_power_remain_3 = parseFloat(message);

                solarPowerRemain_3s.findOneAndUpdate({ year: temp_year, month: temp_month, day: temp_day, fullyear: fullyear}, { $set: { power: temp_power_remain_3 } }, { upsert: true }, function (err, doc) {

                    if (err) return false;

                });
            }
        });
    });

    //---------------------
    // --------End---------
    // --------------------
});

// get day/mon/year 
var temp_year = new Date().getFullYear();
var temp_month = new Date().getMonth() + 1;
var temp_day = new Date().getDate();
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
today = mm + '/' + dd + '/' + yyyy;
fullyear =  dd + '/'+ mm + '/' + yyyy;
// function get mumber day in month
function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}
// tạo biến tạm Speed Status
var temp_status = '';
var temp_status_1 = '';
var temp_status_2 = '';
var temp_status_3 = '';





