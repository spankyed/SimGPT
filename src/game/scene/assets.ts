export interface AssetDictionary {
  [key: string]: Asset
}

export interface Asset {
  name: string;
  root: string;
  fileName: string;
}

const root = './assets/';

const assets = [
  ['house', 'house_a_min.babylon'],
  ['player', 'ej_A_2.glb'],
  ['nav', 'nav_a_min.babylon'],
]

const AssetsSchema = assets.reduce((dic, [name, fileName]) => ({
  ...dic, [name]: { name, fileName, root}
}), {} as AssetDictionary);

export default AssetsSchema;