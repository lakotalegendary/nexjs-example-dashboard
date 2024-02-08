import Form from "@/app/ui/endpoints/api-edit-form";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { fetchApiById, fetchFieldTypes } from "@/app/lib/data";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string }}) {
    const id = params.id;
    const [api, types] = await Promise.all([
        fetchApiById(id),
        fetchFieldTypes()
    ])

    if(!api){
        notFound();
    }

    return (
        <main>
            <Breadcrumbs breadcrumbs={[
                { label: 'API', href: '/dashboard/endpoints'},
                {
                    label: 'Edit API',
                    href: `/dashboard/endpoints/${id}/edit`,
                    active: true,
                }
            ]}/>
            <Form api={api} types={types} />
        </main>
    );
}