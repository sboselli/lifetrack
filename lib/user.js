var User = {
	add: function(user, cb) { // TODO: check if user exists !!
		var user = user || null;

		if (!user) cb('No user data provided!');

		user.dateAdded = Date.now();

		ltdb.users.insert(user, function(err, user) {
			if (err) {
				console.log(err)
				cb('Failed to insert user data.')
			};

			// Create user in data table
			// ltdb.lt.insert({ _id: user._id, logs: []}, function(err, user) {
			// 	if (err) {
			// 		console.log(err);
			// 		cb('Failed to create user data storage')
			// 	}
			// 	cb(null, user);
			// })
		});
	},
	findOne: function(data, cb) {
		ltdb.users.findOne(data, function(err, doc) {
			if (err) {
				console.log(err)
				cb(err)
			};

			cb(null, doc);
		});
	},
	findById: function(id, cb) {
		ltdb.users.findOne({ '_id': id }, function(err, doc) {
			if (err) {
				console.log(err)
				cb(err)
			};

			cb(null, doc);
		});
	},
}
module.exports = User;