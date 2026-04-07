import { MappingAlgorithm } from 'antd/es/theme/interface';

import { colorScales } from '@/components/color/colors';
import { neutralColorScales } from '@/components/color/neutrals';
import type { ColorScaleItem } from '@/components/color/types';

import { NeutralColors, PrimaryColors } from '../../customTheme';
import { generateColorNeutralPalette, generateColorPalette } from '../generateColorPalette';
import lightBaseToken from '../token/light';

type ExtendedSeedToken = {
  primaryColor?: PrimaryColors;
  neutralColor?: NeutralColors;
};

export const lightAlgorithm: MappingAlgorithm = (seedToken, mapToken) => {
  const { primaryColor, neutralColor } = seedToken as unknown as ExtendedSeedToken;

  let primaryTokens = {};
  let neutralTokens = {};

  const primaryScale: ColorScaleItem = colorScales[primaryColor!];
  if (primaryScale) {
    primaryTokens = generateColorPalette({
      appearance: 'light',
      scale: primaryScale,
      type: 'Primary',
    });
  }

  const neutralScale = neutralColorScales[neutralColor!];
  if (neutralScale) {
    neutralTokens = generateColorNeutralPalette({ appearance: 'light', scale: neutralScale });
  }

  return {
    ...mapToken!,
    ...lightBaseToken,
    ...primaryTokens,
    ...neutralTokens,
  };
};