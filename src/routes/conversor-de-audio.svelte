
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
                progressBarText.innerHTML = `${ratio * 100}% Procesando...`;

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
    <!-- <script src="coi-serviceworker.js"></script> -->
    <script async src="http://arc.io/widget.min.js#FSBSx97R"></script>

    <!-- elements go here -->
    <title>Ymate.tools - Convierta Audio y Video de Forma Ilimitada</title>

    <meta
        name="description"
        content="Ymate.tools - Convierta Audio y Video de Forma Ilimitada, Mp3, Wav, flv, m4a, mvk, avi, webm"
    />

    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="manifest" href="/site.webmanifest" />

    <meta itemprop="name" content="Conversor de Video y Audio gratis" /><meta
        itemprop="description"
        content="Ymate.tools - Convierta Audio y Video de Forma Ilimitada, Mp3, Wav, flv, m4a, mvk, avi, webm"
    />
    <meta property="og:type" content="website" /><meta
        property="og:title"
        content="Conversor de Video y Audio gratis"
    /><meta
        property="og:description"
        content="Ymate.tools - Convierta Audio y Video de Forma Ilimitada, Mp3, Wav, flv, m4a, mvk, avi, webm"
    /><link rel="canonical" href="https://ymate.app/" />
</svelte:head>

<div
    class="w-full border-2 py-6 my-6 text-center sm:w-full lg:w-3/5 m-auto shadow-lg"
>
    <div class="my-4 py-2">
        <h2 class="font-bold text-4xl ">
            Convierta archivos <a
                href="/audio-converter"
                class="text-green-400 hover:text-green-500">Audio</a
            >
            o
            <a href="/video-convert" class="text-red-400 hover:text-red-500"
                >Video</a
            > Ilimitadamente.
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
                download={result}>Descargar</a
            >
        {/if}

        {#if files}
            <div class="my-4 font-bold text-3/1">
                <h3>Archivos Aceptdos</h3>
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
                        <h3>Seleciona el formato de salida</h3>
                    </div>

                    <div class="my-4 flex justify-center py-4 text-center">
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
        Hay varias formas de convertir video a audio en un sitio web. Un popular
        método es usar una herramienta de conversión en línea.
    </p>

    <p class="my-4">
        Hay una serie de herramientas de conversión disponibles en línea, muchas
        de las cuales son de uso gratuito, <a href="/" class="text-green-400"
            >Ymate.tools</a
        > proporciona usted con la herramienta ideal para convertir videos a archivos
        de audio absolutamente gratis.
    </p>

    <p class="my-4">
        Una vez que haya encontrado nuestra herramienta de conversión,
        simplemente cargue el archivo de video que desea convertir. El
        convertidor generará un archivo de audio, que puede descargar y guardar
        en su computadora.
    </p>
</div>

<div
    class="sm:w-wfull container m-auto my-6 w-full border-2 px-4 text-gray-600 shadow-lg lg:w-3/5"
>
    <div class="flex justify-around flex-wrap">
        <div class="w-full sm:w-full lg:w-2/5">
            <h2 class="my-4 text-3xl font-bold text-center">Audio</h2>
            <p class="my-4">
                Los archivos de audio son una forma de almacenar música o sonido
                en un dispositivo electrónico. dispositivo. Estos archivos se
                pueden reproducir a través de la reproducción de audio. software
                o un dispositivo de audio externo. El audio más común Los
                archivos son archivos MP3, WAV y AAC.
            </p>
            <p>
                Los archivos de audio MP3 y WAV son dos de los archivos de audio
                más populares. formatos disponibles hoy en día. MP3 es un
                formato de audio comprimido que se puede reproducir en la
                mayoría de los reproductores multimedia portátiles, mientras que
                WAV es un formato sin comprimir que generalmente se usa para
                almacenar archivos de audio en CD o en su computadora.
            </p>
        </div>

        <div class="w-full sm:w-full lg:w-2/5">
            <h2 class="my-4 text-3xl font-bold text-center">Video</h2>
            <p class="my-4">
                Hay muchos tipos de archivos de video, y cada uno tiene sus
                propios ventajas y desventajas. Por ejemplo, el formato AVI es
                uno de los más populares, pero también es uno de los más
                antiguos. vídeo AVI Los archivos son grandes y pueden ser
                difíciles de editar, pero son compatible con la mayoría de los
                reproductores de video.
            </p>
            <p>
                El formato MP4 es más nuevo y mucho más pequeño en tamaño, lo
                que lo hace ideal para compartir videos en línea. Sin embargo,
                no todos los reproductores de video pueden reproducir archivos
                MP4.
            </p>
        </div>
    </div>
</div>
