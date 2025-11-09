<template>
    <div class="relative flex items-center bg-white rounded-lg p-2 w-full max-w-3xl">
        <!-- iframe الفيديو -->
        <!-- <iframe
      v-show="!ended"
      ref="iframe"
      width="560"
      height="315"
      :src="`https://www.youtube.com/embed/${videoId}?controls=0&modestbranding=1&rel=0&enablejsapi=1`"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen
    ></iframe> -->

        <video width="760" height="315" controls>
            <source src="https://ik.imagekit.io/ts7pphpbz3/Ai%20Tool%20(2).mp4" type="video/mp4">

        </video>

    </div>
</template>
