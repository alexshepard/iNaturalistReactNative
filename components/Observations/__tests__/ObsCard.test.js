import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import AccessibilityEngine from "react-native-accessibility-engine";

import ObsCard from "../ObsCard";

const testObservation = {
  userPhoto: "amazon_url",
  commonName: "Insects",
  placeGuess: "SF",
  timeObservedAt: "May 1, 2021",
  identificationCount: 3,
  commentCount: 0,
  qualityGrade: "research"
};

test( "renders text passed into observation card", ( ) => {
  const { getByTestId, getByText } = render(
    <ObsCard
      item={testObservation}
    />
  );

  expect( getByTestId( "ObsList.obsCard" ) ).toBeTruthy( );
  expect( getByTestId( "ObsList.photo" ).props.source ).toStrictEqual( { "uri": "amazon_url" } );
  expect( getByText( "Insects" ) ).toBeTruthy( );
  expect( getByText( "SF" ) ).toBeTruthy( );
  expect( getByText( "May 1, 2021" ) ).toBeTruthy( );
  expect( getByText( /^[3]/ ) ).toBeTruthy( );
  expect( getByText( /^[0]/ ) ).toBeTruthy( );
  expect( getByText( "research" ) ).toBeTruthy( );
} );

test( "handles button press", ( ) => {
  const fakeNavigation = {
    navigate: jest.fn( )
  };

  const { getByTestId } = render(
    <ObsCard
      item={{ }}
      handlePress={item => fakeNavigation.navigate( "ObsDetails" )}
    />
  );

  const button = getByTestId( "ObsList.obsCard" );

  fireEvent.press( button );
  expect( fakeNavigation.navigate ).toBeCalledWith( "ObsDetails" );
} );

test( "should not have accessibility errors", ( ) => {
  const obsCard = <ObsCard item={testObservation} />;
  expect( ( ) => AccessibilityEngine.check( obsCard ) ).not.toThrow();
} );
