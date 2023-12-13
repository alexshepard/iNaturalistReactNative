// @flow

import BottomSheet, { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { BottomSheetStandardBackdrop, Heading4, INatIconButton } from "components/SharedComponents";
import { View } from "components/styledComponents";
import type { Node } from "react";
import React, {
  useCallback, useEffect, useRef
} from "react";
import { useTranslation } from "sharedHooks";
import { viewStyles } from "styles/sharedComponents/bottomSheet";

type Props = {
  children: any,
  hidden?: boolean,
  snapPoints?: ( string|number )[],
  onChange?: Function,
  handleClose?: Function,
  hideCloseButton?: boolean,
  headerText?: string,
  insideModal?: boolean
}

const DEFAULT_SNAP_POINTS = ["45%"];

const renderBackdrop = props => <BottomSheetStandardBackdrop props={props} />;

const StandardBottomSheet = ( {
  children,
  hidden,
  snapPoints = DEFAULT_SNAP_POINTS,
  onChange = null,
  handleClose,
  hideCloseButton = false,
  headerText,
  insideModal
}: Props ): Node => {
  const { t } = useTranslation( );
  const sheetRef = useRef( null );

  // eslint-disable-next-line
  const noHandle = ( ) => <></>;

  const handleClosePress = useCallback( ( ) => {
    if ( handleClose ) {
      handleClose( );
    }
    if ( insideModal ) {
      sheetRef.current?.collapse( );
    } else {
      sheetRef.current?.dismiss( );
    }
  }, [handleClose, insideModal] );

  const handleSnapPress = useCallback( ( ) => {
    if ( insideModal ) {
      sheetRef.current?.expand( );
    } else {
      sheetRef.current?.present( );
    }
  }, [insideModal] );

  useEffect( ( ) => {
    if ( hidden ) {
      handleClosePress( );
    } else {
      handleSnapPress( );
    }
  }, [hidden, handleClosePress, handleSnapPress] );

  const BottomSheetComponent = insideModal
    ? BottomSheet
    : BottomSheetModal;

  return (
    <BottomSheetComponent
      ref={sheetRef}
      index={0}
      snapPoints={snapPoints}
      style={viewStyles.shadow}
      handleComponent={noHandle}
      backdropComponent={renderBackdrop}
      onChange={onChange}
    >
      <BottomSheetView>
        <View className="items-center">
          <Heading4 className="pt-7">{headerText}</Heading4>
        </View>
        {children}
        {!hideCloseButton && (
          <INatIconButton
            icon="close"
            onPress={handleClose}
            size={19}
            className="absolute top-3.5 right-3"
            accessibilityState={{ disabled: hidden }}
            accessibilityLabel={t( "Close" )}
          />
        )}
      </BottomSheetView>
    </BottomSheetComponent>
  );
};

export default StandardBottomSheet;
