import React from 'react'
import "./css/root.css";
import { Outlet } from 'react-router'
import { useGlobalProvider } from '@/constants/provider';
import { MdOutlineErrorOutline } from 'react-icons/md';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import Footer from '@/components/footer';

const RootLayout : React.FC = () : React.JSX.Element => {
  const { note, loading} = useGlobalProvider();

  /*React.useEffect(() => {
    setNote({type: "success", title: "Success", body: "Order Placed Successfully"});
    setTimeout(() => setNote(undefined), 3000)
  },[])*/

  return (
    <div className='root_layout_container'>
       <div className={`root_layout_popup_modal_container ${note && "popup_modal_active"}`}>
         <div className="root_layout_popup_modal_icon">
          {note && note.type === "success" && <IoMdCheckmarkCircleOutline size={25} color='#00db00'/>}
          {note && note.type === "error" && <MdOutlineErrorOutline size={25} color='#e20000' />}
        </div>
        <div className="root_layout_popup_modal_messages">
          {note && note.title && <span className='root_layout_popup_modal_title'>{note.title}</span>}
          {note && note.body && <span className='root_layout_popup_modal_message'>{note.body}</span>}
        </div>
       </div>
        <Outlet />
        <div className={`root_layout_loading_fidget_container ${loading && "loading"}`}>
          <div className="root_layout_loading_fidget_container_loader"></div>
        </div>
        <Footer />
    </div>
  )
}

export default RootLayout