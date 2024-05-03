import jobModel from "../models/jobs.model.js";

export default class JobController {
    
    getBody(req,res) {
        res.render('body', {userEmail: req.session.userEmail, userName: req.session.userName});
    }

    getJobs(req,res) {
        let jobs = jobModel.getjobs();
        res.render('jobs-list', {jobs: jobs, userEmail: req.session.userEmail, userName: req.session.userName});
    }

    getDetails(req,res) {
        const id = req.params.id;
        const jobs = jobModel.getById(id);
        // console.log(jobs);
        res.render('job-details', {job: jobs, userEmail: req.session.userEmail, userName: req.session.userName});
    }

    // Adding New Jobs
    getPostJobForm(req,res) {
        res.render('post-jobs', {errorMessage: null, userEmail: req.session.userEmail, userName: req.session.userName});
    }
    postAddJob(req,res) {
        // console.log(req.body);
        jobModel.addJobs(req.body);
        let jobs = jobModel.getjobs();
        res.render('jobs-list', {jobs: jobs, userEmail: req.session.userEmail, userName: req.session.userName});
    }

    // Updating Jobs- for ValidUser
    getUpdateJob(req,res) {
        const id = req.params.id;
        const job = jobModel.getById(id);
        if (job) {
            res.render('update-jobs', {job:job, errorMessage: null, userEmail: req.session.userEmail, userName: req.session.userName});
        }else{
            res.status(401).send('Job not found!!');
        }
    }
    postUpdateJob(req,res) {
        // console.log(req.body);
        jobModel.updatejob(req.body);
        let jobs = jobModel.getjobs();
        res.render('jobs-list', {jobs: jobs, userEmail: req.session.userEmail, userName: req.session.userName});
    }

    // delete
    postDeleteJob(req,res) {
        const id = req.params.id;
        const jobFound = jobModel.getById(id);
        if (!jobFound) {
            res.status(401).send("Job not Found");
        }
        jobModel.deletejob(id);
        let jobs = jobModel.getjobs();
        res.render('jobs-list', {jobs: jobs, userEmail: req.session.userEmail, userName: req.session.userName});
    }

    // Search
    searchJob(req,res) {
        let searchedJob = jobModel.search(req.body.name);
        res.render('search-result', {jobs: searchedJob, userEmail: req.session.userEmail, userName: req.session.userName});
    }

    // apply
    applyJob(req,res) {
        res.render('apply-form', {userEmail: req.session.userEmail, userName: req.session.userName});
    }

    postApply(req,res) {
        // let jobs = jobModel.getjobs();
        let email = req.body.email;
        res.render('get-mail', {email: email, userEmail: req.session.userEmail, userName: req.session.userName});
    }
    
}