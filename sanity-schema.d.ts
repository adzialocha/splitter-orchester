import type {
  SanityAsset,
  SanityBlock,
  SanityDocument,
  SanityFile,
  SanityGeoPoint,
  SanityImage,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityKeyedReference,
  SanityReference,
} from 'sanity-codegen';

export type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
};

/**
 * Post
 *
 *
 */
export interface Post extends SanityDocument {
  _type: 'post';

  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: string;

  /**
   * Published at — `datetime`
   *
   *
   */
  publishedAt?: string;

  /**
   * Feature — `object`
   *
   *
   */
  feature?: {
    _type: 'feature';
    /**
     * Main image — `image`
     *
     *
     */
    image?: {
      _type: 'image';
      asset: SanityAsset;
      crop?: SanityImageCrop;
      hotspot?: SanityImageHotspot;
    };

    /**
     * Main audio — `audio`
     *
     *
     */
    audio?: Audio;

    /**
     * Featured on homepage — `boolean`
     *
     *
     */
    isFeatured?: boolean;
  };

  /**
   * Body — `blockContent`
   *
   *
   */
  body?: BlockContent;
}

/**
 * Site Settings
 *
 *
 */
export interface SiteConfig extends SanityDocument {
  _type: 'siteConfig';

  /**
   * Main Image — `image`
   */
  mainImage?: {
    _type: 'image';
    asset: SanityAsset;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * Main Navigation — `array`
   *
   * Select items for the main navigation
   */
  mainNavigation?: Array<SanityKeyedReference<Post>>;

  /**
   * Footer Navigation — `array`
   *
   * Select items for the footer navigation
   */
  footerNavigation?: Array<SanityKeyedReference<Post>>;
}

export type Audio = {
  _type: 'audio';
  /**
   * SoundCloud URL — `url`
   *
   *
   */
  url?: string;

  /**
   * Caption — `string`
   *
   *
   */
  caption?: string;
};

export type Video = {
  _type: 'video';
  /**
   * YouTube / Vimeo video URL — `url`
   *
   *
   */
  url?: string;

  /**
   * Caption — `string`
   *
   *
   */
  caption?: string;
};

export type BlockContent = Array<
  | SanityKeyed<SanityBlock>
  | SanityKeyed<{
      _type: 'image';
      asset: SanityAsset;
      crop?: SanityImageCrop;
      hotspot?: SanityImageHotspot;
    }>
  | SanityKeyed<Video>
  | SanityKeyed<Audio>
>;

export type Documents = Post | SiteConfig;
