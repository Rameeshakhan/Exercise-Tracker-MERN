import React, { Component } from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';

//functional react component of this class component
// ref: 12 , instead of taking whole date information we are just a starting sub string
const Exercise = props => (
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0,10)}</td>
        <td>
             <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
        </td>
    </tr>
)

export default class ExercisesList extends Component {
    constructor(props){ 
        super(props);
        this.deleteExercise = this.deleteExercise.bind(this);

        this.state = {exercises : []}
    }
    
    componentDidMount(){
        axios.get('http://localhost:5000/exercise/')
        .then(response =>{
            this.setState({exercises : response.data})
        })
        .catch((error) =>{
            console.log(error);
        })
    }

    deleteExercise(id){
        axios.delete("http://localhost:5000/exercise/" +id)
        .then(res => console.log(res.data));
        this.setState({
            // exercises array will be filter out and will show a new state where element (el) will be shown whose id is not equal to deleted element id
            exercises : this.state.exercises.filter(el => el._id !== id)
        })
    }

    exerciseList(){
        return this.state.exercises.map(currentexercise => { 
            return <Exercise exercise={ currentexercise } deleteExercise = {this.deleteExercise} key={currentexercise._id}/>;
    })
}

    render() {
        return (
        <div>
            <h3>Logged Exercises</h3>
            <table className = "table">
                <thead className="thead-light">
                    <tr>
                        <th>Username</th>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { this.exerciseList() }
                </tbody>
            </table>
        </div>
        ) 
    }
}