var lt = {
	quickAdd: function(log, cb) {

		if (!log) cb('ERROR: No log provided.');

		ltdb.logs.insert(log, function(err, newLog) {
			if (err) cb(err);

			cb(null, newLog);
		});

		// // One to many embedded array, no go
		// ltdb.lt.update({ _id: user }, {$push: { logs: data }}, {upsert: true}, function() {
		// 	cb();
		// });
	},
	getAllLogs: function(user, cb) {
		// Get all user data
		ltdb.logs.find({user: user}, function(err, docs) {
			if (err) cb(err);

			cb(null, docs);
		});
	},
	parseLogs: function(logs, cb) {
		if (!logs || logs == '') cb('No logs provided.');

		for (var i = 0; i < logs.length; i++) {

		}
	}
};
module.exports = lt;