const Joi = require('@hapi/joi');

module.exports = Joi.object().keys({
    name:Joi.string()
        .alphanum()
        .min(2)
        .max(30)
        .required(),
    pass:Joi.string()
        .alphanum()
        .min(2)
        .max(8)
        .required()
});