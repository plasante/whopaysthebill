import {useContext, useRef, useState} from "react";
import {Alert, Button, Form} from 'react-bootstrap';

import { MyContext} from "../context/index.jsx";

const StageOne = () => {
    const textInput = useRef(null);
    const context = useContext(MyContext);
    const [error, setError] = useState(false,'');

    const handleSubmit = (e) => {
        e.preventDefault();
        const playerName = textInput.current.value;
        const validate = validateInput(playerName);

        if (validate) {
            setError([false,'']);
            context.addPlayer(playerName);
            textInput.current.value = "";
        }

    }

    const validateInput = (value) => {
        if (value === '') {
            setError([true, 'Sorry, you need to add something']);
            return false;
        }
        if (value.length < 3) {
            setError([true, 'Sorry, you need at least 3 characters']);
            return false;
        }
        return true;
    }

    const liClassName = 'list-group-item ' +
        'd-flex ' +
        'justify-content-between ' +
        'align-items-center ' +
        'list-group-item-action';

    return (
        <>
            <Form onSubmit={handleSubmit} className={'mt-4'}>
                <Form.Group>
                    <Form.Control
                        type={'text'}
                        placeholder={'Add player name'}
                        name={'player'}
                        ref={textInput}
                    />
                </Form.Group>

                { error[0] ?
                    <Alert>
                        {error[1]}
                    </Alert>
                :null}

                <Button className={'miami'} variant={'primary'} type={'submit'}>
                    Add player
                </Button>
                { context.players && context.players.length > 0 ?
                    <>
                        <hr/>
                        <div>
                            <ul className={'list-group'}>
                                { context.players.map(((player,index) => (
                                    <li key={index} className={liClassName}>
                                        {player}
                                        <span
                                            className={'badge badge-danger'}
                                            onClick={() => context.removePlayer(index)}
                                        >
                                            X
                                        </span>
                                    </li>
                                )))}
                            </ul>
                            <div
                                className={'action_button'}
                                onClick={() => context.nextPage()}
                            >
                                NEXT
                            </div>
                        </div>
                    </>
                    :null
                }
            </Form>
        </>
    )
}

export default StageOne;