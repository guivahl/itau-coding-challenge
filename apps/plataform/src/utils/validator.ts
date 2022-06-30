import Joi, { SchemaLike, Schema, ValidationOptions } from 'joi'

type ValidationTypes = 'body' | 'headers' | 'query'

const validationOptions: Array<ValidationTypes> = ['body', 'headers', 'query']

export type FieldOptions = { 
    [key in ValidationTypes]?: Schema;
} 

type RequestInfo = {
    [key in ValidationTypes]: any;
}

export class Validator {
    private validator
    private fields: FieldOptions
    private errors: Array<string>
    private requestInfo
    
    constructor(fields: FieldOptions, requestInfo: RequestInfo) { 
        this.validator = Joi
        this.errors = []

        this.fields = fields
        this.requestInfo = requestInfo
    }

    private validateObject(label: string, object: any, schema: Schema, options?: ValidationOptions): string | void {
        const { error } = schema.validate(object, options)

        if (error) {
            const errorMessage = `Propriedade "${label}" inválida  - ${error.message}`

            this.errors.push(errorMessage)
        }
    }

    public validateAllObjects(): void {
        const fieldKeys = Object.keys(this.fields)

        for (const validation of validationOptions) {
            if (this.fields.hasOwnProperty(validation)) {
                const errorMessage = this.validateObject(validation, this.requestInfo[validation], this.fields[validation])
                
                if (errorMessage) this.errors.push(errorMessage)
            }
        }
    }

    public getErrorMessage(): string {
        const errorMessage = this.errors
            .reduce((acc, message, index) => index === 0 ? acc.concat(`${message}`) : acc.concat(`,${message}`) , '')

        return errorMessage
    }

    public hasErrors(): boolean {
        return this.errors.length > 0
    }

}