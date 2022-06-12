'use strict';

import { channel } from "./connection";
const getSoundCloudMp3 = async (url) => channel.emit('soundcloud', { service: "soundcloud", url: url });
export {getSoundCloudMp3};
