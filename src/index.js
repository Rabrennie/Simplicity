import Simplicity from 'Simplicity';

import Level from './state/Level';
import MainMenu from './state/menus/MainMenu';
import Init from './state/Init';
import LevelEditor from './state/LevelEditor';
import SharedLevel from './state/SharedLevel';

Simplicity.StateManager.add('test', Level);
Simplicity.StateManager.add('MainMenu', MainMenu);
Simplicity.StateManager.add('LevelEditor', LevelEditor);
Simplicity.StateManager.add('SharedLevel', SharedLevel);
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
  if(Simplicity.StateManager.doLoop) {
    Simplicity.StateManager.loop();
  }
  Simplicity.renderer.render(Simplicity.scene, Simplicity.camera);
}
