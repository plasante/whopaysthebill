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

    const switchComponentHandler = () => {
        if (players.length < 2) {
            console.log("nop")
        } else {
            setStage(2);
            setTimeout(() => {
                generateLoser();
            }, 2000)
        }
    }

    const generateLoser = () => {
        let winner = players[Math.floor(Math.random() * players.length)];
        setResult(winner);
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
                nextPage: switchComponentHandler,
            }}>
                {/* eslint-disable-next-line react/prop-types */}
                {props.children}
            </MyContext.Provider>
        </>
    )
}
