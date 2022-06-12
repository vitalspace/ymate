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
    <title>Ymate.tools - You Tube Downloader - SoundCloud Downloader - Video and Audio Converter.</title>

    <meta
        name="description"
        content="ymate.tools is a website to download video Youtube, download music from youtube Y2meta Downloader, convert youtube to mp3, convert youtube to mp4 online for free"
    />

    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="manifest" href="/site.webmanifest" />

    <meta
        itemprop="name"
        content="Download Video and Audio from YouTube"
    /><meta
        itemprop="description"
        content="ymate.tools is a website to download video Youtube, download music from youtube Y2meta Downloader, convert youtube to mp3, convert youtube to mp4 online for free"
    />
    <meta property="og:type" content="website" /><meta
        property="og:title"
        content="Download Video and Audio from YouTube"
    /><meta
        property="og:description"
        content="ymate.tools is a website to download video Youtube, download music from youtube Y2meta Downloader, convert youtube to mp3, convert youtube to mp4 online for free"
    /><link rel="canonical" href="https://ymate.app/" />
</svelte:head>

<div>
    <div class="m-auto mt-6 w-full border-2 shadow-lg sm:w-full lg:w-3/5">
        <div class="py-5 px-4 text-center">
            <h2 class="font-bold text-4xl">
                Download videos from <a href="/" class="text-red-400"
                    >Youtube,</a
                > Convert, Download music from Youtube to MP3 quickly.
            </h2>
            <p class="mt-4 text-gray-500">Free forever.</p>
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
                placeholder="Enter url"
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
                By using our service, you agree to <a
                    href="/"
                    class="text-green-500">Terms of Use</a
                > .
            </p>
        </div>
    </div>

    <div
        class="m-auto my-8 w-full border-2 p-8 text-center shadow-lg sm:w-full lg:w-3/5"
    >
        <h2 class="py-4 text-xl font-medium">
            Download Soundcloud and Youtube to MP3 quickly.
        </h2>
        <p class="py-2 text-gray-500">
            <a class="text-green-500" href="/">Ymate.tools</a> allows you to
            convert and download videos youtube, facebook, dailymotion, youku,
            etc. to MP3, Mp4 in HD quality.
            <a class="text-green-500" href="/">Ymate.tools</a>
            supports the download all video formats like: MP4, M4V, 3GP, WMV, FLV,
            MO, MP3, WEBM, etc You can download videos from Youtube, easily in a
            free from <a class="text-green-500" href="/">Ymate.tools</a>.
        </p>
    </div>

    <div
        class="m-auto my-8 flex w-full flex-wrap justify-between border-2 p-8 text-center shadow-lg sm:w-full lg:w-3/5"
    >
        <div class="my-2 w-full sm:w-full lg:w-2/5">
            <p class="py-2 text-center text-lg font-medium">Instructions</p>
            <ul class="list-disc text-gray-600">
                <li>
                    Search by name or directly paste the link of the video you
                    want convert
                </li>
                <li>
                    Click the "Start" button to start the conversion process
                </li>
                <li>
                    Select the video/audio format you want to download, then
                    click click the Download button
                </li>
            </ul>
        </div>

        <div class="my-2 w-full sm:w-full lg:w-2/5">
            <p class="py-2 text-center text-lg font-medium">Features</p>
            <ul class="list-disc text-gray-600">
                <li>UNLIMITED DOWNLOADS ALWAYS FREE</li>
                <li>High speed video youtube to mp3 converter</li>
                <li>No registration required</li>
                <li>Download support in all formats</li>
            </ul>
        </div>
    </div>
</div>
