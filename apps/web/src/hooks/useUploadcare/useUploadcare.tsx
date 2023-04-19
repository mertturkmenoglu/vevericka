import { useEffect } from 'react';
import { connectBlocksFrom } from '@uploadcare/blocks/abstract/connectBlocksFrom';
import './uploadcare.css';

const STYLES = 'https://unpkg.com/@uploadcare/blocks@0.17.1/web/file-uploader-regular.min.css';

export interface UploadcareOptions {
  id: string;
  onDataOutput: (event: Event) => void;
}

export function useUploadcare({ id, onDataOutput }: UploadcareOptions) {
  useEffect(() => {
    const fn = async () => {
      const blocks = await connectBlocksFrom('https://unpkg.com/@uploadcare/blocks@0.17.1/web/blocks-browser.min.js');

      if (!blocks) {
        return; // To avoid errors in SSR case
      }

      const el = document.getElementById(id);

      if (el?.hasChildNodes()) {
        return;
      }

      // Now you can add uploader using native DOM API methods
      const uploader = new blocks.FileUploaderRegular();
      uploader.setAttribute('css-src', STYLES);
      uploader.classList.add('my-config-class');

      document.getElementById(id)?.appendChild(uploader);
    };

    fn();

    window.addEventListener('LR_DATA_OUTPUT', onDataOutput);

    return () => {
      window.removeEventListener('LR_DATA_OUTPUT', onDataOutput);
    };
  }, []);
}
