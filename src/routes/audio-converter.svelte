<script>
    import fileSize from "filesize";
    import FileDrop from "filedrop-svelte";
    import { filedrop } from "filedrop-svelte";
    import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

    import { goto } from "$app/navigation";

    let files;

    let options = {};

    // let video;
    let href;

    let result;
    let fileName;

    let progressBar;
    let progressBarText;

    let showDownload = false;
    let showFormats = true;
    let showProgressBar = false;

    let downloadButton = () => {
        showDownload = false;
        files = undefined;
        location.reload();
    };

    const type = async (value) => {
        try {
            showFormats = false;
            showDownload = false;

            const { name } = files.accepted[0];
            fileName = name;

            const ffmpeg = createFFmpeg({
                log: true,
                corePath: "/ffmpeg-core.js",
            });
            ffmpeg.setProgress(({ ratio }) => {
                showProgressBar = true;
                progressBar.style.width = `${ratio * 100}%`;
                progressBarText.innerHTML = `${ratio * 100}% Processing...`;

                if (ratio === 1) {
                    showProgressBar = false;
                    showDownload = true;
                    showFormats = true;
                    files = undefined;
                }
            });

            result = value;

            await ffmpeg.load();
            ffmpeg.FS("writeFile", name, await fetchFile(files.accepted[0]));
            await ffmpeg.run("-i", name, `${value}`);
            const data = ffmpeg.FS("readFile", value);

            href = URL.createObjectURL(
                new Blob([data.buffer], { type: type.mime })
            );
            // video.src = URL.createObjectURL(
            //     new Blob([data.buffer], { type: "video/mp4" })
            // );
        } catch (error) {
            console.log(error);
        }
    };
</script>

<svelte:head>
    <!-- elements go here -->
    <title>Ymate.tools - Convert Audio or Video files Unlimitedly</title>
    <script src="coi-serviceworker.js"></script>

    <meta
        name="description"
        content="Ymate.tools - Convert Audio or Video files Unlimitedly, Mp3, Wav, flv, m4a, mvk, avi, webm"
    />
  
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="manifest" href="/site.webmanifest" />
  
    <meta
        itemprop="name"
        content="Free Video and Audio Converter"
    /><meta
        itemprop="description"
        content="Ymate.tools - Convert Audio or Video files Unlimitedly, Mp3, Wav, flv, m4a, mvk, avi, webm"
    />
    <meta property="og:type" content="website" /><meta
        property="og:title"
        content="Free Video and Audio Converter"
    /><meta
        property="og:description"
        content="Ymate.tools - Convert Audio or Video files Unlimitedly, Mp3, Wav, flv, m4a, mvk, avi, webm"
    /><link rel="canonical" href="https://ymate.app/" />
  </svelte:head>



<div
    class="w-full border-2 py-6 my-6 text-center sm:w-full lg:w-3/5 m-auto shadow-lg"
