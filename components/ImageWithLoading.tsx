import { useState } from "react";
import Image from 'next/image'

export default function ImageWithLoading({title, src}: {title: any, src: string}) {
    const [imageLoading, setImageLoading] = useState(true);

    const onImageLoad = () => {
        //console.log('Image loaded');
        setImageLoading(false);
    }

    return <Image
        src={src}
        alt={`${title}`}
        width={100}
        height={100}
        onLoad={() => onImageLoad()}
    />

}