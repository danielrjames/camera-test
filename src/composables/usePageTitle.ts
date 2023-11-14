export const usePageTitle = (
  title: string,
  template?: string,
  description?: string
) => {
  const { base } = $(useAppStore());

  const pageTemplate = template ?? `${base.title}`;

  useAppStore().setPageData(title, pageTemplate, description);
};
