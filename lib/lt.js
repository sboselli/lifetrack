var Datastore = require('nedb');

var db = new Datastore({ filename: 'db/lt.db', autoload: true });

var lt = {
	add: function(data, cb) {
		var data = data || null;

		data.dateAdded = new Date();

		db.insert(data, function(err, newDoc) {
			if (err) {
				console.log(err)
				return false;
			};

			cb();
		});
	}
};
module.exports = lt;