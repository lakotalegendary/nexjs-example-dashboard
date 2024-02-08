'use client';

import { FieldConfig, FieldType } from '@/app/lib/definitions';
import { DocumentIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { createApi } from '@/app/lib/actions'
import { useFormState } from 'react-dom';
import InputGenerator from './input-generator';
import { useState } from 'react';
import { getTree } from '@/app/lib/utils';

export default function EditApiForm({
  types,
}: {
  types: FieldType[]
}) {
  const toJsonSchema = require('to-json-schema');
  let tree: any = [];

  const initialState = { message: null, errors: {} };
  const [value, setValue] = useState("");
  const [state, dispatch] = useFormState(createApi, initialState);
  const [fieldConfig, setFieldConfig] = useState(tree);
  
  const createFields = (event: any) => {
    setValue(event.target.value);
    try {
      const json = JSON.parse(event.target.value)
      setFieldConfig(toJsonSchema(json))
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <form action={dispatch} aria-describedby='form-describer'>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* api name */}
        <div className="mb-4">
          <label htmlFor="nameApi" className="mb-2 block text-sm font-medium">
            Имя (на английском)
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="nameApi"
                name="nameApi"
                type="text"
                placeholder="Укажите имя API"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby='name-api-input'
              />
              <DocumentIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id='name-api-input' aria-live='polite' aria-atomic="true">
            {
              state.errors?.nameApi && state.errors.nameApi.map((error: string) => (
                <p className='mt-2 text-sm text-red-500' key={error}>
                  {error}
                </p>
              ))
            }
          </div>
        </div>

        {/* Invoice Amount */}
        <div className='flex flex-row'>
          <div className="mb-4 block w-1/2 mr-4">
            <label htmlFor="url" className="mb-2 block text-sm font-medium">
              Укажите JSON
            </label>
            <textarea 
              id="url"
              name="data"
              placeholder='{ "field1": "string", "field2": 42 }'
              cols={30}
              rows={20}
              onBlur={createFields}
              className='peer block w-full rounded-md mr-4 border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'
              aria-describedby='url-api-input'
            ></textarea>
            <div id='url-api-input' aria-live='polite'>
              {
                state.errors?.data && state.errors.data.map((error: string) => (
                  <p className='mt-2 text-sm text-red-500' key={error}>
                    {error}
                  </p>
                ))
              }
            </div>
            
          </div>
          <div className='peer block w-1/2 rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'>
            <InputGenerator fieldConfig={fieldConfig} types={types} />
          </div>
        </div>
        
        <div id='form-describer' aria-live='polite'>
          {
            state.message && (
              <p className='mt-2 text-sm text-red-500'>
                  {state.message}
                </p>
            )
          }
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/endpoints"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create API</Button>
      </div>
    </form>
  );
}
