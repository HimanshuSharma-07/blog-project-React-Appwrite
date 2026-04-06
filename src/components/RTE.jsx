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
            <div className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm min-h-screen">
              <Loader />
              <p className="mt-4 text-sm font-medium text-gray-500 animate-pulse">Loading...</p>
            </div>
          )}

          <Controller 
          name={name || "content"}
          control={control}
          render={({field : {onChange}}) => (
              <Editor 
              onInit={() => setLoading(false)}
              apiKey='mbsz41ce9279yrmu8c1q6yxcf5obyogyxdaf74jec4pdpc05'
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
