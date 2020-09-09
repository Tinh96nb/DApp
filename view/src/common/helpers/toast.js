import React from 'react'

import { toast, Flip } from 'react-toastify'
toast.configure()

export function createToast ({ type, message }) {
  const icon = type === 'success' ? 'fa-check' : 'fa-times'
  const Msg = (props) => <div><i className={`fa ${props.icon}`} /> {props.msg}</div>
  return toast[type](<Msg msg={message} icon={icon} />, {
    transition: Flip,
    position: 'top-right',
    className: 'custom-toast',
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  })
}
