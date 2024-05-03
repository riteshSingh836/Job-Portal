import {body , validationResult} from 'express-validator';

const addJobsValidationMiddleware = async(req,res,next) => {
    // 1. setup rules for validation
    const rules = [body('name').notEmpty().withMessage('Name is required'),
        body('category').notEmpty().withMessage('category is required'),
        body('designation').notEmpty().withMessage('designation is required'),
        body('location').notEmpty().withMessage('location is required'),
        body('salary').notEmpty().withMessage('salary is required'),
        body('skills').notEmpty().withMessage('skills is required'),
        body('deadline').notEmpty().withMessage('deadline is required'),
        body('openings').notEmpty().withMessage('openings is required')];

    // 2. run those rules
    await Promise.all(rules.map((rule) => rule.run(req))); 

    //  3. check if there are any error after running the rules
    var validationErrors = validationResult(req);

    // 4. if errors, return the error message
    if (!validationErrors.isEmpty()) {
        return res.render('postJobs', {errorMessage: validationErrors.array()[0].msg});
    }
    next();
}

export default addJobsValidationMiddleware;