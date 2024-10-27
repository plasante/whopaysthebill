import {useContext} from "react";
import {MyContext} from "../context/index.jsx";

const StageTwo = () => {
    const context = useContext(MyContext);

    return (
        <>
            <div className={'result_wrapper'}>
                <h3>The looser is:</h3>
                {context.result}
            </div>
        </>
    )
}

export default StageTwo;