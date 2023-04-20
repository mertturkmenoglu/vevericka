import { toast } from 'react-toastify';
import { copyToClipboard } from '../../../lib';
import 'react-toastify/dist/ReactToastify.css';
import { useCallback } from 'react';

export function useCopyPostUrl(id: string) {
  const URL = window.location.origin + '/p/' + id;

  const copy = useCallback(() => {
    copyToClipboard(URL);
    console.log('a');
    toast('Copied to clipboard', { type: 'success', autoClose: false });
  }, [URL]);

  return copy;
}
