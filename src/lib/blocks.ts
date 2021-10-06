import type {
  Audio,
  BlockContent as BlockContentSchema,
  Image,
  SanityBlock,
  SanityKeyed,
  Video,
} from 'sanity-schema';

type ExtendedBlockContentSchema = {
  indexBlock: number;
  indexSection: number;
  totalBlocks: number;
  totalSections: number;
};

export type ExtendedBlockContent = Array<
  | SanityKeyed<SanityBlock & ExtendedBlockContentSchema>
  | SanityKeyed<Image & ExtendedBlockContentSchema>
  | SanityKeyed<Video & ExtendedBlockContentSchema>
  | SanityKeyed<Audio & ExtendedBlockContentSchema>
>;

// Helper method to add additional information like the index of every heading
// to the Sanity blocks. This helps us to do some more specific styling to
// block elements depending where and in what order they appear in the page.
export function extendBlocksData(
  blocks: BlockContentSchema,
): ExtendedBlockContent {
  // Count the number of sections in this body. "Sections" are actually defined
  // by headings. Each heading introduces a new section with the title already
  // defining the first.
  let sectionsCount = 0;

  // Go through all blocks and assign a section index to each of them by
  // keeping track of the preceeding headings.
  return blocks
    .reduce((acc, block, indexBlock) => {
      // eslint-disable-next-line
      // @ts-ignore: `style` actually exists on some blocks ..
      if (block.style && /^h\d/.test(block.style)) {
        sectionsCount += 1;
      }

      acc.push({
        ...block,
        indexSection: sectionsCount,
        indexBlock,
      });

      return acc;
    }, [])
    .map((block) => {
      return {
        ...block,
        totalSections: sectionsCount + 1, // +1 to add the post title
        totalBlocks: blocks.length,
      };
    });
}
