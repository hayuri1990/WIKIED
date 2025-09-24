import { MediaComponentProps } from '@/components/common/wikiEditor/components/media/types';

const Media = ({ contentState, block }: MediaComponentProps) => {
  const entity = contentState.getEntity(block.getEntityAt(0));
  const { src } = entity.getData();
  return (
    <img
      src={src}
      alt="Uploaded content"
      width={500}
      height={300}
      style={{ maxWidth: '100%', height: 'auto' }}
    />
  );
};

export default Media;