>
    <div class="my-4 py-2">
        <h2 class="font-bold text-4xl ">
            Convert <a href="/audio-converter" class="text-green-400 hover:text-green-500">Audio</a> or <a href="/video-convert" class="text-red-400 hover:text-red-500">Video</a> files Unlimitedly.
        </h2>
    </div>

    <div class="sm:mr-2 sm:ml-2">
        <FileDrop on:filedrop={(e) => (files = e.detail.files)} />
    </div>

    <div class="sm:mr-2 my-4 sm:ml-2">
        {#if showDownload}
            <a
                on:click={downloadButton}
                {href}
                class="px-4 my-4 py-2 text-white bg-green-500 hover:bg-green-400"
                download={result}>Download</a
            >
        {/if}

        {#if files}
            <div class="my-4 font-bold text-3/1">
                <h3>Accepted files</h3>
            </div>

            {#each files.accepted as file}
                <div class="my-4">
                    {file.name} - {fileSize(file.size)}
                </div>
            {/each}

            {#if showProgressBar}
                <div class="">
                    <div class="h-3 relative rounded-full overflow-hidden">
                        <div class="w-full h-full bg-gray-200 absolute" />
                        <div
                            bind:this={progressBar}
                            class="h-full bg-green-500 absolute"
                        />
                    </div>
                    <div class="text-center" bind:this={progressBarText} />
                </div>
            {/if}

            {#if showFormats}
                <div bind:this={showFormats}>
                    <div class="font-bold text-3/1 my-4">
                        <h3>Select the output format</h3>
                    </div>

                    <div
                        class="my-4 flex justify-center py-4 text-center"
                    >
                        <div class="mx-6">
                            <div class="rounded-sm bg-black px-8 text-white">
                                <h3 class="text-2/1 hover:text-red-400">
                                    Video
                                </h3>
                            </div>
                            <ul class="text-gray-600">
                                <li
                                    on:click={() =>
                                        type(
                                            `${
                                                files.accepted[0].name +
                                                " " +
                                                "[www.ymate.tools]"
                                            }.mpeg`
                                        )}
                                    class="hover:text-green-500 my-1 cursor-pointer"
                                >
                                    Mpeg
                                </li>
                                <li
                                    on:click={() =>
                                        type(
                                            `${
                                                files.accepted[0].name +
                                                " " +
                                                "[www.ymate.tools]"
                                            }.mkv`
                                        )}
                                    class="hover:text-green-500 my-1 cursor-pointer"
                                >
                                    Mkv
                                </li>
                                <li
                                    on:click={() =>
                                        type(
                                            `${
                                                files.accepted[0].name +
                                                " " +
                                                "[www.ymate.tools]"
                                            }.avi`
                                        )}
                                    class="hover:text-green-500 my-1 cursor-pointer"
                                >
                                    Avi
                                </li>
                                <li
                                    on:click={() =>
                                        type(
                                            `${
                                                files.accepted[0].name +
                                                " " +
                                                "[www.ymate.tools]"
                                            }.mp4`
                                        )}
                                    class="hover:text-green-500 my-1 cursor-pointer"
                                >
                                    Mp4
                                </li>
                                <li
                                    on:click={() =>
                                        type(
                                            `${
                                                files.accepted[0].name +
                                                " " +
                                                "[www.ymate.tools]"
                                            }.mov`
                                        )}
                                    class="hover:text-green-500 my-1 cursor-pointer"
                                >
                                    Mov
                                </li>
                                <li
                                    on:click={() =>
                                        type(
                                            `${
                                                files.accepted[0].name +
                                                " " +
                                                "[www.ymate.tools]"
                                            }.Flv`
                                        )}
                                    class="hover:text-green-500 my-1 cursor-pointer"
                                >
                                    Flv
                                </li>
                                <li
                                    on:click={() =>
                                        type(
                                            `${
                                                files.accepted[0].name +
                                                " " +
                                                "[www.ymate.tools]"
                                            }.wmv`
                                        )}
                                    class="hover:text-green-500 my-1 cursor-pointer"
                                >
                                    Wmv
                                </li>
                            </ul>
                        </div>

                        <div class="mx-6">
                            <div class="rounded-sm bg-black px-8 text-white">
                                <h3 class="text-2/1 hover:text-red-400">
                                    Audio
                                </h3>
                            </div>
                            <ul class="text-gray-600">
                                <li
                                    on:click={() =>
                                        type(`${files.accepted[0].name}.mp3`)}
                                    class="hover:text-green-500 my-1 cursor-pointer"
                                >
                                    Mp3
                                </li>
                                <li
                                    on:click={() =>
                                        type(
                                            `${
                                                files.accepted[0].name +
                                                " " +
                                                "[www.ymate.tools]"
                                            }.wav`
                                        )}
                                    class="hover:text-green-500 my-1 cursor-pointer"
                                >
                                    Wav
                                </li>
                                <li
                                    on:click={() =>
                                        type(
                                            `${
                                                files.accepted[0].name +
                                                " " +
                                                "[www.ymate.tools]"
                                            }.m4a`
                                        )}
                                    class="hover:text-green-500 my-1 cursor-pointer"
                                >
                                    M4a
                                </li>
                                <li
                                    on:click={() =>
                                        type(
                                            `${
                                                files.accepted[0].name +
                                                " " +
                                                "[www.ymate.tools]"
                                            }.ogg`
                                        )}
                                    class="hover:text-green-500 my-1 cursor-pointer"
                                >
                                    Ogg
                                </li>
                                <li
                                    on:click={() =>
                                        type(
                                            `${
                                                files.accepted[0].name +
                                                " " +
                                                "[www.ymate.tools]"
                                            }.flac`
                                        )}
                                    class="hover:text-green-500 my-1 cursor-pointer"
                                >
                                    Flac
                                </li>
                                <li
                                    on:click={() =>
                                        type(
                                            `${
                                                files.accepted[0].name +
                                                " " +
                                                "[www.ymate.tools]"
                                            }.webm`
                                        )}
                                    class="hover:text-green-500 my-1 cursor-pointer"
                                >
                                    Webm
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            {/if}
        {/if}
    </div>
</div>

<div
    class="sm:w-wfull container m-auto my-6 w-full border-2 px-4 text-gray-600 shadow-lg lg:w-3/5"
>
    <p class="my-4">
        There are several ways to convert video to audio on a website. A popular
        method is to use an online conversion tool.
    </p>

    <p class="my-4">
        There are a number of conversion tools available online, many of which
        are free to use, <a href="/" class="text-green-400">Ymate.tools</a> provides
        you with the ideal tool to convert video to audio files absolutely free.
    </p>

    <p class="my-4">
        Once you've found our conversion tool, simply upload the video file you
        want to convert. The converter will then generate an audio file, which
        you can download and save to your computer.
    </p>
</div>

<div
    class="sm:w-wfull container m-auto my-6 w-full border-2 px-4 text-gray-600 shadow-lg lg:w-3/5"
>
    <div class="flex justify-around flex-wrap">
        <div class="w-full sm:w-full lg:w-2/5">
            <h2 class="my-4 text-3xl font-bold text-center">Audio</h2>
            <p class="my-4">
                Audio files are a way of storing music or sound on an electronic
                device. These files can be played through audio playback
                software or an external audio device. The most common audio
                files are MP3, WAV, and AAC files.
            </p>
            <p>
                MP3 and WAV audio files are two of the most popular audio
                formats out there today. MP3 is a compressed audio format that
                can be played on most portable media players, while WAV is an
                uncompressed format that is generally used to store audio files
                on CDs or on your computer.
            </p>
        </div>

        <div class="w-full sm:w-full lg:w-2/5">
            <h2 class="my-4 text-3xl font-bold text-center">Video</h2>
            <p class="my-4">
                There are many types of video files, and each has its own
                advantages and disadvantages. For example, the AVI format is one
                of the most popular, but it is also one of the oldest. AVI video
                files are large and can be difficult to edit, but they are
                compatible with most video players. The MP4 format is newer and
                much smaller in size, making it ideal for sharing video online.
                However, not all video players can play MP4 files.
            </p>
        </div>
    </div>
</div>
