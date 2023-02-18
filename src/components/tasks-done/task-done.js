import {Link} from 'react-router-dom'
import "./task-done.css"
function TaskDone(props){
    let data;
    if(props.data===null){
        return
    }
    else{
        data=props.data
    }
    return(
        <div className="main-done-wrapper">
            <div className="done-task-wrapper">
                <h1>All of your completed tasks!</h1>
                {data.length>0?
                    <div className="done-task">
                        {
                            data.map(elements=>(
                                <div>
                                    <h2>{elements.task}</h2>
                                </div>
                            ))
                        }
                    </div>
                    :
                    <div>
                        <h1>No tasks completed as of yet!</h1>
                    </div>
                }
            </div>
            <Link className="homepage-link" to="/">Back to homepage!</Link>
        </div>
    )
}
export default TaskDone;