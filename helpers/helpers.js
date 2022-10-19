let register = function (Handlebars) {
	let helpers = {
	// 	// ifEquals: function (arg1, arg2, options) {
	// 	// 	return arg1 == arg2 ? options.fn(this) : options.inverse(this);
	// 	// },

		section: function (name, options) {
			if (!this._sections) this._sections = {};
			this._sections[name] = options.fn(this);
			return null;
		},
	};

	if (Handlebars && typeof Handlebars.registerHelper === "function") {
		// register helpers
		for (let prop in helpers) {
			Handlebars.registerHelper(prop, helpers[prop]);
		}
	} else {
		// just return helpers object if we can't register helpers here
		return helpers;
	}
};

module.exports.register = register;
module.exports.helpers = register(null);
