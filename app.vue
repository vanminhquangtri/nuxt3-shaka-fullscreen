<template>
  <div>
    <!-- The data-shaka-player-container tag will make the UI library place the controls in this div.
         The data-shaka-player-cast-receiver-id tag allows you to provide a Cast Application ID that
           the cast button will cast to; the value provided here is the sample cast receiver. -->
    <div
      data-shaka-player-container
      style="max-width: 40em"
      data-shaka-player-cast-receiver-id="07AEE832"
    >
      <!-- The data-shaka-player tag will make the UI library use this video element.
            If no video is provided, the UI will automatically make one inside the container div. -->
      <video
        muted
        autoplay
        playsinline
        data-shaka-player
        id="video"
        style="width: 100%; height: 100%"
      ></video>
    </div>

    <div>{{ errors }}</div>
  </div>
</template>

<script lang="ts" setup>
// @ts-nocheck

const errors = ref('');
const manifestUri =
  'https://vod02-cdn.fptplay.net/POVOD/encoded/2023/11/21/medicalexaminerdrqinthemindreader-trailer-f-1700577322/master.m3u8';

async function init() {
  // When using the UI, the player is made automatically by the UI object.
  const video = document.getElementById('video');

  const ui = video['ui'];
  const controls = ui.getControls();
  const player = controls.getPlayer();

  // Attach player and ui to the window to make it easy to access in the JS console.
  window.player = player;
  window.ui = ui;

  // Listen for error events.
  player.addEventListener('error', onPlayerErrorEvent);
  controls.addEventListener('error', onUIErrorEvent);

  // Try to load a manifest.
  // This is an asynchronous process.
  try {
    await player.load(manifestUri);
    // This runs if the asynchronous load is successful.
    console.log('The video has now been loaded!');
  } catch (error) {
    onPlayerError(error);
  }
}

function onPlayerErrorEvent(errorEvent) {
  // Extract the shaka.util.Error object from the event.
  onPlayerError(errorEvent.detail);
}

function onPlayerError(error) {
  // Handle player error
  console.error('Error code', error.code, 'object', error);
  errors.value = error;
}

function onUIErrorEvent(errorEvent) {
  // Extract the shaka.util.Error object from the event.
  onPlayerError(errorEvent.detail);
}

function initFailed(errorEvent) {
  // Handle the failure to load; errorEvent.detail.reasonCode has a
  // shaka.ui.FailReasonCode describing why.
  console.error('Unable to load the UI library!');
}

// Listen to the custom shaka-ui-loaded event, to wait until the UI is loaded.
// onBeforeMount(() => {
//   document.addEventListener('shaka-ui-loaded', init);
//   // Listen to the custom shaka-ui-load-failed event, in case Shaka Player fails
//   // to load (e.g. due to lack of browser support).
//   document.addEventListener('shaka-ui-load-failed', initFailed);
// });

onMounted(() => {
  setTimeout(() => {
    init();
  }, 5000);
});
</script>
