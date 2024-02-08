import { FieldType } from "@/app/lib/definitions";
import { List } from "./list";
import { CodeBracketSquareIcon } from "@heroicons/react/24/outline";

export const ListItem = ({ keyNode, node, types }:{ keyNode:string, node:any, types: FieldType[] }) => {
    const { type, items, properties } = node;
    const fieldTypeId = types.filter(t => t.name === type)[0].id;
    return (
        <li className="peer block pl-6 my-2 relative">
            <div className="flex gap-2">
                <div className="peer block w-1/3">
                    {/* <label 
                        htmlFor={`${keyNode}-field`}
                        className="mb-2 block text-sm font-medium"
                    >
                        Название поля
                    </label> */}
                    <input 
                        type="text"
                        name={keyNode}
                        id={`${keyNode}-field`}
                        defaultValue={keyNode}
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                    />
                </div>
                <div className="peer block w-1/3">
                    {/* <label htmlFor="customer" className="mb-2 block text-sm font-medium">
                        Тип поля
                    </label> */}
                    <div className="relative">
                        <select
                            id={`${keyNode}-${type}`}
                            name={keyNode}
                            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            defaultValue={fieldTypeId}
                            aria-describedby='customer-error'
                        >
                            <option value="" disabled>
                                Выберите тип
                            </option>
                            {types.map((type) => (
                                <option key={type.id} value={type.id}>
                                    {type.name}
                                </option>
                            ))}
                        </select>
                        <CodeBracketSquareIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                    </div>
                </div>
            </div>
            {
                items && items.type === 'object' && Object.keys(items.properties).map(key => {

                    return (
                        <List key={key} schema={items.properties} types={types} />
                    )
                })
            }
            {
                properties && Object.keys(properties).map(key => {

                    return (
                        <List key={key} schema={properties} types={types}/>
                    )
                })
            }
        </li>
    )
} 