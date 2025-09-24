import { useState } from 'react';
import { RichUtils } from 'draft-js';
import styles from '@/components/common/wikiEditor/components/colorPalette/styles.module.scss';
import Image from 'next/image';
import coloringIcon from '@/assets/icons/ic_coloring.svg';
import clsx from 'clsx';
import { ColorPaletteProps } from '@/components/common/wikiEditor/components/colorPalette/types';
import { colorPalette } from '@/components/common/wikiEditor/components/colorPalette/constants';

const ColorPalette: React.FC<ColorPaletteProps> = ({
  editorState,
  onEditorChange,
  className = '',
}) => {
  const [showPalette, setShowPalette] = useState(false);
  const [activeColor, setActiveColor] = useState<string | null>(null);

  const handleToggleColor = (colorStyle: string) => {
    let newState = editorState;

    if (activeColor) {
      newState = RichUtils.toggleInlineStyle(newState, activeColor);
    }

    newState = RichUtils.toggleInlineStyle(newState, colorStyle);

    onEditorChange(newState);
    setActiveColor(colorStyle);
  };

  return (
    <div className={clsx(styles['color-palette-container'], className)}>
      <button
        className={styles['color-toggle']}
        onClick={() => setShowPalette(!showPalette)}
      >
        <Image src={coloringIcon} alt="Color" width={24} height={24} />
      </button>
      {showPalette && (
        <div className={styles['color-palette']}>
          {colorPalette.map((color) => (
            <button
              key={color.name}
              onClick={() => handleToggleColor(color.name)}
              className={`${styles['color-button']} ${
                activeColor === color.name ? styles['active'] : ''
              }`}
              style={{ backgroundColor: color.color }}
            >
              <span
                className={styles['color-dot']}
                style={{ backgroundColor: color.color }}
              ></span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorPalette;
export { colorPalette };
