// * react
import React, { useEffect, useState } from 'react';

// ? стили
import './Notifications.css';

// ? images
import succesfull from './../../images/successfulIcon.svg';
import unsuccesfull from './../../images/unsuccessfulIcon.svg';

// ? configs
import configSite from './../../config/configSite.json';

// ? utils
// * константы
import { status } from './../../utils/Constants';
// * utils

// * Api

function Notifications({ notifications, setNotifications }) {
  // определяем, уведомления находятся ниже шапки профиля или нет
  window.onscroll = function () {
    if (notifications.length > 0) {
      if (74 - window.scrollY < 14)
        document.getElementById('Notifications').style.top = '14px';
      else
        document.getElementById('Notifications').style.top = `${
          74 - window.scrollY
        }px`;
    }
  };

  return (
    <section id='Notifications' className='Notifications'>
      {notifications.map((item, index) => {
        // img
        const img = {
          src: item.type === 'successfully' ? succesfull : unsuccesfull,
          alt: item.type === 'successfully' ? 'successfully' : 'unsuccesfull',
        };

        // function to delete
        function deleteNotification() {
          if (configSite.status === status.dev)
            console.log(`Удалено уведомление [${item.name}]`);

          setNotifications((arr) =>
            arr.filter((c) => (c === item ? false : true)),
          );
        }

        return (
          <div key={index} className='Notification'>
            <img src={img.src} alt={img.alt} className='Notification__icon' />

            <div className='Notification__info'>
              <div className='Notification__name-button'>
                <h2 className='Notification__name'>{item.name}</h2>
                <button
                  onClick={deleteNotification}
                  className='button Notification__button-close'
                />
              </div>
              <p className='Notification__text'>{item.text}</p>
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default Notifications;
