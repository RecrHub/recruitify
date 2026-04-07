import { MappingAlgorithm } from 'antd/es/theme/interface';

import { colorScales } from '@/components/color/colors';
import { neutralColorScales } from '@/components/color/neutrals';
import type { ColorScaleItem } from '@/components/color/types';

import { NeutralColors, PrimaryColors } from '../../customTheme';
import { generateColorNeutralPalette, generateColorPalette } from '../generateColorPalette';
import darkBaseToken from '../token/dark';

type ExtendedSeedToken = {
  primaryColor?: PrimaryColors;
  neutralColor?: NeutralColors;
};

export const darkAlgorithm: MappingAlgorithm = (seedToken, mapToken) => {
  const { primaryColor, neutralColor } = seedToken as unknown as ExtendedSeedToken;

  let primaryTokens = {};
  let neutralTokens = {};

  const primaryScale: ColorScaleItem = colorScales[primaryColor!];
  if (primaryScale) {
    primaryTokens = generateColorPalette({
      appearance: 'dark',
      scale: primaryScale,
      type: 'Primary',
    });
  }

  const neutralScale = neutralColorScales[neutralColor!];
  if (neutralScale) {
    neutralTokens = generateColorNeutralPalette({ appearance: 'dark', scale: neutralScale });
  }

  return {
    ...mapToken!,
    ...darkBaseToken,
    ...primaryTokens,
    ...neutralTokens,
  };
};