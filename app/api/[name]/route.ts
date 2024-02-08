import { sql } from "@vercel/postgres";

export async function POST(
    request: Request,
    { params }: { params: { name: string } }
) {
    const name = params.name;
    const apidata = await sql`
        SELECT data FROM custom_api
        WHERE name = ${name}
    `;
    
    if(apidata.rowCount === 0) {
        return Response.json({ error: 'Not found' }, { status: 404 })
    }
    
    //const data = Response.json(apidata.rows[0]);
    
    console.log(JSON.parse(apidata.rows[0].data))
    const data = JSON.parse(apidata.rows[0].data);
    return Response.json(data)
}

export async function GET(request: Request, context: { params: { name: string } }) {
    const name = context.params.name;
    const apidata = await sql`
        SELECT data FROM custom_api
        WHERE name = ${name}
    `;
    
    if(apidata.rowCount === 0) {
        return Response.json({ error: 'Not found' }, { status: 404 })
    }
    console.log(JSON.parse(apidata.rows[0].data))
    const data = JSON.parse(apidata.rows[0].data);
    
    //const data = JSON.parse(decodeURIComponent(escape(atob(apidata.rows[0].data))))
    return Response.json(data)
}