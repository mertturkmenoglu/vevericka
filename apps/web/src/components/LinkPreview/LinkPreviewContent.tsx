import clsx from 'clsx';

export interface LinkPreviewContentProps {
  isHorizontal: boolean;
  title: string;
  description: string;
}

function LinkPreviewContent({ isHorizontal, title, description }: LinkPreviewContentProps): JSX.Element {
  const hasDescription = description !== '';
  return (
    <div
      className={clsx({
        'py-auto flex flex-col justify-center': isHorizontal,
      })}
    >
      <div className="mt-2 px-2 font-medium">{title}</div>
      <div
        className={clsx('max-w-max text-ellipsis px-2 pb-2 text-xs font-light', {
          'break-all': !hasDescription,
          'break-words': hasDescription,
        })}
        style={{
          overflowWrap: 'anywhere',
        }}
      >
        {description}
      </div>
    </div>
  );
}

export default LinkPreviewContent;
