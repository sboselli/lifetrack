var Datastore = require('nedb');

var db = {};
db.users = new Datastore({ filename: 'db/users.db', autoload: true });
db.lt = new Datastore({ filename: 'db/lt.db', autoload: true });


var User = {
	add: function(user, cb) { // TODO: check if user exists !!
		var user = user || null;

		if (!user) cb('No user data provided!');

		user.dateAdded = new Date();

		db.users.insert(user, function(err, user) {
			if (err) {
				console.log(err)
				cb('Failed to insert user data.')
			};
			console.log(user);

			// Create
			// db.lt.insert({user: user._id, data: {}}, function(err, user) {
			// 	cb(null, user);
			// })
		});
	},
	findOne: function(data, cb) {
		db.users.findOne(data, function(err, doc) {
			if (err) {
				console.log(err)
				cb(err)
			};

			cb(null, doc);
		});
	},
	findById: function(id, cb) {
		db.users.findOne({ '_id': id }, function(err, doc) {
			if (err) {
				console.log(err)
				cb(err)
			};

			cb(null, doc);
		});
	},
}
module.exports = User;