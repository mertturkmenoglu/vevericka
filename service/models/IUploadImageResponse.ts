export interface IUploadImageResponse {
  result: {
    filename: string;
    id: string;
    requireSignedURLs: boolean;
    uploaded: string;
    variants: string[];
  };
  success: boolean;
}
