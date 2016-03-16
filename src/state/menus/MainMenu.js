import Simplicity from '../../Simplicity';
import State from '../State';

class MainMenu extends State {

  create() {
    const menuContainer = Simplicity.UIManager.add('menuContainer', '');
    const playBtn = Simplicity.UIManager.add('playBtn', 'Play', menuContainer);
    const levelEditBtn = Simplicity.UIManager.add('levelEditBtn', 'Level Editor', menuContainer);
    Simplicity.UIManager.add('title', 'Simplicity', menuContainer);

    playBtn.addEventListener('mouseup', function() {
      Simplicity.StateManager.load('PlayMenu')
    })

    levelEditBtn.addEventListener('mouseup', function() {
      Simplicity.StateManager.load('LevelEditor')
    })
  }

}

export default MainMenu;
