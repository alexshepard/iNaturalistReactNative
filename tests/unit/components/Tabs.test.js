import { fireEvent, screen } from "@testing-library/react-native";
import Tabs from "components/SharedComponents/Tabs";
import React from "react";

import { renderComponent } from "../../helpers/render";

const TAB_1 = "TAB_1";
const TAB_2 = "TAB_2";
const tab1Click = jest.fn();
const tab2Click = jest.fn();

const tabs = [
  {
    id: TAB_1,
    text: TAB_1,
    onPress: tab1Click
  },
  {
    id: TAB_2,
    text: TAB_2,
    onPress: tab2Click
  }
];

test( "Tabs can be clicked and display proper text", ( ) => {
  renderComponent( <Tabs tabs={tabs} activeId={TAB_1} /> );
  const tab1 = screen.getByLabelText( TAB_1 );
  const tab2 = screen.getByLabelText( TAB_2 );

  expect( tab1 ).toBeTruthy( );
  expect( tab2 ).toBeTruthy( );
  expect( tab1 ).toHaveAccessibilityState( { selected: true, expanded: true } );
  expect( tab2 ).toHaveAccessibilityState( { selected: false, expanded: false } );

  fireEvent.press( tab2 );
  expect( tab1Click ).not.toHaveBeenCalled();
  expect( tab2Click ).toHaveBeenCalled();
} );
