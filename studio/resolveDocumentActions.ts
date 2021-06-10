import defaultResolve, {
  PublishAction,
} from 'part:@sanity/base/document-actions';

export default function resolveDocumentActions(props) {
  if (props.type === 'siteConfig') {
    return [PublishAction];
  }

  return [...defaultResolve(props)];
}
