import Image from 'next/image'

interface BackgroundImageProps {
  src: string
  alt: string
  children?: React.ReactNode
  containerClassName?: string
  imageClassName?: string
}

export default function BackgroundImage({
  src,
  alt,
  children,
  containerClassName,
  imageClassName,
}: BackgroundImageProps) {
  return (
    <div className={containerClassName}>
      <Image
        src={src}
        alt={alt}
        fill
        className={imageClassName}
        sizes='(max-width: 768px) 100vw, 1280px'
      />
      {children}
    </div>
  )
}
