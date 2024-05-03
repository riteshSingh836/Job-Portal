import userModel from "../models/user.model.js";
import jobModel from "../models/jobs.model.js";


export default class UserController {
    getRegister(req,res) {
        res.render('register');
    }
    getLogin(req,res) {
        res.render('login', {errorMessage: null});
    }

    postRegister(req,res) {
        const {name, email, password} = req.body;
        req.session.userName = name;
        userModel.addUser(name,email,password);
        res.render('login', {errorMessage: null});
    }
    postLogin(req,res) {
        const {email, password} = req.body;
        let user = userModel.isValidUser(email,password);
        if (!user) {
            return res.render('login', {errorMessage: 'Invalid Credentials'});
        }
        req.session.userEmail = email;  // attached in login-- will check this in auth middleware
        let jobs = jobModel.getjobs();
        res.render('jobs-list', {jobs: jobs, userEmail: req.session.userEmail, userName: req.session.userName});
    }

    // logout
    logout(req,res) {
        req.session.destroy((err) => {
            if (err) {
                console.log(err);
            }else{
                res.redirect('/login');
            }
        });
    }
}

