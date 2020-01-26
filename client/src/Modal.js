import ReactDOM from "react-dom"
import React from "react"
import "./Modal.scss"

const modalRoot = document.getElementById("modal-root")

class ModalPortal extends React.Component {
    constructor(props) {
        super(props)
        this.el = document.createElement("div")
    }

    componentDidMount() {
        modalRoot.appendChild(this.el)
    }

    componentWillUnmount() {
        modalRoot.removeChild(this.el)
    }

    render() {
        return ReactDOM.createPortal(this.props.children, this.el)
    }
}

function Modal({ children }) {
    return (
        <ModalPortal>
            <div className="Modal">
                <div className="modal-container">
                    <div>{children}</div>
                </div>
                <div className="modal-overlay"></div>
            </div>
        </ModalPortal>
    )
}

export default Modal
