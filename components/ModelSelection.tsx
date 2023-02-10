'use client'

import useSWR from 'swr'
import Select from 'react-select'
import { InformationCircleIcon } from '@heroicons/react/24/outline'


const fetchModel = async () => fetch('/api/getModels').then(res => res.json())



function ModelSelection() {
    const { data: models, isLoading } = useSWR('models', fetchModel) //useSWR to get model

    const { data: model, mutate: setModel } = useSWR('model', { fallbackData: "text-davinci-003" });


  return (
    <div className='mt-2 mb-4'>
        <h1 className='text-2xl font-bold text-center my-3 underline text-gray-400'>Models List
        <a
          href='https://platform.openai.com/docs/models/overview'
        >
        <InformationCircleIcon className='h-6 w-6 text-gray-400 inline ml-2 animate-pulse hover:text-blue-600' />
        </a>
        </h1>
        <p className='text-center font-bold text-gray-400'>Defualt Model: <i>text-davinci-003</i></p>


        <Select 
            className='mt-2'
            isSearchable
            options={models?.modelOptions}
            isLoading={isLoading}
            menuPosition='fixed'
            defaultValue={model}
            placeholder={model}
            classNames={{
                control: (state) => "text-gray-400 bg-gray-400 py-2 rounded-lg",
            }}
            onChange={(e) => setModel(e.value)}
            />
            
    </div>
  )
}


export default ModelSelection