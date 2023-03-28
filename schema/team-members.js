var Joi = require('joi')

exports.updateTeamMemberProfile = Joi.object({
  lastName: Joi.string().required(),
  firstName: Joi.string().required(),
  jobProfile: Joi.string().required(),
  immediateManagerName: Joi.string().required(),
  immediateManagerId: Joi.string().required(),
  pictureUrl: Joi.string().required(),
  TIEmail: Joi.string().required(),
  clientEmail: Joi.string().required(),
  functionalArea: Joi.string().required(),
  subOMId: Joi.string(),
  OMId: Joi.string()
})