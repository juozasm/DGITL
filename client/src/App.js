import React, { useCallback, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getResults } from "./store/modules/results"
import "./App.scss"
import ModalWithOverlay from "./Modal"

export default function App() {
    const [value, setValue] = useState("")
    const [isOpen, setIsOpen] = useState(false)

    const dispatch = useDispatch()

    const handleSubmit = useCallback(
        e => {
            e.preventDefault()
            e.stopPropagation()
            setIsOpen(true)
            dispatch(getResults(value))
        },
        [value, dispatch]
    )
    const isValid = value.length > 1 && value.length < 10
    const { data, requesting, error } = useSelector(state => state.results)

    return (
        <div className="App">
            <form onSubmit={handleSubmit} noValidate>
                <div className="form-container">
                    <input
                        onChange={e => setValue(e.target.value)}
                        type="text"
                    />
                    <button disabled={!isValid} type="submit">
                        {requesting ? "Requesting..." : "GO!"}
                    </button>
                </div>
            </form>
            {!!error && (
                <ModalWithOverlay>
                    <div className="results-modal">
                        <span>{error}</span>
                        <button onClick={() => setIsOpen(false)}>Close</button>
                    </div>
                </ModalWithOverlay>
            )}
            {!!data && isOpen && (
                <ModalWithOverlay>
                    <div className="results-modal">
                        <span>{data}</span>
                        <button onClick={() => setIsOpen(false)}>Close</button>
                    </div>
                </ModalWithOverlay>
            )}
        </div>
    )
}
