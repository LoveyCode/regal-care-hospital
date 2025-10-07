import Image from 'next/image'
import React from 'react'
import { advisors } from '../../../../data'

const AdvisoryTeam = () => {
  return (
    <section>
      <div className="space-y-16">
        {advisors.map((advisor, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-center gap-6 md:items-start group"
          >
            {/* Image Wrapper */}
            <div className="relative w-48 h-48 rounded-full overflow-hidden shadow-lg transition-shadow duration-300 group-hover:shadow-2xl">
              <Image
                src={advisor.image}
                alt={advisor.name}
                fill
                className="object-cover"
              />

              {/* Hovering circle animation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-0 h-0 group-hover:w-32 group-hover:h-32 transition-all duration-500 ease-out bg-blue-300/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="text-white font-semibold text-center px-2 text-sm">
                    {advisor.name}
                  </span>
                </div>
              </div>
            </div>

            {/* Text beside image */}
            <div className="md:flex-1">
              {/* Show name/title statically for mobile */}
              <div className="lg:hidden mb-2">
                <h3 className="text-lg font-semibold">{advisor.name}</h3>
                <p className="text-sm text-gray-600">{advisor.title}</p>
              </div>
              <p className="paragraph-text pages-p max-w-none">
                {advisor.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default AdvisoryTeam
