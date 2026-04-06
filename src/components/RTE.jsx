  import React, { useState } from 'react'
  import { Editor } from '@tinymce/tinymce-react'
  import { Controller } from 'react-hook-form'
  import Loader from './Loader'

  export default function RTE({name, control, label, defaultValue = ""}) {
    const [loading, setLoading] = useState(true);

    return (
      <div className='w-full relative'>
          {label && <label className='inline-block mb-1 pl-1 text-sm font-medium text-gray-700'>{label}</label>}

          {loading && (
            <div className="absolute inset-0 top-6 flex items-center justify-center bg-gray-50 border border-gray-200 rounded-lg z-10 min-h-[500px]">
              <Loader />
            </div>
          )}

          <Controller 
          name={name || "content"}
          control={control}
          render={({field : {onChange}}) => (
              <Editor 
              onInit={() => setLoading(false)}
              apiKey='lfn5fe750nl9rin3wcu9324c3xmm52q7r9fc3g8ros17x3jk'
              initialValue={defaultValue}
              init={{
                  initialValue: defaultValue,
                  height: 500,
                  menubar: true,
                  promotion: false,              
                  branding: false,             
                  telemetry: false,
                  plugins: [
                  "image",
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                  "anchor",
                  ],
                  toolbar:
                  "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                    content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }" 
              }}
              onEditorChange={onChange}     
              />
          )}
          />
      </div>
    )
  }
