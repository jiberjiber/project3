import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardContent } from '@material-ui/core';
import styles from './styles.css'

//new project form component
const ProjectForm = () => {

    const [ProjectForm, setProjectForm] = useState({
        title: "",
        description: "",
        dueDate: ""

    })
    const [errors, setErrors] = useState({})
    const [formFeedback, setFormFeedback] = useState(false)

    function handleFormChange(e) {
        const { name, value } = e.target;
        setProjectForm({ ...ProjectForm, [name]: value });
        setFormFeedback(false)

    }



    const onFormSubmit = (event) => {
        event.preventDefault()

        // if (errors) {
        //     console.log(errors)
        //     return
        // }
        // else {

            //we will run an axios post request
            axios.post('/api/project', {
                data: ProjectForm
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
            // axios({
            //     method: 'post',
            //     url: '/api/project',
            //     data: ProjectForm
            //   });
            const clearState = {
                title: "",
                description: "",
                dueDate: ""
            }

            setProjectForm({ ...clearState })

            setFormFeedback(true)
        
    }

    return (
        <div styles={styles} className="forms">
            <Card>
                <CardContent>
                    <form>
                        <div className="form-group">
                            <label>Title of Project</label>
                            <input
                                onChange={handleFormChange}
                                name="title"
                                value={ProjectForm.title}
                                className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Project Objective</label>
                            <small className="form-text text-muted">Please give a brief description of the goal of your project</small>
                            <input
                                onChange={handleFormChange}
                                name="description"
                                value={ProjectForm.description}
                                className="form-control"
                                rows={3} defaultValue={""} />
                        </div>
                        <div className="form-group date" data-provide="datepicker">
                            <label>Due Date for Project</label>
                            <input
                                onChange={handleFormChange}
                                name="dueDate"
                                value={ProjectForm.dueDate}
                                className="form-control" />
                            {/* <input class="datepicker" data-date-format="mm/dd/yyyy"></input>
                            <div className="input-group-addon">
                                <span className="glyphicon glyphicon-th" />
                            </div> */}
                        </div>
                        <button onClick={onFormSubmit} className="btn btn-primary">Submit Project</button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default ProjectForm