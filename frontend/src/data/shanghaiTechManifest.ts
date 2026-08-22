export interface ShanghaiTechImage {
  id: string;
  part: 'Part_A' | 'Part_B';
  split: 'train' | 'test';
  imagePath: string;
  estimatedCount: number;
  groundTruthCount: number;
  densityMapPath?: string;
}

export const shanghaiTechManifest: ShanghaiTechImage[] = [
  {
    id: 'IMG_001_A',
    part: 'Part_A',
    split: 'test',
    imagePath: 'ShanghaiTech/part_A/test_data/images/IMG_1.jpg',
    estimatedCount: 1284,
    groundTruthCount: 1250,
    densityMapPath: 'ShanghaiTech/part_A/test_data/ground_truth/IMG_1_density.png'
  },
  {
    id: 'IMG_002_A',
    part: 'Part_A',
    split: 'test',
    imagePath: 'ShanghaiTech/part_A/test_data/images/IMG_2.jpg',
    estimatedCount: 712,
    groundTruthCount: 698,
    densityMapPath: 'ShanghaiTech/part_A/test_data/ground_truth/IMG_2_density.png'
  },
  {
    id: 'IMG_010_A',
    part: 'Part_A',
    split: 'train',
    imagePath: 'ShanghaiTech/part_A/train_data/images/IMG_10.jpg',
    estimatedCount: 450,
    groundTruthCount: 462,
    densityMapPath: 'ShanghaiTech/part_A/train_data/ground_truth/IMG_10_density.png'
  },
  {
    id: 'IMG_001_B',
    part: 'Part_B',
    split: 'test',
    imagePath: 'ShanghaiTech/part_B/test_data/images/IMG_1.jpg',
    estimatedCount: 124,
    groundTruthCount: 128,
    densityMapPath: 'ShanghaiTech/part_B/test_data/ground_truth/IMG_1_density.png'
  },
  {
    id: 'IMG_002_B',
    part: 'Part_B',
    split: 'test',
    imagePath: 'ShanghaiTech/part_B/test_data/images/IMG_2.jpg',
    estimatedCount: 231,
    groundTruthCount: 225,
    densityMapPath: 'ShanghaiTech/part_B/test_data/ground_truth/IMG_2_density.png'
  },
  {
    id: 'IMG_015_B',
    part: 'Part_B',
    split: 'train',
    imagePath: 'ShanghaiTech/part_B/train_data/images/IMG_15.jpg',
    estimatedCount: 342,
    groundTruthCount: 350,
    densityMapPath: 'ShanghaiTech/part_B/train_data/ground_truth/IMG_15_density.png'
  }
];
