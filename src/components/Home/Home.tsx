import React from "react";
import { Item, Section } from "@react-stately/collections";
import { Menu } from "../";

function alert(item) {
  console.log("alert:", item);
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
