import express from 'express';
import expressEjsLayouts from 'express-ejs-layouts';
import path from 'path';
import JobController from './src/controllers/jobs.controller.js';
import addJobsValidationMiddleware from './src/middlewares/jobValidation.middleware.js';
import UserController from './src/controllers/user.controller.js';
import userValidationMiddleware from './src/middlewares/userValidation.middleware.js';
import session from 'express-session';
import { auth } from './src/middlewares/auth.middleware.js';
import cookieParser from 'cookie-parser';
import { setLastVisit } from './src/middlewares/lastVisit.middleware.js';
import { uploadFile } from './src/middlewares/pdf.upload.middleware.js';

const app = express();

app.use(cookieParser());
app.use(setLastVisit);

app.use(session({
    secret: 'SecretKey', //later use key generation
    resave: false,
    saveUninitialized: true,
    cookie: {secure:false},
}));

app.set("view engine", "ejs");
app.set('views', path.resolve('src','views'));
app.use(expressEjsLayouts);
app.use(express.urlencoded({extended:true}));

app.use(express.static('public'));

// get
const jobController = new JobController();
app.get('/', jobController.getBody);

app.get('/jobs', jobController.getJobs);
app.get('/job/:id', jobController.getDetails);

// add new jobs - by Recruiter
app.get('/postJob', auth, jobController.getPostJobForm);
app.post('/postJob', auth, addJobsValidationMiddleware, jobController.postAddJob);

// Update job - by Recruiter
app.get('/updateJob/:id', auth, jobController.getUpdateJob);
app.post('/updateJob', auth, jobController.postUpdateJob);

// Delete job - by Recruiter
app.post('/delete-job/:id', auth, jobController.postDeleteJob);

// Search job - by Seeker
app.post('/search', jobController.searchJob);

// Apply job - by Seeker
app.get('/apply', jobController.applyJob);
app.post('/apply', uploadFile.single('pdf'), jobController.postApply);

// Registration & login
const userController = new UserController();
app.get('/register', userController.getRegister);
app.post('/register', userValidationMiddleware, userController.postRegister);

app.get('/login', userController.getLogin);
app.post('/login', userController.postLogin);

app.get('/logout', userController.logout);

export default app;