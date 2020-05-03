import { ObjectSchema, ValidationError } from "@hapi/joi";
import { BadRequest } from "../../models";

interface IDetailError {message: string, field: string}

export const validate = async (schema: ObjectSchema, payload: any) => {
  try {
    await schema.validateAsync(payload, { abortEarly: false })
  } catch (error) {
    const { details } = error as ValidationError
    const detailsError = details.map(detail => <IDetailError>{
      message: detail.message,
      field: detail.path[0]
    })

    throw new BadRequest(
      'VALIDATION_ERROR',
      'Validation Error',
      detailsError
    )
  }
}