export const ArticleStatusEnum = {
  draft: '0',
  underReview: '1',
  published: '2',
  hidden: '3',
  penddingToDelete: '4',
} as const;

export const SorterDirectionEnum = {
  desc: 'desc',
  asc: 'asc',
} as const;
