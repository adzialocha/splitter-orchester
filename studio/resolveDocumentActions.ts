import defaultResolve, {
  PublishAction,
} from 'part:@sanity/base/document-actions';

type DocumentAction = {
  title: string;
  disabled: boolean;
};

type Props = {
  type: string;
};

export default function resolveDocumentActions(props: Props): DocumentAction[] {
  if (props.type === 'siteConfig') {
    return [PublishAction];
  }

  return [...defaultResolve(props)];
}
