'use client'

import { FieldConfig, FieldType } from "@/app/lib/definitions";
import { CodeBracketSquareIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { List } from "./inputs/list";

export default function InputGenerator({
    fieldConfig,
    types
}: {
    fieldConfig: any,
    types: FieldType[],
}) {
    const [config, setConfig] = useState(fieldConfig);
    console.log(fieldConfig);
    useEffect(() => {
        console.log('effect')
    }, [config])

    const { properties } = fieldConfig;
    console.log(properties)

    return (
        <fieldset>
            {
                <List schema={properties} types={types}/>
                // entires && entires.map((entire: any) => {
                //     const [field, prop] = entire;
                //     const { type, items } = prop;
                //     return (
                //         <div className="flex gap-2">
                //             <div className="peer block w-1/3">
                //                 <label 
                //                     htmlFor={`${field}-field`}
                //                     className="mb-2 block text-sm font-medium"
                //                 >
                //                     Название поля
                //                 </label>
                //                 <input 
                //                     type="text"
                //                     name={field}
                //                     id={`${field}-field`}
                //                     value={field}
                //                     className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                //                 />
                //             </div>
                //             <div className="peer block w-1/3">
                //                 <label htmlFor="customer" className="mb-2 block text-sm font-medium">
                //                     Тип поля
                //                 </label>
                //                 <div className="relative">
                //                     <select
                //                         id={`${field}-${type}`}
                //                         name={field}
                //                         className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                //                         defaultValue=""
                //                         aria-describedby='customer-error'
                //                     >
                //                         <option value="" disabled>
                //                             Выберите тип
                //                         </option>
                //                         {types.map((type) => (
                //                             <option key={type.id} value={type.id}>
                //                                 {type.name}
                //                             </option>
                //                         ))}
                //                     </select>
                //                     <CodeBracketSquareIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                //                 </div>
                //             </div>
                //         </div>
                //     )
                // })
            }
        </fieldset>
    )
}