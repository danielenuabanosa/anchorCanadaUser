export type UploadState = {
  fileName?: string;
  progress?: number;
  previewUrl?: string;
};

export function simulateFileUpload(
  file: File,
  onUpdate: (state: UploadState) => void,
) {
  const previewUrl = file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined;
  onUpdate({ fileName: file.name, progress: 0, previewUrl });

  let progress = 0;
  const interval = setInterval(() => {
    progress += 17;
    if (progress >= 100) {
      clearInterval(interval);
      onUpdate({ fileName: file.name, progress: 100, previewUrl });
      return;
    }
    onUpdate({ fileName: file.name, progress, previewUrl });
  }, 200);
}

export function clearUploadState(prev?: UploadState): UploadState {
  if (prev?.previewUrl) URL.revokeObjectURL(prev.previewUrl);
  return {};
}
