import { useEffect } from 'react';
import { connectBlocksFrom } from '@uploadcare/blocks/abstract/connectBlocksFrom';



const STYLES = 'https://unpkg.com/@uploadcare/blocks@0.17.1/web/file-uploader-regular.min.css';

export type UpdateImagesFunction = React.Dispatch<React.SetStateAction<string[]>>;

export function useUploadcare(updateImages: UpdateImagesFunction) {
  useEffect(() => {
    const fn = async () => {
      const blocks = await connectBlocksFrom('https://unpkg.com/@uploadcare/blocks@0.17.1/web/blocks-browser.min.js');

      if (!blocks) {
        return; // To avoid errors in SSR case
      }

      const el = document.getElementById('img');

      if (el?.hasChildNodes()) {
        return;
      }

      // Now you can add uploader using native DOM API methods
      const uploader = new blocks.FileUploaderRegular();
      uploader.setAttribute('css-src', STYLES);
      uploader.classList.add('my-config-class');

      document.getElementById('img')?.appendChild(uploader);
    };

    fn();

    const onDataOutput = (event: Event) => {
      const e = event as CustomEvent;
      const images = e.detail.data.map((item: { cdnUrl: string }) => item.cdnUrl);
      updateImages(images);
    };

    window.addEventListener('LR_DATA_OUTPUT', onDataOutput);

    return () => {
      window.removeEventListener('LR_DATA_OUTPUT', onDataOutput);
    };
  }, []);
}
