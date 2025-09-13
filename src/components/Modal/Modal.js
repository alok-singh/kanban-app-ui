import "./Modal.css";

const Modal = (props) => {
  return props.isOpen ? (
    <div className="modal-overlay">
      <div className="modal">
        <header className="modal-header">
          <h2>{props.title}</h2>
          <button className="close-btn" onClick={props.onClose}>
            &times;
          </button>
        </header>
        <div className="modal-body">
          {props.children}
        </div>
      </div>
    </div>
  ) : null;
};

export default Modal;
