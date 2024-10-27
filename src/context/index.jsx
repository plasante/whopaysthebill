import {createContext, useState} from "react";
import { ToastContainer, toast } from 'react-toastify';

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
            toast.error('You need more than one player',{
                position: "top-left",
                autoClose: 2000
            })
        } else {
            setStage(2);
            setTimeout(() => {
                generateLoser();
            }, 1000)
        }
    }

    const generateLoser = () => {
        let winner = players[Math.floor(Math.random() * players.length)];
        setResult(winner);
    }

    const resetGameHandler = () => {
        setStage(1);
        setPlayers([]);
        setResult('');
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
                resetGame: resetGameHandler,
                getNewLoser: generateLoser,
            }}>
                {/* eslint-disable-next-line react/prop-types */}
                {props.children}
            </MyContext.Provider>
            <ToastContainer/>
        </>
    )
}
