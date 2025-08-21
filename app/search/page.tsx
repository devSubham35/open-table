// app/search/page.tsx
import SearchPage from '@/module/search/page/SearchPage';

export default async function Search({ searchParams }: { searchParams: Promise<{ searchQuery?: string }> }) {
  const params = await searchParams;
  return <SearchPage searchQuery={params?.searchQuery || ""} />;
}
