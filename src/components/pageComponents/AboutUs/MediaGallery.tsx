import Image from 'next/image'
import React from 'react'
import { galleryItems } from '../../../../data'

const MediaGallery = () => {
  return (
    <div>
         <section className="py-16 px-4 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-12">Hospital Gallery</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {galleryItems.map((item, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="relative w-full h-60">
              <Image
                src={item.image}
                alt={item.caption}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">{item.department}</h3>
              <p className="text-sm text-gray-600 mt-1">{item.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </section>,
    </div>
  )
}

export default MediaGallery