import cs from "classnames";
import React from "react";
import { MdAdd, MdRemove } from "react-icons/md";
import "./FieldList.css";

export const FieldList: React.FunctionComponent<React.PropsWithChildren> = ({ children }) => (
  <div className="dfrm-field-list">{children}</div>
);

export const FieldListItem: React.FunctionComponent<React.PropsWithChildren> = ({ children }) => (
  <div className="dfrm-field-list__item">{children}</div>
);

export const FieldListInput: React.FunctionComponent<React.PropsWithChildren> = ({ children }) => (
  <div className="dfrm-field-list__input">{children}</div>
);

interface FieldListButtonProps {
  disabled?: boolean;
  onClick(): unknown;
}

export const FieldListRemoveButton: React.FunctionComponent<FieldListButtonProps> = React.memo(
  (props) => (
    <button
      {...props}
      type="button"
      className={cs("dfrm-field-list__button", "dfrm-field-list__button--remove")}
    >
      <MdRemove />
    </button>
  ),
);

export const FieldListAddButton: React.FunctionComponent<FieldListButtonProps> = React.memo(
  (props) => (
    <button
      {...props}
      type="button"
      className={cs("dfrm-field-list__button", "dfrm-field-list__button--add")}
    >
      <MdAdd />
    </button>
  ),
);
