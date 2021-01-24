import React from "react";
import { useTreeState } from "@react-stately/tree";
import { Item, Section } from "@react-stately/collections";
import { useFocus } from "@react-aria/interactions";
import { mergeProps } from "@react-aria/utils";
import { useMenu, useMenuItem, useMenuSection } from "@react-aria/menu";
import { useSeparator } from "@react-aria/separator";

function Menu1(props) {
  // Create state based on the incoming props
  let state = useTreeState({ ...props, selectionMode: "none" });

  // Get props for the menu element
  let ref = React.useRef();
  let { menuProps } = useMenu(props, state, ref);

  return (
    <ul
      {...menuProps}
      ref={ref}
      style={{
        padding: 0,
        listStyle: "none",
        border: "1px solid gray",
        maxWidth: 250,
      }}
    >
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

function MenuItem({ item, state, onAction }) {
  // Get props for the menu item element
  let ref = React.useRef();
  let { menuItemProps } = useMenuItem(
    {
      key: item.key,
      isDisabled: item.isDisabled,
      onAction,
    },
    state,
    ref
  );

  // Handle focus events so we can apply highlighted
  // style to the focused menu item
  let [isFocused, setFocused] = React.useState(false);
  let { focusProps } = useFocus({ onFocusChange: setFocused });

  return (
    <li
      {...mergeProps(menuItemProps, focusProps)}
      ref={ref}
      style={{
        background: isFocused ? "gray" : "transparent",
        color: isFocused ? "white" : null,
        padding: "2px 5px",
        outline: "none",
        cursor: "pointer",
      }}
    >
      <a href="https://osequi.com">{item.rendered}</a>
    </li>
  );
}

export function Home1() {
  return (
    <Menu onAction={alert} aria-label="Actions">
      <Item key="one">One</Item>
      <Item key="two">Two</Item>
      <Item key="three">Three</Item>
    </Menu>
  );
}

function Menu(props) {
  let state = useTreeState({ ...props, selectionMode: "none" });
  let ref = React.useRef();
  let { menuProps } = useMenu(props, state, ref);

  return (
    <ul
      {...menuProps}
      ref={ref}
      style={{
        margin: 0,
        padding: 0,
        listStyle: "none",
        border: "1px solid gray",
        maxWidth: 250,
      }}
    >
      {[...state.collection].map((item) => (
        <MenuSection
          key={item.key}
          section={item}
          state={state}
          onAction={props.onAction}
        />
      ))}
    </ul>
  );
}

function MenuSection({ section, state, onAction }) {
  let { itemProps, headingProps, groupProps } = useMenuSection({
    heading: section.rendered,
    "aria-label": section["aria-label"],
  });

  let { separatorProps } = useSeparator({
    elementType: "li",
  });

  // If the section is not the first, add a separator element.
  // The heading is rendered inside an <li> element, which contains
  // a <ul> with the child items.
  return (
    <>
      {section.key !== state.collection.getFirstKey() && (
        <li
          {...separatorProps}
          style={{
            borderTop: "1px solid gray",
            margin: "2px 5px",
          }}
        />
      )}
      <li {...itemProps}>
        {section.rendered && (
          <span
            {...headingProps}
            style={{
              fontWeight: "bold",
              fontSize: "1.1em",
              padding: "2px 5px",
            }}
          >
            <a href="http://metamn.io">{section.rendered}</a>
          </span>
        )}
        <ul
          {...groupProps}
          style={{
            padding: 0,
            listStyle: "none",
          }}
        >
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

function alert(item) {
  console.log("alert:", item);
}

export function Home() {
  return (
    <Menu onAction={alert} aria-label="Actions">
      <Section title="Section 1">
        <Item key="section1-item1">One</Item>
        <Item key="section1-item2">Two</Item>
        <Item key="section1-item3">Three</Item>
      </Section>
      <Section title="Section 2">
        <Item key="section2-item1">One</Item>
        <Item key="section2-item2">Two</Item>
        <Item key="section2-item3">Three</Item>
      </Section>
    </Menu>
  );
}
