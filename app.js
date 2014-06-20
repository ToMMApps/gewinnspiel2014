var config = require('./config');

var express = require('express');
var http = require('http');
var Server = require('mongodb').Server;
var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var bodyParser = require('body-parser');
var app = express();

app.set('ip', config.server.ip);
app.set('port', config.server.port);

app.use(bodyParser());
//app.use(express.methodOverride());
//app.use(app.router);


function appDB() {
    var db = new Db(config.mongodb.db, new Server(config.mongodb.hostname, config.mongodb.port), {safe: true}, {auto_reconnect: true});
    db.open(function(e, d) {
        if(e) {
            console.error(e);
        } else {
            console.info('Connected to Database');
            if(config.mongodb.username && config.mongodb.password) {
                db.authenticate(config.mongodb.username, config.mongodb.password, function(err, result) {
                    if(err) {
                        console.error(err);
                    } else {
                        console.info('authenticated on Database');
                    }
                });
            }
        }
    })
    this.database = db;
    this.messages = db.collection('messages');
}

var db = new appDB();

function getObjectId(id) {
    var BSON = require('mongodb').BSONPure;
    var ident = {
        _id: BSON.ObjectID.createFromHexString(id)
    };
    return ident;
}

/**
 * This WebService return a list of all Messages newer than the parameter date and time
 * 
 * @params	date	String //Format: 15.04.2014
 * @params	time	String //Format: 10:30:25
 * 
 * @return	{
 * 				error: { 
 * 					message: String,	//errormessage 
 * 					code: int			//HTTP errorcode
 * 				} or
 * 				result: [{
 * 					_id:		String	MongoDB ID,
 * 					message: 	String 	max 255 char
 * 					date:		Date	Javascript Date object
 * 				}, ... ]		JSON-Array
 * 					
 * 				
 * 			}
 * @author	Björn Wenzel ToMM Apps UG (haftungsbeschränkt)
 * 
 */
app.get('/message/:date/:time', function(req, res) {
	try {
		var date = convertToDateTime(req.params.date, req.params.time);
		db.messages.find({ date: { $gte: date }}).toArray(function(err, data) {
			if(err) {
				res.send({
					error: {
						message: 'Es ist ein Fehler beim lesen in der Datenbank aufgetreten!',
						code: 500
					}
				});
			} else {
				res.send({ result: data });
			}
		});
	} catch(ex) {
		console.log(ex);
		res.send({
			error: {
				message: 'Ungültige Parameter (date und time)',
				error: 400
			}
		});
	}
	
});




/**
 * This WebService get a new posted message and write it to mongodb
 * 
 * @body	{
 * 				username: String,	//name of the user
 * 				message: String,	//message, with 255 chars, longer messages will be cutted
 * 			}
 * @return	{
 * 				error: { 
 * 					message: String,	//errormessage 
 * 					code: int			//HTTP errorcode
 * 				} or
 * 				result: mongodb id of new entry
 * 					
 * 				
 * 			}
 * @author 	Björn Wenzel ToMM Apps UG (haftungsbeschränkt)
 * 
 */
app.post('/message', function(req, res) {
	var mongoDBData = {
		username: req.body.username
	};
	mongoDBData.message = req.body.message.length > 255 ? req.body.message.split(0, 254) : req.body.message;
	mongoDBData.date = new Date();
	db.messages.insert(mongoDBData, { safe: true, upsert: true }, function(err, object) {
		if(err) {
			res.send({
				error: {
					message: 'Es ist ein Fehler beim schreiben in die Datenbank aufgetreten!',
					code: 500
				}
			});
		} else {
			res.send({ result: mongoDBData._id });
		}
	});
});

/**
 * This Function convert a datestring and a timestring to date object
 * @params	datestring		//Format: 17.08.2014	dd.MM.yyyy
 * @params	timestring		//Format: 10:30:25		hh.mm.ss
 */
function convertToDateTime(datestring, timestring) {
    var _date = datestring.split('.');
    var _time = timestring.split(':');
    var dateelement = new Date();
    dateelement.setDate(_date[0]);
    dateelement.setMonth(_date[1]-1);
    dateelement.setYear(_date[2]);
    dateelement.setHours(_time[0]);
    dateelement.setMinutes(_time[1]);
    dateelement.setSeconds(_time[2]);
    return dateelement;
}

http.createServer(app).listen(app.get('port'), function(){
     console.log('Scisys Server listening on port ' + app.get('port'));
});
