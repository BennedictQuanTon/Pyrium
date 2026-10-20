import { Config } from "@remotion/cli/config";

// Motion sources (screenshots of our own apps) live beside the compositions, not in the site's
// public/ folder; rendered loops are written to public/motion/ by motion/render.mjs.
Config.setPublicDir("./motion/assets");
// WebGL (the skull) needs a GPU-backed renderer in headless Chrome.
Config.setChromiumOpenGlRenderer("angle");
Config.setVideoImageFormat("jpeg");
