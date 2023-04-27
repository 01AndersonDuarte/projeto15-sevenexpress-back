export function validateSchema(schema){
    return(req, res, next) => {
        const validation = schema.validation(req.body, {abortEarly: false})

        if(validation.error){
            const errors = validation.eror.details.map(detail => detail.message)
            return res.status(422).send(errors)
        }

        next()
    }
}