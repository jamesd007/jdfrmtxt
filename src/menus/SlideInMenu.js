import React, { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { FaArrowLeft } from "react-icons/fa";
import "../styles/slideInMenu.css";
import ClickOutsideDetector from "../utils/ClickOutsideDetector";
// import { RiArrowGoBackFill } from "react-icons/ri";

function SlideInMenu(props) {
  const menuItems = props.menuItems;
  const secMenuItems = props.secMenuItems;
  // const thirdMenuItems = props.thirdMenuItems

  const [activeMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);
  const [nopermission, setnopermission] = useState(false);
  const [scrnHgt, setScrnHgt] = useState(window.innerHeight);

  useEffect(() => {
    function handleResize() {
      setScrnHgt(window.innerHeight);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
  }, []);

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  const backItem = [
    {
      leftIcon: <FaArrowLeft />,
      text: "go back",
      permissionLevels: ["anybody"], //TODO this should be passed to the component as a prop or summin
      goToMenu: "main",
    },
  ];

  // const backItemToSec = [{
  // leftIcon: <FaArrowLeft />,
  // text: "go back",
  // goToMenu: "secondary"
  // }]

  const newSecMenuItems = backItem.concat(secMenuItems);
  // const newThirdMenuItems = backItemToSec.concat(thirdMenuItems)

  const chkRolesPermission = (item) => {
    let i;
    for (i = 0; i <= item.permissionLevels?.length; i++) {
      if (props.roles !== undefined) {
        if (props.roles.includes(item.permissionLevels[i])) {
          return true;
        }
      }
    }
    return false;
  };

  useEffect(() => {
    setTimeout(() => setnopermission(false), 1500);
    return () => {};
  }, [nopermission]);

  const dropdownItem = (item, i) => {
    return (
      <div
        key={i}
        className={
          chkRolesPermission(item) ? "menu-item" : "menu-item-disallow"
        }
        onClick={() => {
          // props.onClose()
          chkRolesPermission(item)
            ? item.goToMenu === "" || item.goToMenu === undefined
              ? item.callback()
              : item.goToMenu && setActiveMenu(item.goToMenu)
            : setnopermission(true);
        }}
      >
        <span className="icon-button">{item?.leftIcon}</span>
        <span className="menu-text">{item?.text}</span>
        <span className="icon-right">{item?.rightIcon}</span>
      </div>
    );
  };

  const theStyle = {};

  return (
    <div>
      <ClickOutsideDetector
        caller="Modals"
        listen
        onClickOutside={() => {
          props.onClose();
        }}
        onClick={() => {}}
      >
        <div
          className={
            props.mainscreen
              ? "dropdown"
              : props.coords.y > 300
              ? "dropdown-topics-low"
              : "dropdown-topics"
          }
          style={{
            maxHeight: `${scrnHgt - 100}px`,
            overflowY: "scroll",
          }}
          ref={dropdownRef}
        >
          <CSSTransition
            in={activeMenu === "main"}
            timeout={300}
            classNames="menu-primary"
            unmountOnExit
            onEnter={calcHeight}
          >
            <div className="menu">
              {menuItems.map((item, i) => dropdownItem(item, i))}
            </div>
          </CSSTransition>

          {props.secMenuItems !== undefined && (
            <CSSTransition
              in={activeMenu === "secondary"}
              timeout={300}
              classNames="menu-secondary"
              unmountOnExit
              onEnter={calcHeight}
            >
              <div className="menu">
                {newSecMenuItems.map((item, i) => dropdownItem(item, i))}
              </div>
            </CSSTransition>
          )}

          {nopermission && (
            <div className="permission-disallowed">Permission not set</div>
          )}

          {/* <CSSTransition
in={activeMenu === 'tertiary'}
timeout={300}
classNames="menu-tertiary"
unmountOnExit
onEnter={calcHeight}>
<div className="menu">
{newThirdMenuItems.map((item, i) => (
dropdownItem(item, i)
))}
</div>
</CSSTransition> */}
        </div>
      </ClickOutsideDetector>
    </div>
  );
}

export default SlideInMenu;
