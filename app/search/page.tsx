import SearchPageUI from '@/module/search/page/SearchPageUI';

export default async function Search({ searchParams }: { searchParams: Promise<{ searchQuery?: string }> }) {
  const params = await searchParams;
  return <SearchPageUI searchQuery={params?.searchQuery || ""} />;
}
