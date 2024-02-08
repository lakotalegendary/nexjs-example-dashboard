import { FieldType } from "@/app/lib/definitions";
import { ListItem } from "./list-item";

export const List = ({schema, types}: {schema:any, types: FieldType[]}) => {
    // console.log(schema)
    return (
        <ul className="peer block">
            {
                schema && Object.keys(schema).map((key) => {
                    const value = schema[key];
                    const { type, items, properties } = value;

                    return (
                        <ListItem key={key} keyNode={key} node={value} types={types} />
                    )
                })
            }
        </ul>
    )
}