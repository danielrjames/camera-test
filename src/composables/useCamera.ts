import { isNullOrUndefined } from '~/utils/app';

export const useCamera = (enableAudio = true) => {
  const ENVIRONMENT_FACING = 'environment';
  const USER_FACING = 'user';

  const devices = ref<MediaDeviceInfo[]>([]);
  const stream = ref<MediaStream>(null);
  const supportedContraints = ref();
  const hasZoom = ref(false);

  onUnmounted(() => {
    stop();
  });

  watch(supportedContraints, (newValue) => {
    if (newValue.zoom) {
      hasZoom.value = true;
    }
  });

  const getVideoDevices = async () => {
    try {
      const inputDevices = await navigator.mediaDevices.enumerateDevices();

      return inputDevices.filter(
        (device: MediaDeviceInfo) => device.kind === 'videoinput'
      );
    } catch {
      throw new Error('Could not get video devices.');
    }
  };

  const getVideoStream = (rearCamera: boolean) =>
    navigator.mediaDevices.getUserMedia({
      audio: enableAudio,
      video: {
        facingMode: rearCamera ? ENVIRONMENT_FACING : USER_FACING,
        height: { ideal: 1080 },
        width: { ideal: 1920 },
      },
    });

  const start = async (rearCamera = false) => {
    try {
      stop();

      stream.value = await getVideoStream(rearCamera);

      supportedContraints.value =
        navigator.mediaDevices.getSupportedConstraints();

      if (devices.value.length === 0) {
        devices.value = await getVideoDevices();
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const stop = () => {
    if (isNullOrUndefined(stream.value)) {
      return;
    }

    stream.value.getTracks().forEach((track) => track.stop());

    stream.value = null;
  };

  const switchCameras = async () => {
    if (isNullOrUndefined(stream.value) || devices.value.length < 2) {
      return;
    }

    const existingConstraints = stream.value.getTracks()[0].getConstraints();

    const useRearCamera = existingConstraints.facingMode !== ENVIRONMENT_FACING;

    return await start(useRearCamera);
  };

  return {
    devices,
    hasZoom,
    start,
    stop,
    stream,
    switchCameras,
  };
};
