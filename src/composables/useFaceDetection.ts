export const useFaceDetection = () => {
  let detectionInterval: any;

  const init = ref(false);
  const lockInit = ref(false);
  const detected = ref(false);
  const detectionCount = ref(0);
  const detectionScore = ref(0);
  const initError = ref(false);

  const detecting = computed(
    () =>
      init.value === true &&
      detectionError.value === false &&
      detectionScore.value >= 90
  );

  const detectionError = computed(
    () => initError.value === true && detectionScore.value < 90
  );

  watch(detecting, (newValue) => {
    if (newValue === true && detectionCount.value === 0) {
      if (initError.value === false) {
        initError.value = true;
      }

      detectionInterval = setInterval(() => {
        detectionCount.value = detectionCount.value + 1;
      }, 1000);
    } else if (newValue === false) {
      detectionCount.value = 0;
      clearInterval(detectionInterval);
    }
  });

  watch(detectionCount, (newValue) => {
    if (newValue > 3) {
      detected.value = true;
    }
  });

  const initDetection = () => {
    if (init.value === true || lockInit.value === true) {
      return;
    }

    lockInit.value = true;

    setTimeout(() => {
      init.value = true;
    }, 3000);
  };

  const setDetectionScore = (val: number) => {
    detectionScore.value = val;
  };

  return {
    detected,
    detecting,
    detectionCount,
    detectionError,
    init,
    initDetection,
    setDetectionScore,
  };
};
