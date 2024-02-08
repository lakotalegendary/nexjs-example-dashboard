import Form from '@/app/ui/endpoints/create-form'
import { fetchFieldTypes } from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";

export default async function Page() {
    const types = await fetchFieldTypes();
    
    return (
        <main>
            <Breadcrumbs breadcrumbs={[
                { label: 'API', href: '/dashboard/endpoints'},
                {
                    label: 'Create API',
                    href: '/dashboard/endpoints/create',
                    active: true,
                }
            ]}/>
            <Form types={types} />
        </main>
    );
}