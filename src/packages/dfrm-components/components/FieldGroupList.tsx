import cs from "classnames";
import React from "react";
import { MdAdd, MdRemove } from "react-icons/md";
import "./FieldGroupList.css";

export const FieldGroupList: React.FunctionComponent<React.PropsWithChildren> = ({ children }) => (
  <div className="dfrm-field-group-list">{children}</div>
);

export const FieldGroupListItem: React.FunctionComponent<React.PropsWithChildren> = ({
  children,
}) => <div className="dfrm-field-group-list__item">{children}</div>;

export const FieldGroupListItemFooter: React.FunctionComponent<React.PropsWithChildren> = ({
  children,
}) => <div className="dfrm-field-group-list__item__footer">{children}</div>;

export const FieldGroupListItemBody: React.FunctionComponent<React.PropsWithChildren> = ({
  children,
}) => <div className="dfrm-field-group-list__item__body">{children}</div>;

interface FieldGroupListButtonProps {
  disabled?: boolean;
  onClick(): unknown;
}

export const FieldGroupListRemoveButton: React.FunctionComponent<FieldGroupListButtonProps> =
  React.memo((props) => (
    <button
      {...props}
      type="button"
      className={cs("dfrm-field-group-list__button", "dfrm-field-group-list__button--remove")}
    >
      <MdRemove />
    </button>
  ));

export const FieldGroupListAddButton: React.FunctionComponent<FieldGroupListButtonProps> =
  React.memo((props) => (
    <button
      {...props}
      type="button"
      className={cs("dfrm-field-group-list__button", "dfrm-field-group-list__button--add")}
    >
      <MdAdd />
    </button>
  ));
