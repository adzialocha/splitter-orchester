export default function resolveDocumentActions(prev: any[], context: any) {
  if (context.schemaType === 'siteConfig') {
    // For siteConfig, only allow publish action (remove other actions like delete)
    return prev.filter(action => action.action === 'publish');
  }

  return prev;
}
