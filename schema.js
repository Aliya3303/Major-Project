const Joi = require("joi");

module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().trim().required(),
        description: Joi.string().trim().required(),
        location: Joi.string().trim().required(),
        price: Joi.number().min(0).required(),
        country: Joi.string().trim().required(), 
          location: Joi.string().trim().required(),
         image: Joi.alternatives().try(
            Joi.object({
                filename: Joi.string().allow(""),
                url: Joi.string().uri().allow("")
            }),
            Joi.string().uri().allow("")
        ).optional()
    }).required()


});


// ✅ REVIEW SCHEMA
module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().min(1).max(5).required(),
        comment: Joi.string().trim().required()
    }).required()
});