const Modal = ({ onClose, children }) => {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white p-6 rounded shadow-lg max-w-lg w-full '>
        <button className='btn btn-outline btn-sm mb-6 ' onClick={onClose}>
          Close
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
