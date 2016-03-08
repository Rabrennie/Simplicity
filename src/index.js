import Simplicity from 'Simplicity';

import Level from './state/Level';
import Init from './state/Init';

Simplicity.StateManager.add('test', Level);
Simplicity.StateManager.add('Init', Init);
Simplicity.StateManager.load('Init');

gameLoop();

function gameLoop() {
  window.requestAnimationFrame(gameLoop);
  TWEEN.update();
  if(Simplicity.camera.follow) {
    Simplicity.camera.position.x = Simplicity.camera.follow.position.x;
    Simplicity.camera.position.z = Simplicity.camera.follow.position.z+1500;
  }
  Simplicity.StateManager.loop();
  Simplicity.renderer.render(Simplicity.scene, Simplicity.camera);
}
