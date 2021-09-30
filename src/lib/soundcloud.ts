const SOUNDCLOUD_API_URL = 'https://api.soundcloud.com';
const TOKEN_API_URL = 'https://api.splitter.berlin';

type Track = {
  title: string;
  streamUrl: string;
  waveformUrl: string;
};

export default class SoundCloud {
  playing: boolean;
  duration: number;
  audio: HTMLAudioElement;

  private events: { [key: string]: EventListener };
  private track: Track;

  constructor() {
    this.playing = false;
    this.duration = 0;
    this.audio = document.createElement('audio');
    this.events = {};
  }

  private async token(): Promise<string> {
    const result = await window.fetch(TOKEN_API_URL);
    const data = await result.json();
    return data['access_token'];
  }

  private async request(url: string): Promise<Response> {
    const token = await this.token();

    const headers = {
      Authorization: `OAuth ${token}`,
    };

    return await window.fetch(url, {
      headers,
    });
  }

  on(eventName: string, callback: EventListener): void {
    this.events[eventName] = callback;
    this.audio.addEventListener(eventName, callback, false);
  }

  off(eventName: string, callback: EventListener): void {
    this.events[eventName] = null;
    this.audio.removeEventListener(eventName, callback);
  }

  async resolve(url: string): Promise<Track> {
    // Resolve Soundcloud URL to track URL
    const encodedUrl = encodeURIComponent(url);
    const resolveResult = await this.request(
      `${SOUNDCLOUD_API_URL}/resolve?url=${encodedUrl}`,
    );
    const {
      waveform_url: waveformUrl,
      stream_url: streamLocation,
      title,
    } = await resolveResult.json();

    // Get authenticated streaming URL
    const streamResult = await this.request(streamLocation);
    const { location: streamUrl } = await streamResult.json();

    this.track = {
      title,
      streamUrl,
      waveformUrl,
    };

    return this.track;
  }

  play(url?: string): void {
    if (url) {
      this.audio.src = url;
    } else if (this.track) {
      this.audio.src = this.track.streamUrl;
    } else {
      throw Error('No track given');
    }

    this.audio.play();
    this.playing = true;
  }

  pause(): void {
    this.audio.pause();
    this.playing = false;
  }

  stop(): void {
    this.audio.pause();
    this.audio.currentTime = 0;
    this.playing = false;
  }
}
