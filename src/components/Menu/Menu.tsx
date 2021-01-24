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
      {[...state.collection].map((item) => {
        console.log("item:", item);

        if (item.type === "item") {
          return (
            <MenuItem
              key={item.key}
              item={item}
              state={state}
              onAction={props.onAction}
            />
          );
        } else {
          return (
            <MenuSection
              key={item.key}
              section={item}
              state={state}
              onAction={props.onAction}
            />
          );
        }
      })}
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

function MenuSection(props) {
  const { section, state, onAction } = props;
  const { itemProps, headingProps, groupProps } = useMenuSection({
    heading: section.rendered,
    "aria-label": section["aria-label"],
  });

  return (
    <>
      <li {...itemProps}>
        {section.rendered && <span {...headingProps}>{section.rendered}</span>}
        <ul {...groupProps}>
          {[...section.childNodes].map((node) => (
            <MenuItem
              key={node.key}
              item={node}
              state={state}
              onAction={onAction}
            />
          ))}
        </ul>
      </li>
    </>
  );
}
