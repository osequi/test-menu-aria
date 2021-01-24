import React, { useState, useRef } from "react";
import { useTreeState } from "@react-stately/tree";
import { Item, Section } from "@react-stately/collections";
import { useFocus } from "@react-aria/interactions";
import { mergeProps } from "@react-aria/utils";
import { useMenu, useMenuItem, useMenuSection } from "@react-aria/menu";

export function Menu(props) {
  const state = useTreeState({ ...props, selectionMode: "none" });
  const ref = useRef();
  const { menuProps } = useMenu(props, state, ref);

  return (
    <ul {...menuProps} ref={ref}>
      {[...state.collection].map((item) => (
        <MenuItem
          key={item.key}
          item={item}
          state={state}
          onAction={props.onAction}
        />
      ))}
    </ul>
  );
}

function MenuItem(props) {
  const { item, state, onAction } = props;
  const ref = useRef();
  const { menuItemProps } = useMenuItem(
    {
      key: item.key,
      isDisabled: item.isDisabled,
      onAction,
    },
    state,
    ref
  );

  const [isFocused, setFocused] = useState(false);
  const { focusProps } = useFocus({ onFocusChange: setFocused });

  return (
    <li {...mergeProps(menuItemProps, focusProps)} ref={ref}>
      {item.rendered}
    </li>
  );
}
