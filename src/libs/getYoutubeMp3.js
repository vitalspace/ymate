
import { channel } from "./connection";

const getYotubeMp3 = async (url) => {

    channel.emit("url", url);

    if (url.includes('youtu.be')) {
        const id = url.split('/')[3]
        const urlId = `https://api.vevioz.com/@api/button/mp3/${id}`;
        let xhr = new XMLHttpRequest();
        xhr.open('GET', urlId, false);
        xhr.send(null);

        var links = xhr.responseText.match(/<a href="([^"]+)"/g);
        var links_array = [];

        for (var i = 0; i < links.length; i++) {
            links_array.push(links[i].match(/"([^"]+)"/)[1]);
        }

        let result = links_array.map(function (link, i) {
            return {
                id: i,
                url: link,
            };
        });

        return result;
    } else {
        const videoId = url.split("v=")[1];

        if (videoId) {

            const urlId = `https://api.vevioz.com/@api/button/mp3/${videoId}`;
            let xhr = new XMLHttpRequest();
            xhr.open('GET', urlId, false);
            xhr.send(null);

            var links = xhr.responseText.match(/<a href="([^"]+)"/g);
            var links_array = [];

            for (var i = 0; i < links.length; i++) {
                links_array.push(links[i].match(/"([^"]+)"/)[1]);
            }

            let result = links_array.map(function (link, i) {
                return {
                    id: i,
                    url: link,
                };
            });

            return result;

        } else {
            return null;
        }

    }
}

export {
    getYotubeMp3
}