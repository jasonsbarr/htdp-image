import { makeDocument } from "../../shared/document.js";
import { BaseImage } from "./BaseImage.js";

const document = makeDocument();

/**
 * Represents a video file
 * @class
 * @prop {string} src
 * @prop {HTMLVideoElement} video
 */
export class FileVideo extends BaseImage {
  static videoCache = {};
  /**
   * Constructor for FileVideo
   * @param {string} src
   * @param {HTMLVideoElement} rawVideo
   */
  constructor(src, rawVideo) {
    super({ ariaText: `video file from ${decodeURIComponent(src).slice(16)}` });

    this.src = src;
    this._isLoaded = false;

    if (rawVideo) {
      this.video = rawVideo;
      this.width = this.video.videoWidth;
      this.height = this.video.videoHeight;
      this.video.volume = 1;
      this.video.poster = "http://www.wescheme.org/images/broken.png";
      this.video.autoplay = true;
      this.video.buffered = true;
      this.video.loop = true;
      this._isLoaded = true;
      this.video.play();
    } else {
      this.video = document.createElement("video");
      this.video.src = src;

      this.video.addEventListener("canplay", () => {
        this.width = this.video.videoWidth;
        this.height = this.video.videoHeight;
        this.video.poster = "http://www.wescheme.org/images/broken.png";
        this.video.autoplay = true;
        this.video.buffered = true;
        this.video.loop = true;
        this._isLoaded = true;
        this.video.play();
      });

      this.video.addEventListener("error", () => {
        this.video.onerror = "";
        this.video.poster = "http://www.wescheme.org/images/broken.png";
      });
    }
  }

  /**
   * Static constructor for FileVideo
   * @param {string} src
   * @param {HTMLVideoElement} rawVideo
   * @returns {FileVideo}
   */
  static new(src, rawVideo) {
    if (!(src in FileVideo.videoCache)) {
      FileVideo.videoCache[src] = new FileVideo(src, rawVideo);
    }

    return FileVideo.videoCache[src];
  }

  get isLoaded() {
    return this._isLoaded;
  }

  /**
   * Checks for equality
   * @param {BaseImage} other
   * @returns {boolean}
   */
  equals(other) {
    return other instanceof FileVideo && this.src === other.src;
  }

  /**
   * Renders a FileVideo to the screen
   * @param {CanvasRenderingContext2D} ctx
   */
  render(ctx) {
    ctx.drawImage(this.video, 0, 0);
  }
}
