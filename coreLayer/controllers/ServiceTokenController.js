const {ERRORS} = require("../config/literals");
const {isObjectEmpty} = require("../helpers/validator");
const modelService = require("../services/ServiceTokenService");

module.exports = {
	create: async (req, res) => {
		try {
			if (isObjectEmpty(req.body)) {
				throw new Error(ERRORS.INVALID_POST_DATA);
			}
			let responseObj = await modelService.create(req.body);
			res.send(responseObj);
		} catch (err) {
			res.status(400).send({ error: err.message });
		}
	},

	list: async (req, res) => {
		try {
			let responseObj = await modelService.list(req.query);
			res.send(responseObj);
		} catch (err) {
			res.status(400).send({ error: err.message });
		}
	},
	
	get: async (req, res) => {
		try {
			if (isObjectEmpty(req.query)) {
				throw new Error(ERRORS.INVALID_GET_QUERY);
			}
			let responseObj = await modelService.get(req.query);
			res.send(responseObj);
		} catch (err) {
			res.status(400).send({ error: err.message });
		}
	},

	update: async (req, res) => {
		try {
			if (isObjectEmpty(req.query)) {
				throw new Error(ERRORS.INVALID_GET_QUERY);
			}
			if (isObjectEmpty(req.body)) {
				throw new Error(ERRORS.INVALID_POST_DATA);
			}
			let responseObj = await modelService.update(req.query, req.body);
			res.send(responseObj);
		} catch (err) {
			res.status(400).send({ error: err.message });
		}
	},

	updateOne: async (req, res) => {
		try {
			if (isObjectEmpty(req.query)) {
				throw new Error(ERRORS.INVALID_GET_QUERY);
			}
			if (isObjectEmpty(req.body)) {
				throw new Error(ERRORS.INVALID_POST_DATA);
			}
			let responseObj = await modelService.updateOne(req.query, req.body);
			res.send(responseObj);
		} catch (err) {
			res.status(400).send({ error: err.message });
		}
	},

	delete: async (req, res) => {
		try {
			if (isObjectEmpty(req.query)) {
				throw new Error(ERRORS.INVALID_GET_QUERY);
			}
			let responseObj = await modelService.delete(req.query);
			res.send(responseObj);
		} catch (err) {
			res.status(400).send({ error: err.message });
		}
	},

	deleteOne: async (req, res) => {
		try {
			if (isObjectEmpty(req.query)) {
				throw new Error(ERRORS.INVALID_GET_QUERY);
			}
			let responseObj = await modelService.deleteOne(req.query);
			res.send(responseObj);
		} catch (err) {
			res.status(400).send({ error: err.message });
		}
	},

	count: async (req, res) => {
		try {
			let responseObj = await modelService.count(req.query);
			res.send(responseObj);
		} catch (err) {
			res.status(400).send({ error: err.message });
		}
	},
};
