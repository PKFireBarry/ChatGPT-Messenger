'use client'

import useSWR from 'swr'
import Select from 'react-select'


const fetchModel = async () => fetch('/api/getModels').then(res => res.json())



function ModelSelection() {
    const { data: models, isLoading } = useSWR('models', fetchModel) //useSWR to get model

    const { data: model, mutate: setModel } = useSWR('model', { fallbackData: "text-davinci-003" });


  return (
    <div className='mt-2 '>
        <Select 
            className='mt-2'
            isSearchable
            options={models?.modelOptions}
            isLoading={isLoading}
            menuPosition='fixed'
            defaultValue={model}
            placeholder={model}
            classNames={{
                control: (state) => "bg-gray-700/50 text-gray-400 py-2 rounded-lg",
            }}
            onChange={(e) => setModel(e.value)}
            />
    </div>
  )
}


export default ModelSelection