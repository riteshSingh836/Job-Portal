

export default class jobModel {
    constructor (id, name, category, designation, location, salary, skills, deadline, openings, applicants) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.designation = designation;
        this.location = location;
        this.salary = salary;
        this.skills = skills;
        this.deadline = deadline;
        this.openings = openings;
        this.applicants = applicants;
    }

    static getjobs() {
        return allJobs;
    }

    static getById(id) {
        return allJobs.find((p) => p.id == id);
    }

    // add new jobs
    static addJobs(jobObj) {
        let newJob = new jobModel(allJobs.length+1, jobObj.name, jobObj.category, jobObj.designation, jobObj.location, jobObj.salary,
            jobObj.skills, jobObj.deadline, jobObj.openings);
        allJobs.push(newJob);
    }

    // update job
    static updatejob(updateObj) {
        const index = allJobs.findIndex((j) => j.id == updateObj.id);
        // console.log(index);
        allJobs[index] = updateObj;
        // console.log(allJobs);
    }

    // delete
    static deletejob(id) {
        const index = allJobs.findIndex((j) => j.id == id);
        allJobs.splice(index, 1);
    }

    // Search
    static search(name) {
        const data = allJobs.filter((job) => {
            if (job.name == name) {
                return job;
            }
        });
        // console.log(data); this will store array of jobs searched
        return data;
    }
}

var allJobs = [new jobModel(1, 'Coding Ninjas', 'Tech', 'SDE', 'Mumbai', '14-20 lpa', 'ReactJs', '30 Aug 2023', '5', '1'),
new jobModel(2, 'JustPay', 'Tech', 'Angular Developer', 'Bengaluru', '10-12 lpa', 'Nodejs', '15 Nov 2023', '10', '5'),
new jobModel(3, 'Paytm', 'Tech', 'SDE', 'pune', '4-5 lpa', 'Html', '10 Oct 2023', '50', '6')];