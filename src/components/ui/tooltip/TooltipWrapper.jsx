import React, { useId, useState, cloneElement } from "react";
import styles from "./TooltipWrapper.module.css";

const TooltipWrapper = ({
  title,
  position = "top",
  className = "",
  children,
  delay = 0,
  ...rest
}) => {
  const id = useId();
  const tooltipId = `tooltip-${id}`;
  const [visible, setVisible] = useState(false);
  let showTimeout = null;

  const show = () => {
    if (delay) showTimeout = setTimeout(() => setVisible(true), delay);
    else setVisible(true);
  };
  const hide = () => {
    if (showTimeout) clearTimeout(showTimeout);
    setVisible(false);
  };

  const child = React.Children.only(children);
  const childProps = {};

  const isFocusable = child.props && typeof child.props.onClick === "function";

  if (isFocusable) {
    childProps["aria-describedby"] = tooltipId;
  }

  return (
    <span
      className={`${styles.wrapper} ${className}`}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      tabIndex={isFocusable ? undefined : 0}
      {...rest}
    >
      {cloneElement(child, childProps)}
      <div
        id={tooltipId}
        role="tooltip"
        className={`${styles.tooltip} ${styles[position] || ""} ${
          visible ? styles.visible : ""
        }`}
        aria-hidden={!visible}
      >
        {title}
      </div>
    </span>
  );
};

export default TooltipWrapper;
