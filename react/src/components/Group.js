import { useParams } from "react-router-dom";

function Group() {

    const {groupID} = useParams();

    return (
        <div>
            <h1>Group with id {groupID}</h1>
        </div>
    )
}

export default Group;