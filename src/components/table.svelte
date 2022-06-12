<script>
  export let trackName;
  export let trackImg;
  export let resultVideo;
  export let resultAudio;

  export let showAudio = false;
  export let showVideo = false;
  export let canSeen = false;

  export let service;

  let hz = ["320", "256", "192", "128", "64"];

  const showVideoButton = (e) => {
    e.preventDefault();
    showVideo = true;
    showAudio = false;
  };

  const showAudioButton = (e) => {
    e.preventDefault();
    showAudio = true;
    showVideo = false;
  };

  const formatBytes = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };
</script>

{#if canSeen}
  <div>
    <div
      class="m-auto my-2 flex flex-wrap justify-around rounded-sm border-4 border-green-600 text-center sm:m-auto sm:mr-2 sm:ml-2 lg:m-auto lg:my-4 lg:w-4/5"
    >
      <div class="my-2 w-full sm:w-full lg:w-1/2">
        <div class="my-2"><p>{trackName}</p></div>
        <div>
          <img
            class="m-auto my-2 h-1/3 w-1/3 rounded-full lg:h-64 lg:w-64"
            src={trackImg}
            alt=""
          />
        </div>
      </div>
      <div class="my-2 flex w-full flex-wrap justify-around sm:w-full lg:w-1/2">
        <div class="flex w-full justify-around sm:w-full">
          <button
            on:click={showVideoButton}
            class="my-2 mx-1 w-full bg-green-500 px-4 py-1 text-white shadow-md shadow-green-400 lg:h-max"
            >Video</button
          >
          <button
            on:click={showAudioButton}
            class="my-2 mx-1 w-full bg-red-500 px-2 py-1 text-white shadow-lg shadow-red-300 lg:h-max"
            >Audio</button
          >
        </div>
        <div id="result" class="w-full lg:px-1">
          <table class="m-5 mx-auto w-full table-auto break-all rounded-t-lg">
            <thead>
              <tr
                class="border-b-2 border-gray-300 bg-green-500 text-center text-white"
              >
                <th>File Type</th>
                <th>FIle Size</th>
                <th>Download</th>
              </tr>
            </thead>
            <tbody>
              {service}

              {#if service === "youtube"}
                {#if showVideo && resultVideo && trackImg && trackName}
                  {#each resultVideo.formarts as elem}
                    {#if elem.format_note === "360p" || elem.format_note === "480p" || elem.format_note === "720p" || elem.format_note === "1080p"}
                      {#if elem.acodec !== "none"}
                        <tr
                          class="border-b-2 border-gray-300 bg-slate-300 text-center text-gray-500"
                        >
                          <td>.mp4({elem.format_note})</td>
                          <td
                            >{formatBytes(elem.filesize) !== "NaN undefined"
                              ? formatBytes(elem.filesize)
                              : "Recommend"}</td
                          >
                          <td
                            ><a
                              class="rounded-sm bg-green-500 px-2 text-white hover:bg-green-400"
                              href={elem.url}
                              target="_blank">Download</a
                            ></td
                          >
                        </tr>
                      {/if}
                    {/if}
                  {/each}
                {/if}

                {#if showAudio && trackImg && trackName}
                  {#if resultAudio}
                    {#each resultAudio as e, i}
                      <tr
                        class="border-b-2 border-gray-300 bg-slate-300 text-center text-gray-500"
                      >
                        <td>.mp3({hz[i]})</td>
                        <td>Recommend</td>
                        <td
                          ><a
                            class="text-white bg-green-500 hover:bg-green-400 rounded-sm px-2"
                            href={e.url}>Download</a
                          ></td
                        >
                      </tr>
                    {/each}
                  {/if}
                {/if}
              {:else if service === "soundcloud"}
                <tr
                  class="border-b-2 border-gray-300 bg-slate-300 text-center text-gray-500"
                >
                  <td>.mp3({resultAudio.abr} kbps)</td>
                  <td>Recommend</td>
                  <td
                    ><a
                      class="text-white bg-green-500 hover:bg-green-400 rounded-sm px-2"
                      href={resultAudio.url}
                      target="_blank">Download</a
                    ></td
                  >
                </tr>
              {/if}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
{/if}
