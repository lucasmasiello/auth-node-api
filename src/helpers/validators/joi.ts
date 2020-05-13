import mongoose from 'mongoose'
import joi, {
  ObjectSchema,
  ValidationError,
  ExtensionFactory,
  Root,
  StringSchema
} from '@hapi/joi'
import { HttpError } from '../../models'

interface IDetailError {
  message: string
  field: string
}

const objectId: ExtensionFactory = joi => ({
  type: 'objectId',
  base: joi.string(),
  messages: {
    objectId: '"{#label}" is not a valid ID'
  },
  validate (value, helpers) {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      return { value, errors: helpers.error('objectId') }
    }
  }
})

interface ExtendedRoot extends Root {
  objectId(): StringSchema
}

export const Joi: ExtendedRoot = joi.extend(objectId)

export const validate = async (schema: ObjectSchema, payload: any) => {
  try {
    await schema.validateAsync(payload, { abortEarly: false })
  } catch (error) {
    const { details } = error as ValidationError
    const detailsError = details.map(
      detail =>
        <IDetailError>{
          message: detail.message,
          field: detail.path[0]
        }
    )

    throw new HttpError(
      400,
      'VALIDATION_ERROR',
      'Validation Error',
      detailsError
    )
  }
}
