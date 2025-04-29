import { appLogoUri, appName, defaultUserDp, searchProduct } from '@/constants'
import React, { useState } from 'react'
import "./css/desktop_tab.css";
import SearchBox from '@/components/search_box';
import { FiShoppingBag, FiShoppingCart } from 'react-icons/fi'
import { useGlobalProvider } from '@/constants/provider';
import { PiBellSimpleRingingBold } from 'react-icons/pi';
import { GrFavorite } from 'react-icons/gr';
import { FaGear } from 'react-icons/fa6';
import { HiOutlineLogout } from 'react-icons/hi';


const DeskTopTabNavBar : React.FC = () : React.JSX.Element => {

  const { display } = useGlobalProvider();
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  return (
    <div className='desktop_navbar_container'>
      <div className="desktop_navbar_left">
        <img className='desktop_navbar_left_app_logo' src={appLogoUri} alt={`${appName} logo`} />
      </div>
      {display.desktop && <div className="desktop_navbar_center">
        <SearchBox onsearch={(term: string) => searchProduct(term)} />
      </div>}
      <div className="desktop_navbar_right">
        <div className="desktop_navbar_right_option_container">
          <FiShoppingCart className='icon_cursor_pointer' size={16} />
          <span className="desktop_navbar_right_option_label">Cart</span>
          <div className='desktop_navbar_right_option_notification_count'>12</div>
        </div>
        <div className="desktop_navbar_right_option_container">
          <GrFavorite className='icon_cursor_pointer' size={16} />
          <span className="desktop_navbar_right_option_label">Wishlist</span>
        </div>
        <div className="desktop_navbar_right_option_container">
          <PiBellSimpleRingingBold  className='icon_cursor_pointer' size={16} />
          <span className="desktop_navbar_right_option_label">Inbox</span>
          <div className='desktop_navbar_right_option_notification_count'>12</div>
        </div>
        <div className="desktop_navbar_right_option_container" style={{marginLeft: 20}}>
          <div onClick={() => setOpenMenu(!openMenu)} className={`desktop_navbar_right_picture_menu_container ${openMenu && "menu_triggered"}`}>
            <img className='user_profile_picture' src={defaultUserDp}  alt={`username dp`} />
          </div>
        </div>
        
        <div className={`desktop_me_options_container ${openMenu && "desktop_me_options_container_open"}`}>
          <div className="desktop_me_profile_container">
            <div className="desktop_me_profile_picture_container">
              <img className='desktop_me_profile_picture' src={defaultUserDp}  alt={`username dp`} />
            </div>
            <div className="desktop_me_profile_name_email">
              <span className='desktop_me_profile_name'>Mk Technology</span>
              <span className='desktop_me_profile_email'>mktechnology@mk.app</span>
            </div>
          </div>

          <div className="desktop_me_options">
            <div className="desktop_me_option_container">
              <div className="desktop_me_option_left">
                <FaGear />
              </div>
              <div className="desktop_me_option_right">Manage Account</div>
            </div>
            <div className="desktop_me_option_container">
              <div className="desktop_me_option_left">
                <FiShoppingBag />
              </div>
              <div className="desktop_me_option_right">My orders</div>
            </div>
            <div className="desktop_me_option_container">
              <div className="desktop_me_option_left">
                <HiOutlineLogout />
              </div>
              <div className="desktop_me_option_right">Sign out</div>
            </div>
          </div>

          <div className="desktop_me_options_bottom">
            <span>Secured by Paystack</span>
          </div>
        </div>


      </div>
    </div>
  )
}

export default DeskTopTabNavBar