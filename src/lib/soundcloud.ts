const SOUNDCLOUD_API_URL = 'https://api.soundcloud.com';
const TOKEN_API_URL = 'https://api.splitter.berlin';

type Track = {
  title: string;
  streamUrl: string;
  waveformUrl: string;
  duration: number;
};

export default class SoundCloud {
  playing: boolean;
  audio: HTMLAudioElement;

  private events: { [key: string]: EventListener };
  private track: Track;

  constructor() {
    this.playing = false;
    this.audio = document.createElement('audio');
    this.audio.crossOrigin = 'anonymous';
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
    const encodedParam = encodeURIComponent(url);
    const fullUrl = `${SOUNDCLOUD_API_URL}/resolve?url=${encodedParam}`;

    // Resolve Soundcloud URL to track URL
    const resolveResult = await this.request(fullUrl);
    const {
      waveform_url: waveformUrl,
      uri: trackUrl,
      title,
      duration,
    } = await resolveResult.json();

    // Get authenticated streaming URL
    const streamResult = await this.request(`${trackUrl}/streams`);
    const { http_mp3_128_url: streamUrl } = await streamResult.json();

    this.track = {
      title,
      streamUrl,
      waveformUrl,
      duration,
    };

    return this.track;
  }

  play(url?: string): void {
    let src;
    if (url) {
      src = url;
    } else if (this.track) {
      src = this.track.streamUrl;
    } else {
      throw Error('No track given');
    }

    if (this.audio.src !== src) {
      this.audio.src = src;
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
