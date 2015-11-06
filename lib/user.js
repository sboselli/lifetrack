var User = {
	add: function(user, cb) { // TODO: check if user exists !!
		var user = user || null;

		if (!user) cb('No user data provided!');

		ltdb.users.insert(user, function(err, user) {
			if (err) {
				console.log(err)
				cb(err)
			};

			cb(null, user);
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