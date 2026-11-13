export type Point = readonly [number, number];
export type AnchorName = 'head' | 'mouth' | 'leftHand' | 'rightHand' | 'footPivot';
export type MountRotations = Record<'head' | 'leftHand' | 'rightHand', number>;
export type Sprite = {src: string; width: number; height: number; anchors: Record<AnchorName, Point>; mountDegrees: MountRotations};

// Hand names mean screen-left / screen-right in the untransformed illustration.
// Measured on approved native masters; padding is translation, never resampling.
// Clockwise local degrees: head follows eye/forehead line; hands are practical
// grip orientations. Each prop still needs its own pivot and intrinsic-angle offset.
function sprite(pose: string, anchors: Record<AnchorName, Point>, mountDegrees: MountRotations, padding: Point = [108,86]): Sprite {
  const padded = {...anchors};
  for (const name of Object.keys(padded) as AnchorName[]) {
    padded[name] = [anchors[name][0]+padding[0],anchors[name][1]+padding[1]];
  }
  return {src:`characters/agent407/${pose}-v1.png`,width:1400,height:1500,anchors:padded,mountDegrees};
}
export const agent407 = {
  standing: sprite('standing',{head:[600,440],mouth:[630,715],leftHand:[390,1015],rightHand:[790,1015],footPivot:[585,1277]},{head:-4,leftHand:-20,rightHand:20}),
  kneeling: sprite('kneeling',{head:[670,525],mouth:[695,900],leftHand:[440,1060],rightHand:[750,1155],footPivot:[570,1215]},{head:17,leftHand:-32,rightHand:-35}),
  singing: sprite('singing',{head:[600,430],mouth:[630,665],leftHand:[380,945],rightHand:[795,945],footPivot:[585,1275]},{head:-6,leftHand:-65,rightHand:65}),
  surprised: sprite('surprised',{head:[600,435],mouth:[640,700],leftHand:[495,925],rightHand:[720,920],footPivot:[580,1275]},{head:-7,leftHand:35,rightHand:-35}),
  cheer: sprite('cheer',{head:[600,440],mouth:[630,710],leftHand:[425,865],rightHand:[765,865],footPivot:[500,1275]},{head:-9,leftHand:45,rightHand:-45},[109,84]),
  walking: sprite('walking',{head:[620,450],mouth:[690,715],leftHand:[390,995],rightHand:[770,985],footPivot:[450,1235]},{head:-6,leftHand:-25,rightHand:20}),
} satisfies Record<string,Sprite>;

// CSS children use the same foot-relative coordinates as the body image.
export function attachmentPoint(sprite: Sprite, anchor: AnchorName, scale: number, offset: Point = [0,0]): Point {
  const point = sprite.anchors[anchor], pivot = sprite.anchors.footPivot;
  return [(point[0]-pivot[0]+offset[0])*scale,(point[1]-pivot[1]+offset[1])*scale];
}
