import { MdNotificationAdd } from "react-icons/md";
import Announcements from "../../Pages/Home/Announcements/Announcements";

const Notimodal = ({ announcements }) => {
  return (
    <div>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button
        className='flex gap-2 items-center'
        onClick={() => document.getElementById("my_modal_4").showModal()}>
        <MdNotificationAdd className='text-xl' />
        <div className='badge badge-secondary '> {announcements.length}</div>
      </button>
      <dialog id='my_modal_4' className='modal'>
        <div className='modal-box w-11/12 max-w-4xl'>
          <Announcements />
          <div className='modal-action'>
            <form method='dialog'>
              {/* if there is a button, it will close the modal */}
              <button className='btn'>Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Notimodal;
