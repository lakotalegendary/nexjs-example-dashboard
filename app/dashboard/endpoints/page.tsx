import Pagination from "@/app/ui/invoices/pagination";
import Search from "@/app/ui/search";
import ApiTable from '@/app/ui/endpoints/api-table';
import { lusitana } from "@/app/ui/fonts";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import { fetchApisPages } from "@/app/lib/data";
import { CreateApi } from "@/app/ui/endpoints/buttons";

export default async function Page({
    searchParams,
}: {
    searchParams?: {
        query?: string;
        page?: string;
    };
}) {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;

    const totalPages = await fetchApisPages(query);
    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>APIs</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search APIs..." />
                <CreateApi />
            </div>
             <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
                <ApiTable query={query} currentPage={currentPage} />
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    );
}