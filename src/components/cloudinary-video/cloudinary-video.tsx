import { Element, State, Component, Prop } from '@stencil/core';

@Component({
  tag: 'cloudinary-video',
  styleUrl: 'cloudinary-video.scss'
})

export class CloudinaryVideo {

  @Prop() account: string;
  @Prop() width: string;
  @Prop() height: string;
  @Prop() alias: string;

  @Element() videoEl: HTMLElement;

  @State() fullVideo: string;
  @State() preview: string;
  @State() poster: string;

  componentDidLoad() {
    this.fullVideo = `http://res.cloudinary.com/${this.account}/video/upload/${this.alias}.mp4`;
    this.preview = `http://res.cloudinary.com/${this.account}/video/upload/so_0,du_2/l_video:${this.alias},fl_splice,so_12/du_2/fl_layer_apply/l_video:${this.alias},fl_splice,so_24/du_2/fl_layer_apply/l_video:${this.alias},fl_splice,so_36/du_2/fl_layer_apply/l_video:${this.alias},fl_splice,so_48/du_2/fl_layer_apply/l_video:${this.alias},fl_splice,so_80/du_2/fl_layer_apply/${this.alias}.mp4`;
    this.poster = `http://res.cloudinary.com/${this.account}/video/upload/${this.alias}.jpg`;
  }


  play() {
    // Hide the preview
    this.hidePreview();

    // Set the state to "playing" for showPreview and hidePreview checks
    this.videoEl.setAttribute('state', 'playing');

    // Set the full video element src
    this.videoEl.querySelector('#fullVideo').setAttribute('src', this.fullVideo);

    // set the svg play button to disappear
    this.videoEl.querySelector('svg').style.display = 'none';
  }

  showPreview() {
    // If the full video is loaded and playing, ignore this event
    if(this.videoEl.getAttribute('state') === 'playing') {
      return;
    }

    // set the preview video to the src attribute of the video tag
    this.videoEl.querySelector('#previewVideo').setAttribute('src', this.preview);
  }

  hidePreview() {
    // If the full video is loaded and playing, ignore this event
    if(this.videoEl.getAttribute('state') === 'playing') {
      return;
    }

    // Set the video to go to the beginning
    this.videoEl.querySelector('video').currentTime = 0;

    // ..then pause the video
    this.videoEl.querySelector('video').pause();
  }

  render() {
    return (
      <div onMouseEnter={this.showPreview.bind(this)} onMouseLeave={this.hidePreview.bind(this)} class="cloudinary-video-item" style={{'width':`${this.width}px`,'height':`${this.height}px`}}>
        <div class="cloudinary-video-item-active">
          <video id="previewVideo" poster={this.poster} autoplay loop width={this.width} height={this.height}></video>
        </div>
        <div class="cloudinary-video-item-video">
          <video id="fullVideo" autoplay controls width={this.width} height={this.height}></video>
        </div>
        <svg
           onClick={this.play.bind(this)}
           xmlnsDc="http://purl.org/dc/elements/1.1/"
           xmlnsCc="http://creativecommons.org/ns#"
           xmlnsRdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
           xmlnsSvg="http://www.w3.org/2000/svg"
           xmlns="http://www.w3.org/2000/svg"
           id="play-icon"
           version="1.1"
           height="50"
           width="50"
           viewBox="0 0 1200 1200">
          <path
             d="M 600,1200 C 268.65,1200 0,931.35 0,600 0,268.65 268.65,0 600,0 c 331.35,0 600,268.65 600,600 0,331.35 -268.65,600 -600,600 z M 450,300.45 450,899.55 900,600 450,300.45 z"
             id="path16995" />
        </svg>
      </div>
    );
  }
}
