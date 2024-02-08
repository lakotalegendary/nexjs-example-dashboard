import { Field, FieldType } from "@/app/lib/definitions";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useState } from "react";

export default function InputBlock({ id, types, item }: {
    id: string;
    types: FieldType[];
    item: Field
}){
    const [isArrayType, handleType] = useState(item.type.id === 'da8826e5-7445-476f-b703-a4cc190d1f97');
    return (
        <div id={id} key={item.key} className="flex items-center">
            <input 
                id={item.key}
                name={item.key}
                type="text"
                defaultValue={item.key}
                placeholder="Название поля в json"
                className="peer block w-1/4 rounded-md mr-4 border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <div className="relative w-1/4 mr-4">
                <select
                    id="type"
                    name="type"
                    className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    defaultValue={item.type.id}
                    aria-describedby='customer-error'
                    onChange={(e) => {
                        console.log(e.target.value)
                        handleType(e.target.value === 'da8826e5-7445-476f-b703-a4cc190d1f97')
                    }}
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
                <Cog6ToothIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
            <input 
                id={`number_${item.key}`}
                type='number'
                step='1'
                defaultValue='1'
                placeholder="Введите количество"
                className={clsx(
                    {
                        "peer block w-1/4 rounded-md mr-4 border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500": isArrayType,
                        "hidden": !isArrayType
                    }
                )}      
            />
        </div>
    );
}