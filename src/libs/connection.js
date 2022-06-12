'use strict';

import { browser } from '$app/env';
import geckos from "@geckos.io/client";

let channel;


if(browser) {
    channel = geckos({
        url: "http://localhost:4000",
        port: null
    })

    channel.onConnect(() => {});
}

export {
    channel
}