import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/avatars-identicon-sprites';

let svg = createAvatar(style, {
    seed: 'custom-seed',
    // ... and other options
  });

  
function assignAvatar(myseed){
    return createAvatar(style, {seed: myseed})
}

export {assignAvatar};