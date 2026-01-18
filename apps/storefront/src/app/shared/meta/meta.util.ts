export const metaWith = (title: string, description: string) => [
  {
    name: 'description',
    content: description,
  },
  {
    name: 'author',
    content: 'Saponenka Uladzislau',
  },
  {
    property: 'og:title',
    content: title,
  },
  {
    property: 'og:site_name',
    content: '',
  },
  {
    property: 'og:type',
    content: 'website',
  },
  {
    property: 'og:description',
    content: description,
  },
];
