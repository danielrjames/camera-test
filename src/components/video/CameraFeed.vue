<template>
  <div class="w-full px-1 sm:p-0">
    <div
      ref="videoContainer"
      class="relative aspect-square w-full h-full shadow-sm ring-1 ring-primary-500 ring-opacity-25 bg-gray-100 transition max-w-[500px] max-h-[500px] rounded-full mx-auto overflow-hidden"
    >
      <Transition name="fade">
        <video
          v-show="displayFeed"
          ref="videoElement"
          disable-picture-in-picture="true"
          muted
          class="object-cover absolute inset-0 z-10 w-full h-full rounded-full"
        />
      </Transition>
      <div
        v-show="displayFeed"
        class="face-circle z-50 border-4 border-dashed rounded-full transition-colors"
        :class="{
          'border-white': !init || takePhoto,
          'border-green-400': detecting === true,
          'border-red-400': detectionError === true,
        }"
      ></div>
      <div v-show="displayFeed" class="face-circle circle-overlay z-40"></div>
      <canvas
        v-show="false"
        ref="canvasElement"
        class="ring-2 ring-black z-40"
        :class="
          takePhoto
            ? 'absolute inset-0 w-full h-full'
            : 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
        "
      ></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  type Detection,
  FaceDetector,
  FilesetResolver,
} from '@mediapipe/tasks-vision';
import { isNullOrUndefined } from '~/utils/app';
import { useCamera } from '~/composables/useCamera';
import { useFaceDetection } from '~/composables/useFaceDetection';

const RUNNING_MODE = 'VIDEO';
let faceDetector: FaceDetector;
let lastVideoTime = -1;

const camera = useCamera(false);
const faceDetection = useFaceDetection();

const { stream } = $(camera);
const { detecting, detectionError, init } = $(faceDetection);

const videoContainer = $ref<HTMLElement>();
const videoElement = $ref<HTMLVideoElement>();
const canvasElement = $ref<HTMLCanvasElement>();
let ctx = $ref<CanvasRenderingContext2D>();

let displayFeed = $ref(false);

const takePhoto = $ref(false);

onMounted(async () => {
  try {
    ctx = canvasElement.getContext('2d');

    await camera.start();

    await initMediaPipe();

    videoElement.srcObject = stream;

    videoElement.onloadedmetadata = () => {
      videoElement.play();

      displayFeed = true;

      analyzeFeed();
    };
  } catch (error) {
    // show error
  }
});

onUnmounted(() => {
  if (isNullOrUndefined(faceDetector)) {
    return;
  }

  faceDetector.close();
});

const initMediaPipe = async () => {
  try {
    const vision = await FilesetResolver.forVisionTasks(
      'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm'
    );

    faceDetector = await initFaceDetection(vision);
  } catch (error) {
    throw new Error(error);
  }
};

const initFaceDetection = (vision: any) => {
  return FaceDetector.createFromOptions(vision, {
    baseOptions: {
      delegate: 'GPU',
      modelAssetPath:
        'https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite',
    },
    minDetectionConfidence: 0.9,
    minSuppressionThreshold: 0.5,
    runningMode: RUNNING_MODE,
  });
};

const analyzeFeed = () => {
  if (isNullOrUndefined(videoElement?.currentTime)) {
    return;
  }

  drawCanvas();

  const startTimeMs = performance.now();

  if (videoElement.currentTime !== lastVideoTime) {
    lastVideoTime = videoElement.currentTime;

    const faceDetections = faceDetector.detectForVideo(
      canvasElement,
      startTimeMs
    ).detections;

    handleDetections(faceDetections);
  }

  requestAnimationFrame(analyzeFeed);
};

const drawCanvas = () => {
  const scale = takePhoto
    ? 0
    : videoContainer.clientWidth > 480
      ? 200
      : videoContainer.clientWidth > 400
        ? videoContainer.clientWidth * 0.4
        : videoContainer.clientWidth * 0.24;

  canvasElement.width = videoContainer.clientWidth - scale;
  canvasElement.height = videoContainer.clientHeight - scale;

  const imgRatio = videoElement.videoHeight / videoElement.videoWidth;
  const winRatio = videoContainer.clientHeight / videoContainer.clientWidth;

  if (imgRatio > winRatio) {
    const h = videoContainer.clientWidth * imgRatio;
    ctx.drawImage(
      videoElement,
      (scale / 2) * -1,
      (videoContainer.clientHeight - scale - h) / 2,
      videoContainer.clientWidth,
      h
    );
  }

  if (imgRatio < winRatio) {
    const w = (videoContainer.clientWidth * winRatio) / imgRatio;
    ctx.drawImage(
      videoElement,
      (videoContainer.clientWidth - scale - w) / 2,
      (scale / 2) * -1,
      w,
      videoContainer.clientHeight
    );
  }
};

const handleDetections = (faceDetections: Detection[]) => {
  if (faceDetections.length === 0) {
    faceDetection.setDetectionScore(0);

    return;
  }

  faceDetection.initDetection();

  faceDetections.forEach((detection) =>
    faceDetection.setDetectionScore(detection.categories[0].score * 100)
  );
};

// const takePhoto = () => {};
</script>

<style lang="css">
.circle-overlay:after {
  content: '';
  position: absolute;
  width: 95.5%;
  height: 95.5%;
  border-radius: 50%;
  box-shadow: 0px 0px 0px 2000px rgba(0, 0, 0, 0.15);
}
</style>
