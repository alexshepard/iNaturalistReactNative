// @flow

import {
  Body1, CloseButton
} from "components/SharedComponents";
import {
  Image, ImageBackground,
  SafeAreaView, ScrollView,
  View
} from "components/styledComponents";
import { t } from "i18next";
import type { Node } from "react";
import React, { useEffect, useRef, useState } from "react";

import { isLoggedIn } from "./AuthenticationService";
import LoginForm from "./LoginForm";
import Logout from "./Logout";

const Login = ( ): Node => {
  const keyboardScrollRef = useRef( null );
  const [loggedIn, setLoggedIn] = useState( false );
  const [hideHeader, setHideHeader] = useState( false );

  useEffect( ( ) => {
    let isCurrent = true;

    const fetchLoggedIn = async ( ) => {
      const login = await isLoggedIn( );
      if ( !isCurrent ) { return; }
      setLoggedIn( login );
    };

    fetchLoggedIn( );

    return ( ) => {
      isCurrent = false;
    };
  }, [loggedIn] );

  const handleInputFocus = ( ) => setHideHeader( true );

  return (
    <SafeAreaView className="bg-black w-full h-full">
      <ImageBackground
        source={require( "images/toucan.png" )}
        className="h-full"
      >
        {
          loggedIn
            ? <Logout />
            : (
              <ScrollView
                keyboardShouldPersistTaps="always"
                ref={keyboardScrollRef}
                // eslint-disable-next-line react-native/no-inline-styles
                contentContainerStyle={{
                  flex: 1,
                  justifyContent: "space-between"
                }}
              >
                {!hideHeader && (
                  <View>
                    <View className="self-end pr-2">
                      <CloseButton size={19} />
                    </View>
                    <View className="self-center">
                      <Image
                        className="w-[234px] h-[43px]"
                        resizeMode="contain"
                        source={require( "images/inaturalist.png" )}
                        accessibilityIgnoresInvertColors
                      />
                      <Body1 className="text-center color-white mt-[24px] max-w-[280px]">
                        {t( "Login-sub-title" )}
                      </Body1>
                    </View>
                  </View>
                )}
                <LoginForm
                  setLoggedIn={setLoggedIn}
                  handleInputFocus={handleInputFocus}
                />
              </ScrollView>
            )
        }
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Login;
