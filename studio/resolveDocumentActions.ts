import defaultResolve, {
  PublishAction,
} from 'part:@sanity/base/document-actions';

// eslint-disable-next-line
// @ts-ignore: We don't know the types here ..
// eslint-disable-next-line
export default function resolveDocumentActions(props) {
  if (props.type === 'siteConfig') {
    return [PublishAction];
  }

  return [...defaultResolve(props)];
}
