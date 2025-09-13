import { useEffect, useState } from "react";

import './Toast.css'

const Toast = (props) => {
  const [isToastVisible, setIsToastVisible] = useState(false);
  useEffect(() => {
    setIsToastVisible(props.message ? true : false);
    setTimeout(() => {
      setIsToastVisible(false);
    }, 9000);
  }, [props.message]);
  return <div className={`toast ${isToastVisible ? 'active' : 'inactive'}`}>
    {props.message}
  </div>
};

export default Toast;