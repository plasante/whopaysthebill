import {createContext, useState} from "react";

export const MyContext = createContext(undefined);

export const MyProvider = (props) => {
    const [stage, setStage] = useState(1);
    const [players, setPlayers] = useState([]);
    const [result, setResult] = useState('');

    const addPlayerHandler = (name) => {
        setPlayers(prevState => ([
            ...prevState,
            name
        ]))
    }

    const removePlayerHandler = (index) => {
        setPlayers(players.filter((_, i) => i !== index));
    }

    return (
        <>
            <MyContext.Provider value={{
                /// State
                stage: stage,
                players: players,
                result: result,
                /// Methods
                addPlayer: addPlayerHandler,
                removePlayer: removePlayerHandler,
            }}>
                {/* eslint-disable-next-line react/prop-types */}
                {props.children}
            </MyContext.Provider>
        </>
    )
}
