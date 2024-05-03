import {body , validationResult} from 'express-validator';

const userValidationMiddleware = async(req,res,next) => {
    const rules = [body('name').notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Enter a Valid Email'),
        body('password').isStrongPassword().withMessage('Enter a Valid Password'),]
    await Promise.all(rules.map((rule) => rule.run(req))); 
    var validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        return res.send(validationErrors);
    }
    next();
}
export default userValidationMiddleware;