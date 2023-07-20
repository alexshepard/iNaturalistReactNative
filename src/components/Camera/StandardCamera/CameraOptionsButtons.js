// @flow

import classnames from "classnames";
import CameraFlip from "components/Camera/Buttons/CameraFlip";
import Flash from "components/Camera/Buttons/Flash";
import Zoom from "components/Camera/Buttons/Zoom";
import TabletButtons from "components/Camera/TabletButtons";
import type { Node } from "react";
import React from "react";
import DeviceInfo from "react-native-device-info";
import Animated from "react-native-reanimated";

const isTablet = DeviceInfo.isTablet();

type Props = {
  takePhoto: Function,
  handleClose: Function,
  disallowAddingPhotos: boolean,
  photosTaken: boolean,
  rotatableAnimatedStyle: Object,
  navToObsEdit: Function,
  toggleFlash: Function,
  flipCamera: Function,
  changeZoom: Function,
  hasFlash: boolean,
  takePhotoOptions: Object,
  zoom: number
}

const CameraOptionsButtons = ( {
  takePhoto,
  handleClose,
  disallowAddingPhotos,
  photosTaken,
  rotatableAnimatedStyle,
  navToObsEdit,
  toggleFlash,
  flipCamera,
  hasFlash,
  takePhotoOptions,
  changeZoom,
  zoom
}: Props ): Node => {
  const renderPhoneCameraOptions = () => (
    <>
      <Flash
        toggleFlash={toggleFlash}
        hasFlash={hasFlash}
        takePhotoOptions={takePhotoOptions}
        rotatableAnimatedStyle={rotatableAnimatedStyle}
        flashClassName="absolute bottom-[18px] left-[18px]"
      />
      <Zoom
        changeZoom={changeZoom}
        cameraZoomClasses="absolute bottom-[18px] self-center"
        zoom={zoom}
      />
      <Animated.View
        style={!isTablet && rotatableAnimatedStyle}
        className={classnames(
          "absolute",
          "bottom-[18px]",
          "right-[18px]"
        )}
      >
        <CameraFlip
          flipCamera={flipCamera}
        />
      </Animated.View>
    </>
  );

  const renderTabletCameraOptions = ( ) => (
    <TabletButtons
      takePhoto={takePhoto}
      handleClose={handleClose}
      disallowAddingPhotos={disallowAddingPhotos}
      photosTaken={photosTaken}
      rotatableAnimatedStyle={rotatableAnimatedStyle}
      navToObsEdit={navToObsEdit}
      toggleFlash={toggleFlash}
      flipCamera={flipCamera}
      hasFlash={hasFlash}
      takePhotoOptions={takePhotoOptions}
      changeZoom={changeZoom}
      zoom={zoom}
    />
  );

  return isTablet
    ? renderTabletCameraOptions( )
    : renderPhoneCameraOptions( );
};

export default CameraOptionsButtons;