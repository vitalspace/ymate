<script>
    // commponets
    import Loader from "../components/loader.svelte";
    import Table from "../components/table.svelte";
    // Dependencies
    import { getYotubeMp3 } from "../libs/getYoutubeMp3";
    import { getSoundCloudMp3 } from "../libs/getSoundCloudMp3";
  
    import { channel } from "../libs/connection";
  
    let url;
    let loader = false;
  
    let trackName;
    let trackImg;
    let resultVideo;
    let resultAudio;
  
    let showAudio = false;
    let showVideo = false;
  
    let canSeen = false;
    let canShearch = true;
  
    let service;
  
    const getUrl = async (e) => {
      e.preventDefault();
      loader = true;
      canSeen = false;
      if (canShearch) {
        canShearch = false;
  
        if (url !== undefined) {
          if (url.includes("youtube") || url.includes("youtu.be")) {
            resultAudio = await getYotubeMp3(url);
            showAudio = true;
            url = "";
          }
  
          if (url.includes("soundcloud")) {
            getSoundCloudMp3(url);
            url = "";
          }
        }
      }
    };
  
    if (channel) {
      channel.on("formats", (data) => {
        const { name, thumbnail } = data;
        resultVideo = data;
        showVideo = true;
        loader = false;
        trackName = name;
        trackImg = thumbnail;
        canSeen = true;
        canShearch = true;
        service = "youtube";
      });
  
      channel.on("soundclouddata", (data) => {
        const { name, thumbnail, formarts } = data;
        canShearch = true;
        loader = false;
        showAudio = true;
        canSeen = true;
        trackName = name;
        trackImg = thumbnail;
        service = "soundcloud";
        let format;
        let abr;
        for (let i = 0; i < formarts.length; i++) {
          const element = formarts[i];
          if (element.protocol === "http") {
            abr = element.abr;
            format = element.url;
            break;
          }
        }
        resultAudio = {
          name,
          thumbnail,
          abr: abr,
          url: format,
        };
      });
    }
  </script>

<svelte:head>
  <!-- elements go here -->
  <title>Ymate.tools - Descargador de YouTube - Descargador de SoundCloud - Convertidor de video y audio.</title>

  <meta
      name="description"
      content="ymate.tools es un sitio web para descargar archivos de audio de SoundCloud, descargar música de SoundCloud Ymate.tools Downloader, convertir Soundcloud a mp3, convertir en línea gratis"
  />

  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
  <link rel="manifest" href="/site.webmanifest" />

  <meta
      itemprop="name"
      content="Descargar audio de SoundCloud"
  /><meta
      itemprop="description"
      content="ymate.tools es un sitio web para descargar archivos de audio de SoundCloud, descargar música de SoundCloud Ymate.tools Downloader, convertir Soundcloud a mp3, convertir en línea gratis"
  />
  <meta property="og:type" content="website" /><meta
      property="og:title"
      content="Descargar audio de SoundCloud"
  /><meta
      property="og:description"
      content="ymate.tools es un sitio web para descargar archivos de audio de SoundCloud, descargar música de SoundCloud Ymate.tools Downloader, convertir Soundcloud a mp3, convertir en línea gratis"
  /><link rel="canonical" href="https://ymate.app/" />
</svelte:head>


  <div>
    <div class="m-auto mt-6 w-full border-2 shadow-lg sm:w-full lg:w-3/5">
      <div class="py-5 px-4 text-center">
        <h2 class="font-bold text-4xl">
          Descargue archivos de audio de <a href="/" class="text-orange-400">Soundcloud,</a> Convierta,
          Descarge musica de Soundcloud a MP3 rápidamente.
        </h2>
        <p class="mt-4 text-gray-500">Gratis para siempre.</p>
      </div>
      <div
        class="sm:ml-2 sm:mr-2 flex rounded-sm bg-green-600 p-1 lg:m-auto lg:w-4/5"
      >
        <input
          bind:value={url}
          class="w-full pl-4"
          type="url"
          name="url"
          id=""
          required
          placeholder="Ingrese la url de la cancion"
        />
        <button on:click={getUrl} class="bg-green-600 py-2 px-6 text-white"
          >Start</button
        >
      </div>
  
      {#if loader}
        <Loader />
      {/if}
  
      <Table
        {trackName}
        {trackImg}
        {resultAudio}
        {showAudio}
        {resultVideo}
        {showVideo}
        {canSeen}
        {service}
      />
  
      <div class="mb-6">
        <p class="px-4 text-center text-gray-500">
          Al utilizar nuestro servicio, usted acepta <a
            href="/"
            class="text-green-500">Términos de Uso</a
          > .
        </p>
      </div>
    </div>
  
    <div
      class="m-auto my-8 w-full border-2 p-8 text-center shadow-lg sm:w-full lg:w-3/5"
    >
      <h2 class="py-4 text-xl font-medium">
        Descarga de Soundcloud y Youtube a MP3 rápidamente.
      </h2>
      <p class="py-2 text-gray-500">
        <a class="text-green-500" href="/">Ymate.tools</a> te permite convertir y
        descargar videos youtube, Facebook, Dailymotion, Youku, etc. a MP3, Mp4 en
        calidad HD. <a class="text-green-500" href="/">Ymate.tools</a> admite la
        descarga de todos los formatos de video como: MP4, M4V, 3GP, WMV, FLV, MO,
        MP3, WEBM, etc. Puede descargar videos de Youtube, fácilmente de forma
        gratuita desde <a class="text-green-500" href="/">Ymate.tools</a>.
      </p>
    </div>
  
    <div
      class="m-auto my-8 flex w-full flex-wrap justify-between border-2 p-8 text-center shadow-lg sm:w-full lg:w-3/5"
    >
      <div class="my-2 w-full sm:w-full lg:w-2/5">
        <p class="py-2 text-center text-lg font-medium">
          Instrucciones
        </p>
        <ul class="list-disc text-gray-600">
          <li>
            Busque por nombre o pegue directamente el enlace del video que desea
            convertir
          </li>
          <li>
            Haga clic en el botón "Start" para iniciar el proceso de conversión
          </li>
          <li>
            Seleccione el formato de video/audio que desea descargar, luego haga
            clic en el botón Descargar
          </li>
        </ul>
      </div>
  
      <div class="my-2 w-full sm:w-full lg:w-2/5">
        <p class="py-2 text-center text-lg font-medium">
          Caracteristicas
        </p>
        <ul class="list-disc text-gray-600">
          <li>DESCARGAS ILIMITADAS SIEMPRE GRATIS</li>
          <li>Convertidor de youtube a mp3 de video de alta velocidad</li>
          <li>No es necesario registrarse</li>
          <li>Soporte de descarga en todos los formatos</li>
        </ul>
      </div>
    </div>
  </div>
  